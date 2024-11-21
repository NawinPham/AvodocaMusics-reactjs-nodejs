const { body } = require("express-validator");

const artistValidate = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Artist name must be at least 3 characters long")
      .notEmpty()
      .withMessage("Artist name is required"),

    body("bio")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Bio cannot exceed 1000 characters"),

    body("debutDate")
      .isISO8601()
      .withMessage("Debut date must be a valid date format (ISO 8601)"),

    body("status")
      .optional()
      .isIn([0, 1])
      .withMessage("Status must be 0 or 1 (inactive or active)"),
  ];
};
module.exports = { artistValidate };
