const getConnection = require('./_connection');
const { Employee } = require('./model');

const main = async () => {
  const sequelize = await getConnection();

  // 1. Example query
  const [sum] = await sequelize.query('SELECT 1+1 AS result');
  console.log(sum[0], '-> sum should be 2\n');

  // 2. Get the number of employees
  const employeeCount = await Employee.count();
  console.log('Found', employeeCount, 'employees\n');

  // 3. Get and print the first three employees
  const firstThree = await Employee.findAll({
    limit: 3,
    raw: true, // get JS objects instead of Sequelize models (i.e. Employee instances)
  });
  console.log('First three employees:');
  console.table(firstThree);

  // 4. Get one employee's titles
  const employeeWithTitles = await Employee.findAll({
    where: {
      emp_no: 12601,
    },
    include: 'titles', // include the relation with Title
  })
  console.log('\nTitles of employee with emp_no 12601:');
  // note: the toJSON is only necessary for pretty printing
  console.dir(employeeWithTitles[0].toJSON());

  // 5. Fetch all titles per employee with only one object per employee
  const employeesWithTitles = await Employee.findAll({
    include: 'titles',
    limit: 1000, // for performance reasons
  })
  console.log('\nFirst employee with titles:');
  console.dir(employeesWithTitles[0].toJSON());

  // 6. Get all employees' departments
  const employeesWithDepartments = await Employee.findAll({
    include: 'departments',
    limit: 1000 // for performance reasons
  });
  console.log('\nFirst employee with departments:');
  console.dir(employeesWithDepartments[0].toJSON());

  // Close the connection
  await sequelize.close();
};

main();
