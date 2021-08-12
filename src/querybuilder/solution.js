const getConnection = require('./_connection');

const main = async () => {
  const knex = await getConnection();

  // 1. Get all departments
  const departments = await knex('departments').select();
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all managers of each department (order by from_date and then to_date)
  let managers = await knex('departments').select()
    .join('dept_manager', 'dept_manager.dept_no', '=', 'departments.dept_no')
    .join('employees', 'employees.emp_no', '=', 'dept_manager.emp_no')
    .where('to_date', '>', knex.raw('NOW()'))
    .orderBy(['from_date', 'to_date']);

  managers = Object.values(managers.reduce((departmentsGrouped, { dept_no, dept_name, from_date, to_date, ...employee }) => {
    if (!(employee.emp_no in departmentsGrouped)) {
      departmentsGrouped[dept_no] = {
        dept_no,
        dept_name,
        from_date,
        to_date,
        managers: [],
      };
    }

    departmentsGrouped[dept_no].managers.push(employee);
    return departmentsGrouped;
  }, {}));
  console.log('\nEXERCISE 2\n----------');
  console.table(managers);
  console.table(managers[0]?.managers);

  // 3. Get the salaries of the managers from exercise 2
  const salaries = await knex('departments')
    .select('dept_name', 'employees.emp_no', 'first_name', 'last_name', 'salary')
    .where('dept_manager.to_date', '>', knex.raw('NOW()'))
    .andWhere('salaries.to_date', '>', knex.raw('NOW()'))
    .join('dept_manager', 'dept_manager.dept_no', '=', 'departments.dept_no')
    .join('employees', 'employees.emp_no', '=', 'dept_manager.emp_no')
    .join('salaries', 'employees.emp_no', '=', 'salaries.emp_no')
    .orderBy('salary');

  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);

  // Close the connection
  await knex.destroy();
};

main();
