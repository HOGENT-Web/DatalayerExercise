const { DataTypes, Model } = require('sequelize');

class Salary extends Model {

  /** @type {number} */
  emp_no;

  /** @type {number} */
  salary;

  /** @type {Date} */
  from_date;

  /** @type {Date} */
  to_date;

  static initialize(sequelize) {
    Salary.init({
      emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      from_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },
      to_date: {
        type: DataTypes.DATEONLY,
      },
    }, {
      sequelize,
      modelName: 'Salary',
      tableName: 'salaries',
      freezeTableName: true,
      timestamps: false,
      deletedAt: false,
    });
  }

  static associate(models) {
    // A salary belongs to one user
    Salary.belongsTo(models.Employee, {
      foreignKey: 'emp_no',
      as: 'employees',
    });
  }
}

module.exports = Salary;
