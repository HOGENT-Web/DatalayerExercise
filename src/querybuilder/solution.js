const getConnection = require('./_connection');

const main = async () => {
  const knex = await getConnection();

  // 1. Get all departments
  const departments = await knex('departments').select();
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all managers of each department (order by from_date and then to_date)
  const managers = await knex('employees').select()
    .join('dept_manager', 'employees.emp_no', '=', 'dept_manager.emp_no')
    .join('departments', 'dept_manager.dept_no', '=', 'departments.dept_no')
    .orderBy(['from_date', 'to_date']);
  console.log('\nEXERCISE 2\n----------');
  console.table(managers);

  // 3. Get the salaries of the managers from exercise 2
  const salaries = await knex('employees')
    .select('dept_name', 'employees.emp_no', 'first_name', 'last_name', 'salary')
    .where('dept_manager.to_date', '>', knex.raw('NOW()'))
    .andWhere('salaries.to_date', '>', knex.raw('NOW()'))
    .join('dept_manager', 'employees.emp_no', '=', 'dept_manager.emp_no')
    .join('departments', 'dept_manager.dept_no', '=', 'departments.dept_no')
    .join('salaries', 'employees.emp_no', '=', 'salaries.emp_no')
    .orderBy('salary');
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);

  // Close the connection
  await knex.destroy();
};

main();
