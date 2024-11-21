const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SongModel = require("./songModel");

const FavoriteSongModel = sequelize.define(
  "userfavoritesongs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    songs_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Songs",
        key: "id",
      },
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Accounts",
        key: "id",
      },
    },
  },
  {
    tableName: "userfavoritesongs",
    timestamps: false,
  }
);

FavoriteSongModel.belongsTo(SongModel, {foreignKey: "songs_id"})

module.exports = FavoriteSongModel;
