const getConnection = require('./_connection');

const main = async () => {
  const knex = await getConnection();

  // 1. Example query
  const [sum] = await knex.raw('SELECT 1+1 AS result');
  console.log(sum, '-> sum should be 2');

  // 2. Get the number of employees
  // note: the variable query is a Promise
  const [employeeCount] = await knex('employees').count('*', {
    as: 'count'
  });
  console.log('\nFound', employeeCount.count, 'employees');

  // 3. Get and print the first three employees
  const firstThree = await knex('employees').select().limit(3);
  console.log('\nFirst three employees:');
  console.table(firstThree);

  // 4. Get one employee's titles
  const employeeWithTitles = await knex('employees AS e').select()
    .join('titles AS t', 'e.emp_no', '=', 't.emp_no')
    .where('e.emp_no', 12601);
  console.log('\nTitles of employee with emp_no 12601:');
  console.table(employeeWithTitles);

  // 5. Fetch all titles per employee with only one object per employee
  // -> still needs JS to map results
  const employeesWithTitles = await knex('employees').select()
    .join('titles', 'employees.emp_no', '=', 'titles.emp_no')
    .limit(1000); // for performance reasons

  let employees = Object.values(employeesWithTitles.reduce((employeesGrouped, {
    title,
    from_date,
    to_date,
    ...employee
  }) => {
    if (!(employee.emp_no in employeesGrouped)) {
      employeesGrouped[employee.emp_no] = {
        ...employee,
        titles: [],
      };
    }

    employeesGrouped[employee.emp_no].titles.push({
      title,
      from_date,
      to_date,
    });
    return employeesGrouped;
  }, {}));
  console.log('\nFirst employee with titles:');
  console.dir(employees[0]);

  // 6. Get all employees' departments
  // -> still needs JS to map results
  const employeesWithDepartments = await knex('employees').select()
    .join('dept_emp', 'dept_emp.emp_no', '=', 'employees.emp_no')
    .join('departments', 'departments.dept_no', '=', 'dept_emp.dept_no')
    .limit(1000); // for performance reasons

  employees = Object.values(employeesWithDepartments.reduce((employeesGrouped, { dept_no, dept_name, from_date, to_date, ...employee }) => {
    if (!(employee.emp_no in employeesGrouped)) {
      employeesGrouped[employee.emp_no] = {
        ...employee,
        departments: [],
      };
    }

    employeesGrouped[employee.emp_no].departments.push({
      dept_no,
      dept_name,
      from_date,
      to_date,
    });
    return employeesGrouped;
  }, {}));
  console.log('\nFirst employee with departments:');
  console.dir(employees[0]);

  // Close the connection
  await knex.destroy();
};

main();
