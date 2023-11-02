CREATE TABLE projects (
    project_id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
	status VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    modified_at DATETIME
);
