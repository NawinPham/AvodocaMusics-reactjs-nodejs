const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const PlaylistModel = require("./playlistModel");
const SongModel = require("./songModel");

const PlaylistSongModel = sequelize.define(
  "PlaylistSong",
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
    playlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Playlists",
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
    tableName: "playlistSongs",
    timestamps: false,
  }
);

// PlaylistSongModel.belongsTo(PlaylistModel, { foreignKey: "playlist_id" });
PlaylistSongModel.belongsTo(SongModel, { foreignKey: "songs_id" });
PlaylistSongModel.belongsTo(PlaylistModel, { foreignKey: "playlist_id" });


module.exports = PlaylistSongModel;
