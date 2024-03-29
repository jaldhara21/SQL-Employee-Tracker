-- Drops the employeeTracker_db if it exists currently --
-- Creates the employeeTracker_db database --
-- use employeeTracker_db database --
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

-- Creates the table "departments","roles","employee" within employeeTracker_db --

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (role_id)
REFERENCES role(id)
ON DELETE SET NULL,
FOREIGN KEY (manager_id)
REFERENCES employee(id)
ON DELETE SET NULL
);