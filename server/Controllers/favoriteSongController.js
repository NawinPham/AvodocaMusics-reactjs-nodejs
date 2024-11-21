const sequelize = require("../config/database");
const AccountModel = require("../Models/accountModel");
const FavoriteSongModel = require("../Models/favoriteSongsModel");
const GenreModel = require("../Models/genreModel");
const SongModel = require("../Models/songModel");

const createFavoriteSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const TokenUserId = req.user.id;

    result = new FavoriteSongModel({
      account_id: TokenUserId,
      songs_id: songId,
    });

    await result.save();

    res.status(200).json({ data: result, message: "Đã yêu thích bài hát", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteFavoriteSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const TokenUserId = req.user.id;

    await FavoriteSongModel.destroy({
      where: {
        account_id: TokenUserId,
        songs_id: songId,
      }
    });

    res.status(200).json({ message: "Đã huỷ yêu thích bài hát", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const TokenUserId = req.user.id

    // get all song
    const result = await FavoriteSongModel.findAll({
      where: { account_id: TokenUserId },
      include: {
        model: SongModel,
        attributes: ["name", "image", "url", "description"],
        include: [
          {
            model: AccountModel, // Assuming AccountModel is associated with SongModel
            attributes: ["username"], // Specify the attributes you want to display
          },
          {
            model: GenreModel, // Assuming AccountModel is associated with SongModel
            attributes: ["name"], // Specify the attributes you want to display
          },
        ],
      },
      // limit: parseInt(limit),
      // offset: parseInt(offset),
    });

    res.status(200).json({
      data: result,
      status: true,
      // total: result.count,
      // currentPage: parseInt(page),
      // totalPages: Math.ceil(result.count / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const getHighFavoriteSong = async (req, res) => {

  const favoriteSongs = await FavoriteSongModel.findAll({
    attributes: ['songs_id', [sequelize.fn('COUNT', sequelize.col('songs_id')), 'favorite_count']],
    include: {
      model: SongModel,
      attributes: ["name", "image", "url", "description"],
      include: [
        {
          model: AccountModel, // Include account details
          attributes: ["username", "email"], // Adjust based on what you need from AccountModel
        },
        {
          model: GenreModel, // Include genre details
          attributes: ["name"], // Adjust based on what you need from GenreModel
        },
      ]
    },
    group: ['songs_id'],
    order: [[sequelize.literal('favorite_count'), 'DESC']],
    limit: 50
  });

  return res.status(200).json({ data: favoriteSongs, status: true })
}

module.exports = { createFavoriteSong, deleteFavoriteSong, getAllUser, getHighFavoriteSong };
