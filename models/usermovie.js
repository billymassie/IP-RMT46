'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserMovie.belongsTo(models.User);
      UserMovie.belongsTo(models.Movie);
    }
  }
  UserMovie.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      MovieId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserMovie',
    }
  );
  return UserMovie;
};
