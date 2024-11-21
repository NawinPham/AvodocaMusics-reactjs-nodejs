const body = require("express-validator");

const followValidate = () => {
  return [
    body("following_user_id")
      .isInt()
      .withMessage("Following user ID must be an integer"),

    body("followed_user_id")
      .isInt()
      .withMessage("Followed user ID must be an integer"),
  ];
};
module.exports = { followValidate };
