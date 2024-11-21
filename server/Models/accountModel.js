const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const PlaylistModel = require("./playlistModel");
// const FollowModel = require("./followModel");
// const HistoryListenModel = require("./historyListenModel");
// const HistoryUploadModel = require("./historyUploadModel");
const RoleModel = require("./roleModel");
// const FavoriteSongModel = require("./favoriteSongModel");

const AccountModel = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id",
      },
      defaultValue: 2,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
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
    tableName: "accounts",
    timestamps: true,
  }
);


AccountModel.belongsTo(RoleModel, { foreignKey: "role_id" })

// AccountModel.hasMany(PlaylistModel, { foreignKey: "account_id" });
// AccountModel.hasMany(FollowModel, { foreignKey: "following_user_id" });
// AccountModel.hasMany(FollowModel, { foreignKey: "followed_user_id" });
// AccountModel.hasMany(HistoryListenModel, { foreignKey: "account_id" });
// AccountModel.hasMany(HistoryUploadModel, { foreignKey: "account_id" });
// AccountModel.hasMany(FavoriteSongModel, { foreignKey: "account_id" });

module.exports = AccountModel;
