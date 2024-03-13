'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserMovie, { foreignKey: 'MovieId' });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title required',
          },
          notEmpty: {
            msg: 'Title required',
          },
        },
      },
      posterUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Cover Image required',
          },
          notEmpty: {
            msg: 'Cover Image required',
          },
        },
      },
      backdropUrl: {
        type: DataTypes.STRING,
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Overview required',
          },
          notEmpty: {
            msg: 'Overview required',
          },
        },
      },
      tmdbId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Movie id required',
          },
          notEmpty: {
            msg: 'Movie id required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );
  return Movie;
};
