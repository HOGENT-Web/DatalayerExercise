const { Model } = require('objection');
const Title = require('./title');
const Salary = require('./salary');
const Department = require('./department');
const EmployeeDepartment = require('./employee-department');
const DepartmentManager = require('./department-manager');

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

  static get tableName() {
    return 'employees';
  }

  static get relationMappings() {
    return {
      titles: {
        relation: Model.HasManyRelation,
        modelClass: Title,
        join: {
          from: `${this.tableName}.emp_no`,
          to: `${Title.tableName}.emp_no`,
        }
      },
      salaries: {
        relation: Model.HasManyRelation,
        modelClass: Salary,
        join: {
          from: `${this.tableName}.emp_no`,
          to: `${Salary.tableName}.emp_no`,
        },
        modify: (queryBuilder) => queryBuilder
          .where(`${Salary.tableName}.to_date`, '>', this.knex().raw('NOW()'))
          .orderBy('salary')
      },
      departments: {
        relation: Model.ManyToManyRelation,
        modelClass: Department,
        join: {
          from: `${this.tableName}.emp_no`,
          through: {
            from: `${EmployeeDepartment.tableName}.emp_no`,
            to: `${EmployeeDepartment.tableName}.dept_no`,
          },
          to: `${Department.tableName}.dept_no`,
        }
      },
      managerOf: {
        relation: Model.ManyToManyRelation,
        modelClass: Department,
        join: {
          from: `${this.tableName}.emp_no`,
          through: {
            from: `${DepartmentManager.tableName}.emp_no`,
            to: `${DepartmentManager.tableName}.dept_no`,
          },
          to: `${Department.tableName}.dept_no`,
        }
      }
    };
  }
}

module.exports = Employee;
