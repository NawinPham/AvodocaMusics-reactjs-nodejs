const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FollowModel = sequelize.define(
  "Follow",
  {
    following_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Accounts",
        key: "id",
      },
    },
    followed_user_id: {
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
    tableName: "follows",
    timestamps: true,
  }
);

module.exports = FollowModel;
