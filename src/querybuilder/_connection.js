const Knex = require('knex');
const config = require('../config');

const getKnex = () => Knex({
  client: 'mysql2', // note: same package as manual
  connection: config,
  debug: true, // will print every executed query
});

module.exports = getKnex;
