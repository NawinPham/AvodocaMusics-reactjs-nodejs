const body = require("express-validator");

const historyUploadValidate = () => {
  return [
    body("song_id").isInt().withMessage("Song ID must be an integer"),

    body("account_id").isInt().withMessage("Account ID must be an integer"),

    body("status")
      .optional()
      .isIn([0, 1])
      .withMessage("Status must be 0 or 1 (inactive or active)"),
  ];
};
module.exports = { historyUploadValidate };
