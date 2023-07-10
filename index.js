const inquirer = require("inquirer");
const db = require('./db/connection');

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  employee_tracker();
});
  
// Function to Start Employee Tracker Application
var employee_tracker= function () {
  inquirer
    .prompt([{
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
        "Exit"],
    }])
    .then((answer) => {
      // Handle user choice
      if (answers.prompt === 'View All Department') {
        //View all departmnets
        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Departments: ");
            console.table(result);
            employee_tracker();
        });
    } else if (answers.prompt === 'View All Roles') {
      //View all roles
        db.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Roles: ");
            console.table(result);
            employee_tracker();
        });
    } else if (answers.prompt === 'View All Employees') {
      //View all employees
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Employees: ");
            console.table(result);
            employee_tracker();
        });
    } else if (answers.prompt === 'Add A Department') {
      //Add a department
        inquirer.prompt([{
            // Adding a Department
            type: 'input',
            name: 'department',
            message: 'What is the name of the dpeartment?',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('Please Add A Department!');
                    return false;
                }
            }
        }]).then((answers) => {
          db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
              if (err) throw err;
              console.log(`Added ${answers.department} to the database.`)
              employee_tracker();
          });
      })
  } else if (answers.prompt === 'Add A Role') {
    //Add a role
      // Beginning with the database so that we may acquire the departments for the choice
      db.query(`SELECT * FROM department`, (err, result) => {
          if (err) throw err;

          inquirer.prompt([
              {
                  // Adding A Role
                  type: 'input',
                  name: 'role',
                  message: 'What is the name of the role?',
                  validate: roleInput => {
                      if (roleInput) {
                          return true;
                      } else {
                          console.log('Please Add A Role!');
                          return false;
                      }
                  }
              },
              {
                // Adding the Salary
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('Please Add A Salary!');
                        return false;
                    }
                }
            },
            {
              // Department
              type: 'list',
              name: 'department',
              message: 'Which department does the role belong to?',
              choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                      array.push(result[i].name);
                  }
                  return array;
              }
          }
      ]).then((answers) => {
        // Find the department ID based on the selected department name
          for (var i = 0; i < result.length; i++) {
              if (result[i].name === answers.department) {
                  var department = result[i];
              }
          }
//Insert the role into the database
          db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
              if (err) throw err;
              console.log(`Added ${answers.role} to the database.`)
              employee_tracker();
          });
      })
  });
      })
    };