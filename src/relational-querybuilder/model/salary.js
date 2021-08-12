const { Model } = require('objection');

class Salary extends Model {

  /** @type {number} */
  emp_no;

  /** @type {number} */
  salary;

  /** @type {Date} */
  from_date;

  /** @type {Date} */
  to_date;

  static get tableName() {
    return 'salaries';
  }
}

module.exports = Salary;
