-- CREATE DATABASE Project_DB;

-- USE Project_DB;


CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(100),
    @first_name VARCHAR(200),
    @last_name VARCHAR(200),
    @email VARCHAR(300),
    @password VARCHAR(200)
)
AS
BEGIN

    INSERT INTO Users(user_id, first_name, last_name, email, password)
    VALUES(@user_id, @first_name, @last_name,  @email, @password)

END


