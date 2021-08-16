const getConnection = require('./_connection');
const { Department, Employee, Salary } = require('./model');

const main = async () => {
  const sequelize = await getConnection();

  // 1. Get all departments
  const departments = []; // TODO: query here
  console.log('EXERCISE 1\n----------');
  console.table(departments.map((department) => department.toJSON()));

  // 2. Get all managers of each department (order by from_date and then to_date)
  let depsWithManagers = []; // TODO: query here
  depsWithManagers = depsWithManagers.map((manager) => manager.toJSON());
  console.log('\nEXERCISE 2\n----------');
  console.table(depsWithManagers);
  console.table(depsWithManagers[0]?.managers);
  console.table(depsWithManagers[0]?.managers[0].DepartmentManager);

  // 3. Get the salaries of the managers from exercise 2
  let salaries = []; // TODO: query here
  salaries = salaries.map((salary) => salary.toJSON());
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);
  console.table(salaries[0]?.managers)
  console.table(salaries[0]?.managers[0].salaries);

  // Close the connection
  await sequelize.close();
};

main();
