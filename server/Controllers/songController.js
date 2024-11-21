const { validationResult } = require("express-validator");
const validator = require('validator');
const SongModel = require("../Models/songModel");
const GenreModel = require("../Models/genreModel");
const AlbumSongModel = require("../Models/albumSongModel");
const PlaylistSongModel = require("../Models/playlistSongModel");
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const FavoriteSong = require("../Models/favoriteSong");
const HistoryListenModel = require("../Models/historyListenModel");
const AccountModel = require("../Models/accountModel");
const AlbumModel = require("../Models/albumModel");

const musicDir = path.join("D:", "Music");

const createSong = async (req, res) => {
  try {
    const { name, image, url, description, genre_id } = req.body;

    const genre = await GenreModel.findOne({ where: { id: genre_id } });
    if (!genre) return res.status(404).json({ message: "Không có thể loại" });

    //create song
    const TokenUserId = req.user.id;

    let result = new SongModel({
      name,
      image,
      url,
      description,
      genre_id,
      account_id: TokenUserId,
    });

    await result.save();

    res.status(200).json({ data: result, message: "Thêm bài hát thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateSong = async (req, res) => {
  try {
    const { name, image, description, genre_id } = req.body;
    const id = req.params.id;

    const genre = await GenreModel.findOne({ where: { id: genre_id } });
    if (!genre) return res.status(404).json({ message: "Thể loại không tồn tại" });

    let song = await SongModel.findOne({ where: { id: id } });
    if (!song) return res.status(400).json({ message: "Bài hát không tồn tại" });

    // update song
    const data = { name, image, description, genre_id };

    await song.update(data, { where: { id: id } });

    res.status(200).json({ message: "Đã cập nhật bài hát", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;

    let song = await SongModel.findOne({ where: { id: songId } });
    if (!song) return res.status(400).json({ message: "Bài hát không tồn tại" });

    //check accont_id
    // const TokenUserId = req.user.id;

    // if (song.account_id !== TokenUserId) {
    //   return res
    //     .status(403)
    //     .json({ message: "Bạn không có quyền xoá bài hát" });
    // }

    await AlbumSongModel.destroy({ where: { songs_id: songId } });

    await PlaylistSongModel.destroy({ where: { songs_id: songId } });

    await FavoriteSong.destroy({ where: { songs_id: songId } });

    await HistoryListenModel.destroy({ where: { songs_id: songId } });

    //delete song
    await song.destroy();

    res
      .status(200)
      .json({ message: "Xoá bài hát thành công", status: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIdSong = async (req, res) => {
  try {
    const { id } = req.params;

    // check id song
    const result = await SongModel.findOne({
      where: { id: id },
      include: {
        model: GenreModel,
        attributes: ["name"],
      },
    });
    if (!result) return res.status(400).json({ message: "Không tìm thấy bài hát" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getSongByGenre = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { id } = req.params;

    // check id song
    const result = await SongModel.findAndCountAll({
      where: { genre_id: id },
      include: [
        {
          model: AccountModel,
          attributes: ["username"],
        },
        {
          model: GenreModel,
          attributes: ["name"],
        },
      ],
      attributes: ["id", "name", "image", "url", "status"], // Choose specific columns if needed
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

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

const getAllSong = async (req, res) => {
  try {
    // Pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // get all song
    const result = await SongModel.findAndCountAll({
      include: {
        model: GenreModel,
        attributes: ["name"],
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

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

const getAllUserSong = async (req, res) => {
  try {
    // Pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const TokenUserId = req.user.id

    // get all song
    const result = await SongModel.findAndCountAll({
      where: { account_id: TokenUserId },
      include: [
        {
          model: GenreModel,
          attributes: ["name"],
        },
        {
          model: AccountModel,
          attributes: ["username"],
        },
      ],
      attributes: ["id", "name", "image", "url", "status"], // Choose specific columns if needed
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

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

const searchSong = async (req, res) => {
  try {
    const { name } = req.query; // Lấy các tham số tìm kiếm từ query string

    // Pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (!name) {
      return res.status(400).json({ message: "" })
    }

    // Xây dựng đối tượng tìm kiếm
    const searchConditions = {};

    if (name) {
      searchConditions.name = { [Sequelize.Op.like]: `%${name}%` }; // Tìm kiếm theo tên, không phân biệt chữ hoa chữ thường
    }

    // Tìm kiếm songs dựa trên điều kiện đã xác định
    const result = await SongModel.findAndCountAll({
      where: searchConditions,
      attributes: ["id", "name", "image", "url", "description"],
      include: [
        {
          model: AccountModel,
          attributes: ["username"]
        },
        {
          model: GenreModel,
          attributes: ["name"]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    // Kiểm tra nếu không tìm thấy kết quả
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }

    // Trả về kết quả tìm kiếm
    res.status(200).json({
      data: result.rows.map((item) => ({
        Song: item
      })),
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

const playSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const song = await SongModel.findOne({ where: { id: songId } });
    if (!song) return res.status(404).json({ message: "Bài hát không tồn tại" });

    const filePath = path.join(musicDir, song.url);

    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File không tồn tại" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: message.error });
  }
};



module.exports = {
  createSong,
  updateSong,
  deleteSong,
  getIdSong,
  getAllSong,
  searchSong,
  playSong,
  getAllUserSong,
  getSongByGenre,
};
