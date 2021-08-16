const { Model, DataTypes } = require('sequelize');

class EmployeeDepartment extends Model {

  /** @type {number} */
  emp_no;

  /** @type {number} */
  dept_no;

  /** @type {Date} */
  from_date;

  /** @type {Date} */
  to_date;

  static initialize(sequelize) {
    EmployeeDepartment.init({
      emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      dept_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      from_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      to_date: {
        type: DataTypes.DATEONLY,
      },
    }, {
      sequelize,
      modelName: 'EmployeeDepartment',
      tableName: 'dept_emp',
      freezeTableName: true,
      timestamps: false,
      deletedAt: false,
    });
  }
}

module.exports = EmployeeDepartment;
