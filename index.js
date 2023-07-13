const inquirer = require("inquirer");
const db = require("./db/connection");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  employee_tracker();
});

async function employee_tracker() {
  // Prompt user for action
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "prompt",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update an employees' role",
        "Exit",
      ],
    },
  ]);

  switch (answers.prompt) {
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "View all employees":
      viewAllEmployees();
      break;
    case "Add department":
      addDepartment();
      break;
    case "Add role":
      addRole();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Update an employee's role":
      updateEmployeeRole();
      break;
    case "Exit":
      db.end();
      console.log("Goodbye!");
      return;
    default:
      console.log("Invalid choice. Please try again.");
      employee_tracker();
  }
}

function viewAllDepartments() {
  // Query to retrieve all departments
  const query = "SELECT * FROM department";
  db.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    employee_tracker();
  });
}
function viewAllRoles() {
  // Query to retrieve all roles with department information
  const query = "SELECT * FROM role";
  db.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    employee_tracker();
  });
}

function viewAllEmployees() {
  // Query to retrieve all employees with role and department information
  const query = "SELECT * FROM employee ";
  db.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    employee_tracker();
  });
}

async function addDepartment() {
  // Prompt user for new department name
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the new department?",
      },
    ]);
    // Insert new department into the database
    const query = "INSERT INTO department (department_name) VALUES (?)";
    db.query(query, [answers.newDepartment]);
    employee_tracker();
  } catch (err) {
    console.error(err);
  }
}

async function addRole() {
  // Prompt user for new role information
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "newRole",
      message: "What is the new role?",
    },
    {
      type: "input",
      name: "newSalary",
      message: "What is the salary?",
    },
    {
      type: "input",
      name: "newDepartID",
      message: "What is the department ID?",
    },
  ]);
  // Insert new role into the database
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    [answers.newRole, answers.newSalary, answers.newDepartID],
    (err, result) => {
      if (err) throw err;
      employee_tracker();
    }
  );
}

async function addEmployee() {
  // Prompt user for new employee information
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the new employees' first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the new employees' last name?",
    },
    {
      type: "input",
      name: "newRole",
      message: "What is the new employees' role ID?",
    },
    {
      type: "input",
      name: "managerID",
      message: "What is the new employees' manager ID?",
    },
  ]);
  // Insert new employee into the database
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    [answers.firstName, answers.lastName, answers.newRole, answers.managerID],
    (err, result) => {
      if (err) throw err;
      employee_tracker();
    }
  );
}

async function updateEmployeeRole() {
  // Prompt user for employee and role information
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "updateEmployee",
      message: "What is the employees' ID?",
    },
    {
      type: "input",
      name: "updateRole",
      message: "What is the roles ID?",
    },
  ]);
  // Update the employee's role in the database
  db.query(
    `UPDATE employee SET role_id = ? WHERE id = ?`,
    [answers.updateRole, answers.updateEmployee],
    (err, result) => {
      if (err) throw err;
      console.table(result);
      employee_tracker();
    }
  );
}
