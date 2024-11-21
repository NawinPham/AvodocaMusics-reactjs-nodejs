const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AccountModel = require("./accountModel");

const CommentModel = sequelize.define(
    "Comments",
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
                model: "Account",
                key: "id",
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        tableName: "comments",
        timestamps: true,
    }
);

CommentModel.belongsTo(AccountModel, { foreignKey: "account_id" })

module.exports = CommentModel;
