const PlaylistModel = require("../Models/playlistModel");
const PlaylistSongModel = require("../Models/playlistSongModel");
const { Sequelize } = require("sequelize");

const createPlaylist = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    const TokenUserId = req.user.id;

    let result = new PlaylistModel({
      name,
      image,
      description,
      account_id: TokenUserId,
    });

    await result.save();

    res.status(200).json({ message: "Thêm playlist thành công", data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const id = req.params.id;

    //check accont_id
    const TokenUserId = req.user.id;

    let playlist = await PlaylistModel.findOne({ where: { id } });
    if (!playlist)
      return res.status(400).json({ message: "Playlist không tồn tại" });

    if (playlist.account_id !== TokenUserId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền cập nhật playlist" });
    }

    const data = { name, image, description };

    await playlist.update(data, { where: { id } });

    res.status(200).json({ message: "Cập nhật playlist thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const PlayListId = req.params.id;

    let playlist = await PlaylistModel.findOne({ where: { id: PlayListId } });
    if (!playlist)
      return res.status(400).json({ message: "Playlist không tồn tại" });

    const TokenUserId = req.user.id;

    if (playlist.account_id !== TokenUserId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền cập nhật playlist" });
    }

    await PlaylistSongModel.destroy({ where: { playlist_id: PlayListId } });

    await playlist.destroy();

    res.status(200).json({ message: "Xoá playlist thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getIdPlaylist = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await PlaylistModel.findOne({ where: { id } });
    if (!result)
      return res.status(400).json({ message: "Không tìm thấy playlist" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUserPlaylist = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const TokenUserId = req.user.id;

    if (!TokenUserId) return res.status(404).json("k cos to ken")

    const result = await PlaylistModel.findAndCountAll({
      where: { account_id: TokenUserId },
      attributes: ["id", "name", "image", "status"], // Choose specific columns if needed
      limit: parseInt(limit),
      offset: parseInt(offset),
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

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await PlaylistModel.findAndCountAll({
      attributes: ["id", "name", "image", "status"], // Choose specific columns if needed
      limit: parseInt(limit),
      offset: parseInt(offset),
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

const searchPlaylist = async (req, res) => {
  try {
    const { name, description } = req.query;

    // Xây dựng đối tượng tìm kiếm
    const searchConditions = {};

    if (name) {
      searchConditions.name = { [Sequelize.Op.like]: `%${name}%` }; // Tìm kiếm theo tên, không phân biệt chữ hoa chữ thường
    }

    if (description) {
      searchConditions.description = {
        [Sequelize.Op.like]: `%${description}%`,
      }; // Tìm kiếm theo mô tả
    }

    // Tìm kiếm songs dựa trên điều kiện đã xác định
    const playlists = await PlaylistModel.findAll({
      where: searchConditions,
      attributes: ["id", "name", "image", "description"],
    });

    // Kiểm tra nếu không tìm thấy kết quả
    if (!playlists || playlists.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    // Trả về kết quả tìm kiếm
    res.status(200).json({ data: playlists, status: true });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getIdPlaylist,
  getAllUserPlaylist,
  searchPlaylist,
  getAll
};
