-- Inserting records into the 'departments' table
INSERT INTO departments (department_name)
VALUES 
('Executive Board'),
('Marketing & Sales'),
('Human Resources'),
('Finance & Accounting'),
('Engineering'),
('Information Technology'),
('Legal'),
('Maintenance');

-- Inserting records into the 'roles' table
INSERT INTO roles (title, salary, department_id)
VALUES 
('Chief Executive Officer', 555000.00, 1),
('Marketing Manager', 125000.00, 2),
('HR Director', 189000.00, 3),
('Finance Head', 145000.00, 4),
('Senior Engineer', 185000.00, 5),
('IT Manager', 125000.00, 6),
('Legal Manager', 95000.00, 7),
('Maintenance Manager', 135000.00, 8);

-- Inserting records into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('James', 'Antezana', 1, 1),
('Kim', 'Hurt', 2, 2),
('David', 'Calle', 3, 3),
('Ashley', 'Moore', 4, 4),
('Carlos', 'Hobbes', 5, 5),
('Mary', 'Neumann', 6, 6),
('Tom', 'Holland', 7, 7),
('Ana', 'Ford', 8, 8);

