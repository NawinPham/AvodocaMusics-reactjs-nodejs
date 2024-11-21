const { body } = require("express-validator");

const accountValidate = () => {
  return [
    body("username")
      .optional()
      .isLength({ min: 5, max: 50 })
      .withMessage("Username must be between 5 and 50 characters")
      .notEmpty()
      .withMessage("Username is required"),

    body("email")
      .optional() // không bắt buộc
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email is required"),

    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 6 characters long")
      .notEmpty()
      .withMessage("Password is required"),

    body("address")
      .optional() // không bắt buộc
      .isLength({ max: 255 })
      .withMessage("Address must be less than 255 characters"),

    body("status")
      .optional()
      .isIn([0, 1])
      .withMessage("Status must be 0 or 1 (inactive or active)"),
  ];
};

module.exports = {
  accountValidate,
};
