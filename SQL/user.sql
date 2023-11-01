CREATE TABLE Users (
	user_id VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50) ,
	email VARCHAR(50)  UNIQUE,
	role VARCHAR(50),
	password VARCHAR(255),
    welcomed INT 

)

SELECT * FROM Users

