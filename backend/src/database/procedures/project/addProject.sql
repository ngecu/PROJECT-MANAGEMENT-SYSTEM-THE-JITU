-- SQL Stored Procedure to Add a Project
-- USE Project_DB;


CREATE PROCEDURE addProject
  @project_id VARCHAR(200),
  @project_name VARCHAR(250),
  @project_description VARCHAR(250),
  @dueDate DATE,
  @created_at TIME,
  @isDeleted BIT,
  @project_status VARCHAR(100)
AS
BEGIN
  INSERT INTO Projects (project_id, project_name, project_description, dueDate, created_at, isDeleted, project_status)
  VALUES (@project_id, @project_name, @project_description, @dueDate, @created_at, @isDeleted, @project_status);
END;