CREATE TABLE projects (
    project_id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
	status VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    modified_at DATETIME DEFAULT GETDATE(),
);


CREATE TABLE Users (
	user_id VARCHAR(50) PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50) ,
	email VARCHAR(50)  UNIQUE,
	role VARCHAR(50),
	password VARCHAR(255),
	    created_at DATETIME DEFAULT GETDATE(),
    modified_at DATETIME DEFAULT GETDATE(),

)

CREATE TABLE ProjectAssignments (
    assignment_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT,
    user_id VARCHAR(50) UNIQUE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



SELECT projects.project_id, projects.title, projects.description, projects.user_id, projects.status, projects.created_at, projects.modified_at,
       Users.first_name, Users.last_name, Users.email, Users.role
FROM projects
INNER JOIN Users ON projects.user_id = Users.user_id;


ALTER TABLE projects
ADD CONSTRAINT UQ_User_Project UNIQUE (user_id);

CREATE VIEW UserProfile AS
SELECT
    U.user_id,
    U.first_name,
    U.last_name,
    U.email,
    U.role,
    P.title AS project_title,
    P.description AS project_description
FROM Users U
LEFT JOIN projects P ON U.user_id = P.user_id;


CREATE VIEW UsersWithoutProjects AS
SELECT U.user_id, U.first_name, U.last_name, U.email, U.role
FROM Users U
WHERE NOT EXISTS (
    SELECT 1
    FROM projects P
    WHERE U.user_id = P.user_id
);
