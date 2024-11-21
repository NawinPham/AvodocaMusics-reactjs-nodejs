const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HistoryUploadModel = sequelize.define(
  "HistoryUpload",
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
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Accounts",
        key: "id",
      },
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
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
    tableName: "history_upload",
    timestamps: true,
  }
);

module.exports = HistoryUploadModel;
