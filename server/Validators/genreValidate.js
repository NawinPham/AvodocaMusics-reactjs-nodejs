const {body} = require("express-validator");

const genreValidate = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Genre name must be at least 3 characters long")
      .notEmpty()
      .withMessage("Genre name is required"),

    body("description")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Description cannot exceed 255 characters"),

    body("status")
      .optional()
      .isIn([0, 1])
      .withMessage("Status must be 0 or 1 (inactive or active)"),
  ];
};
module.exports = { genreValidate };
