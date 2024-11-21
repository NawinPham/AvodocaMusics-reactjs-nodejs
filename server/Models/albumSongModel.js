const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SongModel = require("./songModel");
const AlbumModel = require("./albumModel");

const AlbumSongModel = sequelize.define(
  "AlbumSong",
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
    album_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Albums",
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
  },
  {
    tableName: "albumSongs",
    timestamps: false,
  }
);

AlbumSongModel.belongsTo(SongModel, { foreignKey: "songs_id" });

AlbumSongModel.belongsTo(AlbumModel, { foreignKey: "album_id" });


module.exports = AlbumSongModel;
