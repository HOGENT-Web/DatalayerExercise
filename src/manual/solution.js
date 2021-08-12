const getConnection = require('./_connection');

const main = async () => {
  const pool = await getConnection();

  // 1. Get all departments
  const [departments] = await pool.query('SELECT * FROM departments');
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all managers of each department (order by from_date and then to_date)
  const [managers] = await pool.query(`
    SELECT *
    FROM employees e
      JOIN dept_manager dm ON e.emp_no = dm.emp_no
        JOIN departments d ON dm.dept_no = d.dept_no
    ORDER BY from_date, to_date;
  `);
  console.log('\nEXERCISE 2\n----------');
  console.table(managers);

  // 3. Get the salary for the active manager per department (order by salary)
  const [salaries] = await pool.query(`
    SELECT dept_name, e.emp_no, first_name, last_name, salary
    FROM employees e
      JOIN dept_manager dm ON e.emp_no = dm.emp_no
        JOIN departments d ON dm.dept_no = d.dept_no
        JOIN salaries s ON e.emp_no = s.emp_no
    WHERE dm.to_date > NOW()  AND s.to_date > NOW()
    ORDER BY salary;
`);
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);

  await pool.end();
};

main();
