const { Model } = require('objection');
const getConnection = require('./_connection');
const { Employee } = require('./model');
const Department = require('./model/department');

const main = async () => {
  const knex = await getConnection();

  // pass the Knex instance to the Objection Model
  Model.knex(knex);

  // 1. Example query
  const [sum] = await knex.raw('SELECT 1+1 AS result');
  console.log(sum, '-> sum should be 2');

  // 2. Get the number of employees
  // note: the variable query is a Promise
  const employeeCount = await Employee.query().count('*', { as: 'count' });
  console.log('\nFound', employeeCount[0].count, 'employees');
  console.log('Raw response', employeeCount);

  // 3. Get and print the first three employees
  const firstThree = await Employee.query().select().limit(3);
  console.log('\nFirst three employees:');
  console.table(firstThree);

  // 4. Get one employee's titles
  const employeeWithTitles = await Employee.query().select()
    .join('titles', 'employees.emp_no', '=', 'titles.emp_no')
    .where('employees.emp_no', 12601);
  console.log('\nTitles of employee with emp_no 12601:');
  console.table(employeeWithTitles);

  // 5. Fetch all titles per employee with only one object per employee
  // -> still needs JS to map results
  let employeesWithTitles = await Employee.query().select()
    .withGraphFetched('titles') // See the difference in executed queries with the next solution
    .limit(1000); // for performance reasons

  console.log('\nFirst employee with titles (withGraphFetched):');
  console.dir(employeesWithTitles[0]);

  employeesWithTitles = await Employee.query().select()
    .withGraphJoined('titles') // See the difference in executed queries with the next solution
    .limit(1000); // for performance reasons

  console.log('\nFirst employee with titles (withGraphJoined):');
  console.dir(employeesWithTitles[0]);

  // 6. Get all employees' departments
  // -> still needs JS to map results
  const employeesWithDepartments = await Employee.query().select()
    .withGraphFetched('departments')
    .limit(1000); // for performance reasons

  console.log('\nFirst employee with departments:');
  console.dir(employeesWithDepartments[0]);

  // Close the connection
  await knex.destroy();
};

main();
