const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const AlbumSongModel = require("./albumSongModel");
const ArtistModel = require("./artistModel");
const AccountModel = require("./accountModel");

const AlbumModel = sequelize.define(
  "Album",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Accounts",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "artists",
        key: "id",
      },
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: "albums",
    timestamps: true,
  }
);

AlbumModel.belongsTo(ArtistModel, { foreignKey: "artist_id" });

// AlbumModel.belongsTo(SongModel, { foreignKey: "album_id" });

AlbumModel.belongsTo(AccountModel, { foreignKey: "account_id" });


module.exports = AlbumModel;
