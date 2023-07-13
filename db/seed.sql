-- Inserting records into the 'departments' table
INSERT INTO department (department_name)
VALUES 
('Marketing & Sales'),
('Finance & Accounting'),
('Information Technology'),
('Operations');

-- Inserting records into the 'roles' table
INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Lead', 90000.00, 1),
('Marketing Manager', 125000.00, 1),
('Finance Head', 15000.00, 2),
('Accountant',10000,2)
('Senior Engineer', 185000.00, 3),
('IT Manager', 125000.00, 3),
('Project Manager', 95000.00, 4),
('Operation Manager', 35000.00, 4);

-- Inserting records into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('James', 'Antezana', 1, 1),
('Kim', 'Hurt', 2, null),
('David', 'Calle', 3, 3),
('Ashley', 'Moore', 4, null),
('Carlos', 'Hobbes', 5, 5),
('Mary', 'Neumann', 6, null),
('Tom', 'Holland', 7, 7),
('Ana', 'Ford', 8, null);

