const { DataTypes, Model } = require('sequelize');

class Title extends Model {

  /** @type {number} */
  emp_no;

  /** @type {string} */
  title;

  /** @type {Date} */
  from_date;

  /** @type {Date} */
  to_date;

  static initialize(sequelize) {
    Title.init({
      emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        primaryKey: true,
      },
      from_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },
      to_date: {
        type: DataTypes.DATEONLY,
      },
    }, {
      sequelize,
      modelName: 'Title',
      tableName: 'titles',
      freezeTableName: true,
      timestamps: false,
      deletedAt: false,
    });
  }

  static associate(models) {
    // A title belongs to one user
    Title.belongsTo(models.Employee, {
      foreignKey: 'emp_no',
      as: 'employees',
    });
  }
}

module.exports = Title;
