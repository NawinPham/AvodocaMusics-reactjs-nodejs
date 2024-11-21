const body = require("express-validator");

const favoriteValidate = () => {
  return [
    body("user_id").isInt().withMessage("User ID must be an integer"),

    body("song_id")
      .optional()
      .isInt()
      .withMessage("Song ID must be an integer"),

    body("album_id")
      .optional()
      .isInt()
      .withMessage("Album ID must be an integer"),

    body("playlist_id")
      .optional()
      .isInt()
      .withMessage("Playlist ID must be an integer"),

    body("single_id")
      .optional()
      .isInt()
      .withMessage("Single ID must be an integer"),
  ];
};
module.exports = { favoriteValidate };
