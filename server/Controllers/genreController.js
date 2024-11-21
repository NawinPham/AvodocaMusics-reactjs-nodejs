const GenreModel = require("../Models/genreModel");
const { validationResult } = require("express-validator");
const { Sequelize } = require("sequelize");
const SongModel = require("../Models/songModel");

const createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let result = new GenreModel({ name, description });

    await result.save();

    res.status(200).json({ message: "Success create new genre", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateGenre = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = { name, description };

    const result = await GenreModel.update(data, { where: { id : id } });
    if (!result) return res.status.json({ message: "Can not find genre" });

    res.status(200).json({ message: "Success update genre", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await GenreModel.destroy({ where: { id } });
    if (!result) return res.status(400).json({ message: "Can not find genre" });

    res.status(200).json({ message: "Success delete genre", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getIdGenre = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await GenreModel.findOne({
      where: { id }
    });
    if (!result) return res.status(400).json({ message: "Can not find genre" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllGenre = async (req, res) => {
  try {
    const result = await GenreModel.findAll();
    if (!result)
      return res.status(400).json({ message: "Can not find all genre" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const searchGenre = async (req, res) => {
  try {
    const { name, description } = req.query; // Lấy các tham số tìm kiếm từ query string

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

    // Tìm kiếm roles dựa trên điều kiện đã xác định
    const result = await GenreModel.findAll({
      where: searchConditions,
    });

    // Kiểm tra nếu không tìm thấy kết quả
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No genre found" });
    }

    // Trả về kết quả tìm kiếm
    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllGenreSong = async (req, res) => {
  try {
    const { id } = req.params;
    // Pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // get all song
    const result = await SongModel.findAndCountAll({
      where: {genre_id : id},
      include: {
        model: GenreModel,
        attributes: ["name"],
      },
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


module.exports = {
  createGenre,
  updateGenre,
  deleteGenre,
  getIdGenre,
  getAllGenre,
  searchGenre,
  getAllGenreSong
};
