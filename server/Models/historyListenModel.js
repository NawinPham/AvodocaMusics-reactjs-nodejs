const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SongModel = require("./songModel");

const HistoryListenModel = sequelize.define(
  "HistoryListen",
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "history_listen",
    timestamps: true,
  }
);

HistoryListenModel.belongsTo(SongModel, { foreignKey: "songs_id" });


module.exports = HistoryListenModel;
