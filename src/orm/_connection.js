const { Sequelize } = require('sequelize');
const config = require('../config');
const models = require('./model');

const getSequelize = async () => {
  const { database, user, password, ...otherConfig } = config;
  const sequelize = new Sequelize(config.database, config.user, config.password, {
    ...otherConfig,
    dialect: 'mysql',
  });

  // Try the connection
  await sequelize.authenticate();

  // Initialize all models
  Object.values(models)
    .forEach((model) => {
      if (model.initialize) {
        model.initialize(sequelize);
      }
    });

  // Initialize all relations
  Object.values(models)
    .forEach((model) => {
      if (model.associate) {
        // We need to pass the models to prevent require loops
        model.associate(models);
      }
    });

  return sequelize
};

module.exports = getSequelize;
