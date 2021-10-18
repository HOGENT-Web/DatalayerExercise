const getConnection = require('./_connection');

const main = async () => {
  const knex = await getConnection();

  // TODO: complete the models configuration for the relation employees - dept_manager - departments
  Model.knex(knex);

  // 1. Get all departments
  const departments = []; // TODO: query here
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all active managers of each department (order by from_date and then to_date)
  // Note: WHERE and ORDER BY are handled by the relationMapping in the model class (see Department)
  const depsWithManagers = []; // TODO: query here
  console.log('\nEXERCISE 2\n----------');
  console.table(depsWithManagers);
  console.table(depsWithManagers[0]?.managers);

  // 3. Get the salary for the active manager per department (order by salary)
  // Note: WHERE and ORDER BY are handled by the relationMapping in the model classes (see Department and Employee)
  const salaries = []; // TODO: query here
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);
  console.table(salaries[0]?.managers);
  console.table(salaries[0]?.managers[0].salaries);

  // Close the connection
  await knex.destroy();
};

main();
