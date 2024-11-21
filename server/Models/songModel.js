const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GenreModel = require("./genreModel");
const AccountModel = require("./accountModel");
// const PlaylistSongModel = require("./playlistSongModel");
// const AlbumSongModel = require("./albumSongModel");
// const HistoryListenModel = require("./historyListenModel");
// const HistoryUploadModel = require("./historyUploadModel");
// const FavoriteSongModel = require("./favoriteSongsModel");

const SongModel = sequelize.define(
  "Song",
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
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Genres",
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
    tableName: "songs",
    timestamps: true,
  }
);

SongModel.belongsTo(GenreModel, { foreignKey: "genre_id" });

SongModel.belongsTo(AccountModel, { foreignKey: "account_id" });


// SongModel.hasMany(PlaylistSongModel, { foreignKey: "songs_id" });
// SongModel.hasMany(AlbumSongModel, { foreignKey: "songs_id" });
// SongModel.hasMany(HistoryListenModel, { foreignKey: "song_id" });
// SongModel.hasMany(HistoryUploadModel, { foreignKey: "song_id" });
// SongModel.hasMany(FavoriteSongModel, { foreignKey: "song_id" });

module.exports = SongModel;
