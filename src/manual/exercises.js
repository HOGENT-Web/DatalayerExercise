const getConnection = require('./_connection');

const main = async () => {
  const pool = await getConnection();

  // 1. Get all departments
  const [departments] = []; // TODO: query here
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all active managers of each department (order by from_date and then to_date)
  const [depsWithManagers] = []; // TODO: query here
  console.log('\nEXERCISE 2\n----------');
  console.table(depsWithManagers);

  // 3. Get the salary for the active manager per department (order by salary)
  const [salaries] = []; // TODO: query here
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);

  await pool.end();
};

main();
