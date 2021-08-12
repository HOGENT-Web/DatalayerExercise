const { Model } = require('objection');

class DepartmentManager extends Model {

  /** @type {number} */
  emp_no;

  /** @type {number} */
  dept_no;

  /** @type {Date} */
  from_date;

  /** @type {Date} */
  to_date;

  static get tableName() {
    return 'dept_manager';
  }
}

module.exports = DepartmentManager;
