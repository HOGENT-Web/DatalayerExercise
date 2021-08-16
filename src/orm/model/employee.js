const { DataTypes, Model } = require('sequelize');

class Employee extends Model {

  /** @type {number} */
  emp_no;

  /** @type {Date} */
  birth_date;

  /** @type {string} */
  first_name;

  /** @type {string} */
  last_name;

  /** @type {'M' | 'F'} */
  gender;

  /** @type {Date} */
  hire_date;

  /** @type {Title[]} */
  titles;

  /** @type {Salary[]} */
  salaries;

  /** @type {Department[]} */
  departments;

  /** @type {Department[]} */
  managerOf;

  static initialize(sequelize) {
    Employee.init({
      emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.CHAR(14),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.CHAR(16),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Employee',
      tableName: 'employees',
      freezeTableName: true,
      timestamps: false,
      deletedAt: false,
    });
  }

  static associate(models) {
    // An employee has many departments
    Employee.belongsToMany(models.Department, {
      through: models.EmployeeDepartment,
      foreignKey: 'emp_no',
      as: 'departments',
    });

    // An employee can manage many departments
    Employee.belongsToMany(models.Department, {
      through: models.DepartmentManager,
      foreignKey: 'emp_no',
      as: 'managerOf',
    });

    // An employee has many titles
    Employee.hasMany(models.Title,  {
      foreignKey: 'emp_no',
      as: 'titles',
    });

    // An employee has many salaries
    Employee.hasMany(models.Salary, {
      foreignKey: 'emp_no',
      as: 'salaries'
    });
  }
}

module.exports = Employee;
