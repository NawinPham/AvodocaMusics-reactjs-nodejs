const Joi = require("joi")
const AlbumModel = require("../Models/albumModel");
const ArtistModel = require("../Models/artistModel");
const AlbumSongModel = require("../Models/albumSongModel");
const { Sequelize } = require("sequelize");
const AccountModel = require("../Models/accountModel");

const createAlbum = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    // create album
    const TokenUserId = req.user.id;

    let result = new AlbumModel({
      name,
      image,
      description,
      account_id: TokenUserId,
    });

    await result.save();

    res.status(200).json({ message: "Thêm album thành công", data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const id = req.params.id;

    const TokenUserId = req.user.id;

    // check id album not found
    let album = await AlbumModel.findOne({ where: { id } });
    if (!album) return res.status(400).json({ message: "Album không tồn tại" });

    //check account_id vs TokenUserId
    if (album.account_id !== TokenUserId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền cập nhật album" });
    }

    //update album
    const data = { name, image, description };

    await album.update(data, { where: { id } });

    res.status(200).json({ message: "cập nhật album thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;

    const TokenUserId = req.user.id;

    //check id album not found
    let album = await AlbumModel.findOne({ where: { id: albumId } });
    if (!album) return res.status(400).json({ message: "Album không tồn tại" });

    //check account_id vs TokenUserId
    if (album.account_id !== TokenUserId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xoá album" });
    }

    await AlbumSongModel.destroy({ where: { album_id: albumId } });

    //delete album
    await album.destroy();

    res.status(200).json({ message: "Xoá album thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getIdAlbum = async (req, res) => {
  try {
    const id = req.params.id;

    //get id album not found
    const result = await AlbumModel.findOne({
      where: { id },
      include: {
        model: AccountModel,
        attributes: ["username"]
      }
    });
    if (!result) return res.status(400).json({ message: "Album không tồn tại" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUserAlbum = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const TokenUserId = req.user.id;

    const result = await AlbumModel.findAndCountAll({
      where: { account_id: TokenUserId },
      include: {
        model: AccountModel,
        attributes: ["username"],
      },
      attributes: ["id", "name", "image", "status"], // Choose specific columns if needed
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

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await AlbumModel.findAndCountAll({
      include: {
        model: AccountModel,
        attributes: ["username"],
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

const searchAlbum = async (req, res) => {
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
    const albums = await AlbumModel.findAll({
      where: searchConditions,
      attributes: ["id", "name", "image", "description"],
      include: {
        model: ArtistModel,
        attributes: ["name"],
      },
    });

    // Kiểm tra nếu không tìm thấy kết quả
    if (!albums || albums.length === 0) {
      return res.status(404).json({ message: "không tìm thấy album" });
    }

    // Trả về kết quả tìm kiếm
    res.status(200).json({ data: albums, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getIdAlbum,
  getAllUserAlbum,
  searchAlbum,
  getAll
};
