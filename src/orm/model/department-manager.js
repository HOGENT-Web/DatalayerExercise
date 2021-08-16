const { Model, DataTypes } = require('sequelize');

class DepartmentManager extends Model {

  /** @type {number} */
  emp_no;

  /** @type {number} */
  dept_no;

  /** @type {Date} */
  from_date;

  /** @type {Date} */
  to_date;

  static initialize(sequelize) {
    DepartmentManager.init({
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
      modelName: 'DepartmentManager',
      tableName: 'dept_manager',
      freezeTableName: true,
      timestamps: false,
      deletedAt: false,
    });
  }
}

module.exports = DepartmentManager;
