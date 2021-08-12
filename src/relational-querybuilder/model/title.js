const { Model } = require('objection');

class Title extends Model {

  /** @type {number} */
  emp_no;

  /** @type {string} */
  title;

  static get tableName() {
    return 'titles';
  }
}

module.exports = Title;
