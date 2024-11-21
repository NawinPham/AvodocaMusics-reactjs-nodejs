const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FavoriteSong = sequelize.define(
  "userfavoritesongs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    song_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Songs",
        key: "id",
      },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "accounts",
          key: "id",
        },
      },
  },
  {
    tableName: "userfavoritesongs",
    timestamps: false,
  }
);

module.exports = FavoriteSong;
