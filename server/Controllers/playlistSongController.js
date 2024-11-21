const SongModel = require("../Models/songModel");
const PlaylistSongModel = require("../Models/playlistSongModel");
const PlaylistModel = require("../Models/playlistModel");
const AccountModel = require("../Models/accountModel");
const GenreModel = require("../Models/genreModel");

const createPlaylistSong = async (req, res) => {
  try {
    const { playlistId } = req.body;
    const { songs_id } = req.params;

    // check id song required
    if (!songs_id) return res.status(400).json({ message: "Bài hát không để trống" });

    const song = await SongModel.findOne({ where: { id: songs_id } });
    if (!song) return res.status(404).json({ message: "Bài hát không tồn tại" });

    const playlist = await PlaylistModel.findOne({
      where: { id: playlistId },
    });

    if (!playlist)
      return res.status(404).json({ message: "Playlist không tồn tại" });

    //check account_id vs user ID
    const TokenUserId = req.user.id;

    if (playlist.account_id !== TokenUserId)
      return res.status(403).json({
        message: "You do not have permission to create this playlist song",
      });

    // findOne PlaylistSongModel
    let playlistSong = await PlaylistSongModel.findOne({
      where: {
        playlist_id: playlistId,
        songs_id: songs_id,
      },
    });

    //check Song already exists
    if (playlistSong)
      return res
        .status(400)
        .json({ message: "Bài hát đã tồn tại trong playlist" });

    // max order +1 , default order 1
    const maxOrder = await PlaylistSongModel.max("order", {
      where: { playlist_id: playlistId },
    });

    const newOrder = maxOrder ? maxOrder + 1 : 1;

    // create playlist song
    playlistSong = new PlaylistSongModel({
      playlist_id: playlistId,
      songs_id: songs_id,
      order: newOrder,
    });

    await playlistSong.save();

    res
      .status(201)
      .json({ message: "Đã thêm bài hát vào playlist", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePlaylistSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const TokenUserId = req.user.id;

    const playlist = await PlaylistModel.findOne({ where: { id: playlistId } });

    if (playlist.account_id !== TokenUserId)
      return res.status(403).json({
        message: "You do not have permission to delete this playlist song",
      });

    //check songs_id not found
    let playlistSong = await PlaylistSongModel.findOne({
      where: {
        playlist_id: playlistId,
        songs_id: songId,
      },
    });
    if (!playlistSong)
      return res
        .status(400)
        .json({ message: "Song or playlist not found in this playlist" });

    //delete playlist song
    await playlistSong.destroy();

    res
      .status(201)
      .json({ message: "Đã xoá bài hát khỏi playlist", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllPlaylistSong = async (req, res) => {
  try {
    const { playlistId } = req.params;

    // Pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    //get playlist
    const playlist = await PlaylistModel.findOne({
      where: { id: playlistId },
    });

    //get all playlist song
    const result = await PlaylistSongModel.findAndCountAll({
      where: { playlist_id: playlistId },
      include: {
        model: SongModel,
        attributes: ["id", "name", "image", "url"],
        include: [
          {
            model: AccountModel,
            attributes: ["username"]
          },
          {
            model: GenreModel,
            attributes: ["name"]
          }
        ]
      },

      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      playlistData: playlist,
      data: result.rows,
      total: result.count,
      status: true,
      currentPage: parseInt(page),
      totalPages: Math.ceil(result.count / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlaylistSong,
  deletePlaylistSong,
  getAllPlaylistSong,
};
