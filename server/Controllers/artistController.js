const { validationResult } = require("express-validator");
const ArtistModel = require("../Models/artistModel");
const { Sequelize } = require("sequelize");

const createArtist = (req, res) => {
  try {
    const { name, bio, debutDate } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let result = new ArtistModel({ name, bio, debutDate });

    result.save();

    res
      .status(200)
      .json({ message: "Success create new artist", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateArtist = (req, res) => {
  try {
    const { name, bio, debutDate } = req.body;
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = { name, bio, debutDate };

    const result = ArtistModel.update(data, { where: { id } });
    if (!result)
      return res.status(400).json({ message: "Can not find artist" });

    res.status(200).json({ message: "Success update artist", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteArtist = async (req, res) => {
  try {
    const id = req.params.id;

    let artist = await ArtistModel.findOne({ where: { id } });
    if (!artist)
      return res.status(400).json({ message: "Can not find artist" });

    await artist.destroy();

    res.status(200).json({ message: "Success delete artist", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getIdArtist = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await ArtistModel.findOne({ where: { id } });
    if (!result)
      return res.status(400).json({ message: "Can not find artist" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllArtist = async (req, res) => {
  try {
    const result = await ArtistModel.findAll();
    if (!result)
      return res.status(400).json({ message: "Can not find all artist" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const searchArtist = async (req, res) => {
  try {
    const { name, bio } = req.query; // Lấy các tham số tìm kiếm từ query string

    // Xây dựng đối tượng tìm kiếm
    const searchConditions = {};

    if (name) {
      searchConditions.name = { [Sequelize.Op.like]: `%${name}%` }; // Tìm kiếm theo tên, không phân biệt chữ hoa chữ thường
    }

    if (bio) {
      searchConditions.bio = {
        [Sequelize.Op.like]: `%${bio}%`,
      }; // Tìm kiếm theo mô tả
    }

    // Tìm kiếm roles dựa trên điều kiện đã xác định
    const result = await GenreModel.findAll({
      where: searchConditions,
    });

    // Kiểm tra nếu không tìm thấy kết quả
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No artist found" });
    }

    // Trả về kết quả tìm kiếm
    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArtist,
  updateArtist,
  deleteArtist,
  getIdArtist,
  getAllArtist,
  searchArtist,
};
