const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AlbumModel = require("./albumModel");

const ArtistSongModel = sequelize.define(
  "ArtistSong",
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
    artist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Artists",
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "artistsongs",
    timestamps: false,
  }
);

module.exports = ArtistSongModel;
