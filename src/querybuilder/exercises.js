const getConnection = require('./_connection');

const main = async () => {
  const knex = await getConnection();

  // 1. Get all departments
  const departments = []; // TODO: query here
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all managers of each department (order by from_date and then to_date)
  const depsWithManagers = []; // TODO: query here
  console.log('\nEXERCISE 2\n----------');
  console.table(depsWithManagers);

  // 3. Get the salaries of the managers from exercise 2
  const salaries = []; // TODO: query here
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);

  // Close the connection
  await knex.destroy();
};

main();
