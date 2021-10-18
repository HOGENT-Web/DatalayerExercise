const { Model } = require('objection');
const { Department } = require('./model');
const getConnection = require('./_connection');

const main = async () => {
  const knex = await getConnection();

  Model.knex(knex);

  // 1. Get all departments
  const departments = await Department.query().select();
  console.log('EXERCISE 1\n----------');
  console.table(departments);

  // 2. Get all active managers of each department (order by from_date and then to_date)
  const managers = await Department.query().select()
    .withGraphFetched('managers');
  console.log('\nEXERCISE 2\n----------');
  console.table(managers);
  console.table(managers[0]?.managers);

  // 3. Get the salary for the active manager per department (order by salary)
  const salaries = await Department.query().select()
    .withGraphFetched('managers')
    .withGraphFetched('managers.salaries');
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);
  console.table(salaries[0].managers)
  console.table(salaries[0]?.managers[0].salaries);

  // Close the connection
  await knex.destroy();
};

main();
