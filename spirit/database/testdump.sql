CREATE TABLE Tests(
	test_id INT PRIMARY KEY AUTO_INCREMENT,
	test_name VARCHAR(60),
	test_age INT
);

INSERT INTO Tests(test_name, test_age) VALUES("Yabdul Balam", 37);
INSERT INTO Tests(test_name, test_age) VALUES("Marc Demo", 23);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
