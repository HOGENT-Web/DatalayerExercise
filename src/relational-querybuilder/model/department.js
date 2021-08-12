const { Model } = require('objection');

class Department extends Model {

  /** @type {number} */
  dept_no;

  /** @type {string} */
  dept_name;

  /** @type {Employee[]} */
  employees;

  /** @type {Employee[]} */
  managers;

  static get tableName() {
    return 'departments';
  }

  static get relationMappings() {
    // To prevent require loops with Employee
    const Employee = require('./employee');
    const EmployeeDepartment = require('./employee-department');
    const DepartmentManager = require('./department-manager');

    return {
      employees: {
        relation: Model.ManyToManyRelation,
        modelClass: Employee,
        join: {
          from: `${this.tableName}.dept_no`,
          through: {
            from: `${EmployeeDepartment.tableName}.dept_no`,
            to: `${EmployeeDepartment.tableName}.emp_no`,
          },
          to: `${Employee.tableName}.emp_no`,
        }
      },
      managers: {
        relation: Model.ManyToManyRelation,
        modelClass: Employee,
        join: {
          from: `${this.tableName}.dept_no`,
          through: {
            from: `${DepartmentManager.tableName}.dept_no`,
            to: `${DepartmentManager.tableName}.emp_no`,
          },
          to: `${Employee.tableName}.emp_no`,
        },
        modify: (queryBuilder) => queryBuilder
          .where(`${DepartmentManager.tableName}.to_date`, '>', this.knex().raw('NOW()'))
          .orderBy('to_date')
      }
    };
  }
}

module.exports = Department;
