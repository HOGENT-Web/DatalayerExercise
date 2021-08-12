const getConnection = require("./_connection");

const main = async () => {
  const knex = await getConnection();

  // 1. Example query
  const [sum] = await knex.raw('SELECT 1+1 AS result');
  console.log(sum, '-> sum should be 2');

  // 2. Get the number of employees
  // note: the variable query is a Promise
  let query = knex('employees').count('*', {
    as: 'count'
  });
  const [employeeCount] = await query;
  console.log('\nFound', employeeCount.count, 'employees');
  console.log('Query executed:', query.toString());

  // 3. Get and print the first three employees
  query = knex('employees').select().limit(3);
  const firstThree = await query;
  console.log('\nFirst three employees:');
  console.table(firstThree);
  console.log('Query executed:', query.toString());

  // 4. Get one employee's titles
  query = knex('employees').select()
  .join('titles', 'employees.emp_no', '=', 'titles.emp_no')
  .where('employees.emp_no', 12601);
  const employeeWithTitles = await query;
  console.log('\nTitles of employee with emp_no 12601:');
  console.table(employeeWithTitles);
  console.log('Query executed:', query.toString());

  // 5. Fetch all titles per employee with only one object per employee
  // -> still needs JS to map results
  query = knex('employees').select()
    .join('titles', 'employees.emp_no', '=', 'titles.emp_no')
    .limit(1000); // for performance reasons
  const employeesWithTitles = await query;

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
  console.log('Query executed:', query.toString());

  // 6. Get all employees' departments
  // -> still needs JS to map results
  query = knex('employees').select()
    .join('dept_emp', 'dept_emp.emp_no', '=', 'employees.emp_no')
    .join('departments', 'departments.dept_no', '=', 'dept_emp.dept_no')
    .limit(1000); // for performance reasons
  const employeesWithDepartments = await query;

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
  console.log('Query executed:', query.toString());

  // Close the connection
  await knex.destroy();
};

main();
