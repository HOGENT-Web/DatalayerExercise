const { Model } = require('objection');

class Title extends Model {

  /** @type {number} */
  emp_no;

  /** @type {string} */
  title;

  /** @type {Date} */
  from_date;

  /** @type {Date} */
  to_date;

  static get tableName() {
    return 'titles';
  }
}

module.exports = Title;
