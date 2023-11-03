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
	user_id VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50) ,
	email VARCHAR(50)  UNIQUE,
	role VARCHAR(50),
	password VARCHAR(255)
)

SELECT projects.project_id, projects.title, projects.description, projects.user_id, projects.status, projects.created_at, projects.modified_at,
       Users.first_name, Users.last_name, Users.email, Users.role
FROM projects
INNER JOIN Users ON projects.user_id = Users.user_id;


ALTER TABLE projects
ADD CONSTRAINT UQ_User_Project UNIQUE (user_id);

