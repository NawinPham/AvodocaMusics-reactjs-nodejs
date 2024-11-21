const body = require("express-validator");

const artistSongValidate = () => {
  return [
    body("artist_id").isInt().withMessage("Artist ID must be an integer"),

    body("song_id").isInt().withMessage("Song ID must be an integer"),

    body("order")
      .isInt({ min: 1 })
      .withMessage("Order must be a positive integer"),

      body("status")
      .optional()
      .isIn([0, 1])
      .withMessage("Status must be 0 or 1 (inactive or active)"),
  ];
};
module.exports = { artistSongValidate };
