const getConnection = require('./_connection');

const main = async () => {
  const pool = await getConnection();

  // 1. Get all departments
  const [departments] = await pool.query('SELECT * FROM departments');
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all managers of each department (order by from_date and then to_date)
  let [managers] = await pool.query(`
    SELECT *
    FROM departments d
      JOIN dept_manager dm ON dm.dept_no = d.dept_no
      JOIN employees e ON e.emp_no = dm.emp_no
    WHERE to_date > NOW()
    ORDER BY from_date, to_date;
  `);
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

  // 3. Get the salary for the active manager per department (order by salary)
  const [salaries] = await pool.query(`
    SELECT dept_name, e.emp_no, first_name, last_name, salary
    FROM departments d
      JOIN dept_manager dm ON dm.dept_no = d.dept_no
      JOIN employees e ON e.emp_no = dm.emp_no
      JOIN salaries s ON e.emp_no = s.emp_no
    WHERE dm.to_date > NOW()  AND s.to_date > NOW()
    ORDER BY salary;
  `);
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);

  await pool.end();
};

main();
