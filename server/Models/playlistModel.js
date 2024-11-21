const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const PlaylistSongModel = require("./playlistSongModel");
const AccountModel = require("./accountModel");

const PlaylistModel = sequelize.define(
  "Playlist",
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
    tableName: "playlists",
    timestamps: true,
  }
);

// PlaylistModel.hasMany(PlaylistSongModel, {
//   foreignKey: "playlist_id",
//   onDelete: "CASCADE",
// });

PlaylistModel.belongsTo(AccountModel, { foreignKey: "account_id" });


module.exports = PlaylistModel;
