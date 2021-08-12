const getConnection = require("./_connection");

const main = async () => {
  const knex = await getConnection();

  // Close the connection
  await knex.destroy();
};

main();
