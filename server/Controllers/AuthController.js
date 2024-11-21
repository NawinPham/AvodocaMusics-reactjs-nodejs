const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const validator = require('validator');
const AccountModel = require("../Models/accountModel");
const RoleModel = require("../Models/roleModel");
const { google } = require("googleapis");
const oauth2Client = require("../utils/oauth2Client");

const createToken = (id, role_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id, role_id }, jwtkey, { expiresIn: 60 * 60 * 24 * 4 });
};

const RegristerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Thông tin không được để trống" })

    if (username < 3)
      return res.status(400).json({ message: "Tên người dùng phải trên 3 kí tự" })

    if (password < 8)
      return res.status(400).json({ message: "Mật khẩu phải trên 8 kí tự" })

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Email không đúng định dạng" })

    //check email exist
    let user = await AccountModel.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "Email đã tồn tại" });

    // new account
    user = new AccountModel({ username, email, password });

    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //save account
    await user.save();

    //create token
    const token = createToken(user.id, user.role_id);

    res.status(200).json({ id: user.id, username, email, token, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { phone, address, fullname, role_id } = req.body;

    if (!phone || !address || !fullname || !role_id)
      return res.status(400).json({ message: "Nhập đầy đủ thông tin người dùng" })

    if (phone < 11)
      return res.status(400).json({ message: "Số điện thoại không đúng định dạng" })

    if (fullname < 3)
      return res.status(400).json({ message: "Tên người dùng phải trên 3 kí tự" })

    if (address < 3)
      return res.status(400).json({ message: "Địa chỉ phải trên 3 kí tự" })

    const { id } = req.params;

    const updateData = { fullname, address, phone, role_id };

    //update account
    const user = await AccountModel.update(updateData, {
      where: { id: id },
    });
    if (!user) return res.status(400).json({ message: "not update user" });

    res.status(200).json({ data: user, message: "Cập nhật thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { phone, address, fullname } = req.body;

    if (!phone || !address || !fullname)
      return res.status(400).json({ message: "Nhập đầy đủ thông tin người dùng" })

    if (phone < 11)
      return res.status(400).json({ message: "Số điện thoại không đúng định dạng" })

    if (address && fullname < 3)
      return res.status(400).json({ message: "Địa chỉ hoặc tên người dùng phải trên 3 kí tự" })

    const tokenUserId = req.user.id;

    const updateData = { fullname, address, phone };

    //update account
    const user = await AccountModel.update(updateData, {
      where: { id: tokenUserId },
    });
    if (!user) return res.status(400).json({ message: "not update user" });

    res.status(200).json({ message: "Cập nhật thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Thông tin không được để trống" })

    if (password < 8)
      return res.status(400).json({ message: "Mật khẩu phải trên 8 kí tự" })

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Email không đúng định dạng" })

    //check email invalid
    let user = await AccountModel.findOne({ where: { email: email } });
    if (!user) return res.status(400).json({ message: "Email Không hợp lệ" });

    // compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Mật khẩu không hợp lệ" });

    // create token
    const token = createToken(user.id, user.role_id);

    res.status(200).json({
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      address: user.address,
      phone: user.phone,
      token,
      role_id: user.role_id,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getId = async (req, res) => {
  const { userId } = req.params
  try {
    // Get id user
    const result = await AccountModel.findOne({ where: { id: userId } });
    if (!result) return res.status(400).json({ message: "Không tìm thấy người dùng" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const GetAllUser = async (req, res) => {
  try {
    // Pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get all user
    const result = await AccountModel.findAndCountAll({
      include: {
        model: RoleModel,
        attributes: ["name"],
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
    res.status(500).json({ message: error.message });
  }
};

const GetProfileUser = async (req, res) => {
  try {
    const tokenUserId = req.user.id

    // Get id user
    const result = await AccountModel.findOne({ where: { id: tokenUserId } });
    if (!result) return res.status(400).json({ message: "Không tìm thấy người dùng" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Get id user
    const result = await AccountModel.destroy({ where: { id: id } });
    if (!result) return res.status(400).json({ message: "Xoa k thanh cong" })

    res.status(200).json({ message: "Xoá thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getGoogleUrl = async (req, res) => {
  const scope = [
    " https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scope,
    include_granted_scopes: true,
  });

  res.redirect(authUrl);
};

const getGoogleCallback = async (req, res) => {
  const { code } = req.query;

  try {
    // Get the access token from the code
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Use the Google OAuth2 API to get user info
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    const { data } = await oauth2.userinfo.get();
    console.log("User Info:", data);

    if (!data) {
      res.status(400).json({ message: "not data" })
    }

    const { name, email } = data;


    let user = await AccountModel.findOne({ where: { email: email } });
    if (!user) {
      user = new AccountModel({
        fullname: name,
        email: email,
      });
      await user.save();
    }
    console.log(user)

    const token = createToken(user.id, user.role_id)

    res.redirect(
      `http://localhost:5173/?user=${encodeURIComponent(
        JSON.stringify({
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          address: user.address,
          phone: user.phone,
          token,
          role_id: user.role_id,
          status: true,
        })
      )}`
    );

  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  GetAllUser,
  RegristerUser,
  loginUser,
  GetProfileUser,
  deleteUser,
  updateProfile,
  updateUser,
  getGoogleCallback,
  getGoogleUrl,
  getId
};
