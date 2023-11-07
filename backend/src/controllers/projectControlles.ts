import { Request, Response } from "express";
import mssql from "mssql";
import { sqlConfig } from "../config/sqlConfig";
import Connection from "../dbhelpers/dbhelpers";
import sendEmail from "../utils/sendEmail";
import { readHTMLFile, renderEmailTemplate } from "./userController";

import nodemailer from "nodemailer";
import { v4 } from "uuid";

const dbhelper = new Connection();
const templateFilePath = "src/controllers/email-template.hbs";

// Create a nodemailer transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can change this to your email service
  auth: {
    user: "your_email@gmail.com", // Your email address
    pass: "your_email_password", // Your email password
  },
});

export const createProject = async (req: Request, res: Response) => {
  const { title, description, user_id, due_date } = req.body;
  const project_id = v4();

  try {
    const existingProject = await projectExistsForUser(user_id);

    if (existingProject) {
      return res
        .status(400)
        .json({ error: "A project already exists for this user" });
    }

    const insertQuery = `
      INSERT INTO projects (project_id,project_name, project_description,dueDate, user_id, project_status)
      VALUES ('${project_id}','${title}', '${description}','${due_date}', '${user_id}', 'incomplete')
    `;

    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query(insertQuery);

    // Update the specified user's "assigned" column to 1
    const updateUserAssignedQuery = `
      UPDATE users
      SET assigned = 1
      WHERE user_id = '${user_id}'
    `;
    const updateResult = await pool.request().query(updateUserAssignedQuery);

    // Fetch the user's email
    const getUserEmailQuery = `SELECT email FROM users WHERE user_id = '${user_id}'`;
    const emailResult = await pool.request().query(getUserEmailQuery);

    if (emailResult.recordset.length > 0) {
      const userEmail = emailResult.recordset[0].email;

      // Send an email to the user
      const mailOptions = {
        from: "your_email@gmail.com",
        to: userEmail,
        subject: "Project Created",
        text: `Your project "${title}" has been created successfully.`,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    return res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the project" });
  }
};

async function projectExistsForUser(user_id: string) {
  const checkQuery = `
        SELECT project_id
        FROM projects
        WHERE user_id = '${user_id}'
    `;

  const pool = await mssql.connect(sqlConfig);
  const result = await pool.request().query(checkQuery);

  return result.recordset.length > 0;
}

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const query = `SELECT projects.project_id, projects.project_name, projects.project_description, projects.user_id, projects.project_status, projects.created_at, projects.dueDate,
        Users.first_name, Users.last_name, Users.email, Users.role
 FROM projects
 INNER JOIN Users ON projects.user_id = Users.user_id;`;
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query(query);

    const projects = result.recordset;

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the projects" });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    // res.header('Cache-Control', 'no-store');
    const project_id = req.params.project_id;
    console.log(project_id);

    const query = `SELECT * FROM projects WHERE project_id = '${project_id}'`;

    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    const project = result.recordset[0];

    const assigned_to = project.user_id;

    const query2 = `SELECT * FROM users WHERE user_id = '${assigned_to}'`;

    const pool2 = await mssql.connect(sqlConfig);
    const result2 = await pool2.request().query(query2);

    console.log(result2.recordset);

    const our_user = result2.recordset[0];

    console.log(our_user);

    return res.send({ project, our_user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const project_id = req.params.project_id;
  const { title, description } = req.body;

  try {
    // Check if the project exists before attempting the update
    const checkProjectQuery = `SELECT * FROM projects WHERE project_id = '${project_id}'`;

    const pool = await mssql.connect(sqlConfig);
    const checkResult = await pool.request().query(checkProjectQuery);

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update the project information
    const updateQuery = `
            UPDATE projects
            SET title = '${title}', description = '${description}'
            WHERE project_id = '${project_id}'
        `;

    const updateResult = await pool.request().query(updateQuery);

    return res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the project" });
  }
};

export const getMyProjects = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id;

    let projects = dbhelper.execute("fetchMyProjects", {
      userID,
    });

    return res.status(200).json({
      projects: projects,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const project_id = req.params.project_id;

  try {
    const query = `DELETE FROM projects WHERE project_id = '${project_id}'`; // Adjust the query according to your database schema

    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the project" });
  }
};

const sendProjectEmail = (user_id: string, project_title: string) => {
  // Define your SQL query to retrieve user details associated with the project
  const getUserDetailsQuery = `
      SELECT Users.first_name, Users.last_name, Users.email
      FROM Users
      INNER JOIN projects ON Users.user_id = projects.user_id
      WHERE projects.project_title = '${project_title}'
    `;

  // Connect to the database and execute the query
  mssql
    .connect(sqlConfig)
    .then((pool) => {
      return pool.request().query(getUserDetailsQuery);
    })
    .then((result) => {
      if (result.recordset.length > 0) {
        // User details found
        const user = result.recordset[0];
        const { first_name, last_name, email } = user;

        // Now you can use the user's details in your email sending logic
        readHTMLFile(templateFilePath)
          .then((templateContent) => {
            // Define the data for the template variables
            const templateData = {
              first_name,
              email,
              project_title,
            };

            // Render the email template with the data
            const renderedTemplate = renderEmailTemplate(
              templateContent,
              templateData
            );

            // Send the email
            sendEmail(email, "Welcome", renderedTemplate)
              .then(() => {
                console.log("Email sent successfully");
              })
              .catch((error) => {
                console.log("Failed to send email:", error);
              });
          })
          .catch((error) => {
            console.log("Failed to read template file:", error);
          });
      } else {
        console.log("User not found for the specified project");
      }
    })
    .catch((error) => {
      console.log("Database query error:", error);
    });
};
