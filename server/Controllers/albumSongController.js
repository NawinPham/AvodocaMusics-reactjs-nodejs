const SongModel = require("../Models/songModel");
const AlbumModel = require("../Models/albumModel");
const AlbumSongModel = require("../Models/albumSongModel");
const AccountModel = require("../Models/accountModel");
const GenreModel = require("../Models/genreModel");

const createAlbumSong = async (req, res) => {
  try {
    const { albumId, songId } = req.params;

    const song = await SongModel.findOne({ where: { id: songId } });
    if (!song) return res.status(404).json({ message: "Song not found" });

    const album = await AlbumModel.findOne({
      where: { id: albumId },
    });

    if (!album) return res.status(404).json({ message: "Album not found" });

    //check account_id vs user ID
    const TokenUserId = req.user.id;

    if (album.account_id !== TokenUserId || song.account_id !== TokenUserId)
      return res.status(403).json({
        message: "You do not have permission to create this album song",
      });

    // findOne AlbumSongModel
    let albumSong = await AlbumSongModel.findOne({
      where: {
        album_id: albumId,
        songs_id: songId,
      },
    });

    //check Song already exists
    if (albumSong)
      return res
        .status(400)
        .json({ message: "Bài hát đã tồn tại trong album" });

    // max order +1 , default order 1
    const maxOrder = await AlbumSongModel.max("order", {
      where: { album_id: albumId },
    });

    const newOrder = maxOrder ? maxOrder + 1 : 1;

    // create playlist song
    albumSong = new AlbumSongModel({
      album_id: albumId,
      songs_id: songId,
      order: newOrder,
    });

    await albumSong.save();

    res
      .status(201)
      .json({ message: "Đã thêm bài hát vào album", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAlbumSong = async (req, res) => {
  try {
    const { albumId, songId } = req.params;
    const TokenUserId = req.user.id;

    // check user
    const album = await AlbumModel.findOne({ where: { id: albumId } });

    if (album.account_id !== TokenUserId)
      return res.status(403).json({
        message: "Bạn không có quyền xoá bài hát",
      });

    //check songs_id not found
    let albumSong = await AlbumSongModel.findOne({
      where: {
        album_id: albumId,
        songs_id: songId,
      },
    });
    if (!albumSong)
      return res
        .status(404)
        .json({ message: "Bài hát hoặc album không tồn tại" });

    //delete playlist song
    await albumSong.destroy();

    res.status(201).json({ message: "Đã xoá bài hát khỏi album", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUserAlbumSong = async (req, res) => {
  try {
    const { albumId } = req.params;

    // Pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    //get all playlist song
    const result = await AlbumSongModel.findAndCountAll({
      where: {
        album_id: albumId
      },
      include: {
        model: SongModel,
        attributes: ["name", "image", "url"],
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
    if (result.count === 0)
      return res.status(404).json({ message: "Album emty" });

    res.status(200).json({
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

const getAlbumBySong = async (req, res) => {
  try {
    const { songId } = req.params;

    const result = await AlbumSongModel.findOne({
      where: { songs_id: songId },
      include: {
        model: AlbumModel,
        attributes: ["name", "image"]
      }
    })

    if (!result) return;

    return res.status(200).json({ data: result })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAlbumSong,
  deleteAlbumSong,
  getAllUserAlbumSong,
  getAlbumBySong
};
