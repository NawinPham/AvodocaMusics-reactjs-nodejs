const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const AlbumModel = require("./albumModel");
// const ArtistSongModel = require("./artistSongModel");

const ArtistModel = sequelize.define(
  "Artist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    debutDate: {
      type: DataTypes.DATE,
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
    tableName: "artists",
    timestamps: true,
  }
);

// ArtistModel.hasMany(AlbumModel, { foreignKey: "artist_id" });
// ArtistModel.hasMany(ArtistSongModel, { foreignKey: "artist_id" });

module.exports = ArtistModel;
