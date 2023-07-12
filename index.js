const inquirer = require("inquirer");
const db = require("./db/connection");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  employee_tracker();
});

// Function to Start Employee Tracker Application
async function employee_tracker() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "prompt",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);

  // Handle user choice
  if (answers.prompt === "View All Department") {
    //View all departmnets
    db.query(`SELECT * FROM department`, (err, result) => {
      if (err) throw err;
      console.table(result);
      employee_tracker();
    });
  }
  if (answers.prompt === "View All Roles") {
    //View all roles
    db.query(`SELECT * FROM role`, (err, result) => {
      if (err) throw err;
      console.table(result);
      employee_tracker();
    });
  }
  if (answers.prompt === "View All Employees") {
    //View all employees
    db.query(`SELECT * FROM employee`, (err, result) => {
      if (err) throw err;
      console.table(result);
      employee_tracker();
    });
  }
  if (answers.prompt === "Add A Department") {
    //Add a department
    const answers = await inquirer.prompt([
      {
        // Adding a Department
        type: "input",
        name: "newDepartment",
        message: "What is the name of the dpeartment?",
      },
    ]);

    db.query(
      `INSERT INTO department (name) VALUES (?)`,
      [answers.newDepartment],
      (err, result) => {
        if (err) throw err;
        console.table(result);
        employee_tracker();
      }
    );
  }
  if (answers.prompt === "Add A Role") {
    //Add a role
    // Beginning with the database so that we may acquire the departments for the choice

    const answers = await inquirer.prompt([
      {
        // Adding A Role
        type: "input",
        name: "newRole",
        message: "What is the name of the role?",
      },
      {
        // Adding the Salary
        type: "input",
        name: "newSalary",
        message: "What is the salary of the role?",
      },
      {
        // Department
        type: "list",
        name: "newDepartmentId",
        message: "Which department does the role belong to?",
      },
    ]);
    //Insert the role into the database
    db.query(
      `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
      [answers.newRole, answers.newSalary, answers.newDepartmentId],
      (err, result) => {
        if (err) throw err;
        console.table(result);
        employee_tracker();
      }
    );
  }

  if (answers.prompt === "Add An Employee") {
    //Add an employee
    // Calling the database to acquire the roles and manager

    const answers = await inquirer.prompt([
      {
        // Adding Employee First Name
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
      },
      {
        // Adding Employee Last Name
        type: "input",
        name: "lastName",
        message: "What is the employees last name?",
      },
      {
        // Adding Employee Role
        type: "list",
        name: "newRole",
        message: "What is the employees role ID?",
      },
      {
        // Adding Employee Manager
        type: "input",
        name: "managerID",
        message: "Who is the employees manager ID?",
      },
    ]);

    // Insert the employee into the database
    db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
      [answers.firstName, answers.lastName, answers.newRole, answers.managerID],
      (err, result) => {
        if (err) throw err;
        console.table(result);
        employee_tracker();
      }
    );
  }
  if (answers.prompt === "Update An Employee Role") {
    // Update an employee's role

    const answers = await inquirer.prompt([
      {
        // Choose an Employee to Update
        type: "list",
        name: "updateEmployee",
        message: "What is the employee ID?",
      },
      {
        // Updating the New Role
        type: "list",
        name: "updateRole",
        message: "What is their new role ID?",
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
}
db.connect((err) => {
  if (err) throw err;
  employee_tracker();
});
