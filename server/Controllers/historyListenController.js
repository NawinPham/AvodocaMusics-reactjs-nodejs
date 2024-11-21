const AccountModel = require("../Models/accountModel");
const AlbumModel = require("../Models/albumModel");
const GenreModel = require("../Models/genreModel");
const HistoryListenModel = require("../Models/historyListenModel");
const SongModel = require("../Models/songModel");

const createHistoryListen = async (req, res) => {
  try {
    const { songId } = req.params;

    const TokenUserId = req.user.id;

    let result = await HistoryListenModel.findOne({ where: { songs_id: songId } })
    if (result) return res.status(400).json({ message: "Song exsis" })

    result = new HistoryListenModel({
      account_id: TokenUserId,
      songs_id: songId,
    });

    await result.save();

    res.status(200).json({ message: "Success create history song", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteHistorySong = async (req, res) => {
  try {
    const { songId } = req.params;

    const TokenUserId = req.user.id;

    let result = await FavoriteSongModel.findOne({
      account_id: TokenUserId,
      songs_id: songId,
    });

    await result.destroy();

    res.status(200).json({ message: "Success unfavorite song", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUserHistoryListen = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const TokenUserId = req.user.id

    // get all song
    const result = await HistoryListenModel.findAndCountAll({
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
}

module.exports = { createHistoryListen, deleteHistorySong, getAllUserHistoryListen };
