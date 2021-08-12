const getConnection = require('./_connection');

const main = async () => {
  const pool = await getConnection();

  // first item contains all rows the query returned (objects with column names as keys)
  // second item in the array contains column information
  const [result] = await pool.query('SELECT 1+1 AS sum;');
  console.log(result, '-> sum should be 2');

  const [employeeCount] = await pool.query('SELECT COUNT(1) AS count FROM employees;');
  console.log('Found', employeeCount[0].count, 'employees');
  console.log('The exact query result was:', employeeCount);

  const [firstThree] = await pool.query('SELECT * FROM employees LIMIT 3;');
  console.log('First three employees:', firstThree);

  const [employeeWithTitles] = await pool.query(`
    SELECT e.emp_no, first_name, last_name, title
    FROM employees e
      JOIN titles t ON e.emp_no = t.emp_no
    WHERE e.emp_no = 12601;
  `);
  console.log('Titles of employee with emp_no 12601:', employeeWithTitles);

  // Now we need to fetch all titles per employee with only one object per employee
  // -> need to map this in JS, not possible with MySQL client
  const [employeesWithTitles] = await pool.query(`
    SELECT e.emp_no, first_name, last_name, gender, birth_date, title, from_date, to_date
    FROM employees e
      JOIN titles t ON e.emp_no = t.emp_no
    LIMIT 1000; -- for performance reasons
  `);
  let employees = Object.values(employeesWithTitles.reduce((employeesGrouped, { title, from_date, to_date, ...employee }) => {
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
  console.log('First employee with titles:');
  console.dir(employees[0]);

  // This only gets worse when fetching the departments
  const [employeesWithDepartments] = await pool.query(`
    SELECT *
    FROM employees e
      JOIN dept_emp de ON e.emp_no = de.emp_no
      JOIN departments d ON d.dept_no = de.dept_no
    LIMIT 1000; -- for performance reasons
  `);
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
  console.log('First employee with departments:');
  console.dir(employees[0]);

  // Close the connection
  await pool.end();
};

main();
