const { DataTypes, Model } = require('sequelize');

class Department extends Model {

  /** @type {number} */
  dept_no;

  /** @type {string} */
  dept_name;

  /** @type {Employee[]} */
  employees;

  /** @type {Employee[]} */
  managers;

  static initialize(sequelize) {
    Department.init({
      dept_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      dept_name: {
        type: DataTypes.CHAR(40),
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Department',
      tableName: 'departments',
      freezeTableName: true,
      timestamps: false,
      deletedAt: false,
    });
  }

  static associate(models) {
    // A department belongs to many employees (his departments)
    Department.belongsToMany(models.Employee, {
      through: models.EmployeeDepartment,
      foreignKey: 'dept_no',
      as: 'employees',
    });

    // A department belongs to many employees (managers)
    Department.belongsToMany(models.Employee, {
      through: models.DepartmentManager,
      foreignKey: 'dept_no',
      as: 'managers',
    });
  }
}

module.exports = Department;
