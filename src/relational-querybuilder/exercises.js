const getConnection = require('./_connection');

const main = async () => {
  const knex = await getConnection();

  // TODO: complete the models configuration for the relation employees - dept_manager - departments
  Model.knex(knex);

  // 1. Get all departments
  const departments = []; // TODO: query here
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all managers of each department (order by from_date and then to_date)
  // Note: WHERE and ORDER BY are handled by the relationMapping in the model class (see Department)
  const managers = []; // TODO: query here
  console.log('\nEXERCISE 2\n----------');
  console.table(managers);
  console.table(managers[0]?.managers);

  // 3. Get the salaries of the managers from exercise 2
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
