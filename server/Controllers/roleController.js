const RoleModel = require("../Models/roleModel");
const { validationResult } = require("express-validator");
const { Sequelize } = require("sequelize");

const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;


    let role = new RoleModel({ name, description });

    await role.save();

    res.status(200).json({ data: role, message: "Success create new role", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id;

    if (!name) return res.status(400).json({ message: "Tên không được để trống" })

    let role = await RoleModel.findOne({ where: { id } })
    if (!role) return res.status(400).json({ message: "role not found" })

    const updateData = { name, description };

    await role.update(updateData, { where: { id } });

    res.status(200).json({ data: role, message: "Success update role", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await RoleModel.destroy({ where: { id } });
    if (!result)
      return res.status(400).json({ message: "Xoá không thành công" });

    res.status(200).json({ message: "Xoá thành công", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getIdRole = async (req, res) => {
  try {
    const { id } = req.params.id;

    const result = await RoleModel.findOne({ where: { id } });
    if (!result)
      return res.status(400).json({ message: "Can not find id role" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllRole = async (req, res) => {
  try {
    const result = await RoleModel.findAll();
    if (!result)
      return res.status(400).json({ message: "Can not find all role" });

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const searchRole = async (req, res) => {
  try {
    const { name, description } = req.query; // Lấy các tham số tìm kiếm từ query string

    // Xây dựng đối tượng tìm kiếm
    const searchConditions = {};

    if (name) {
      searchConditions.name = { [Sequelize.Op.like]: `%${name}%` }; // Tìm kiếm theo tên, không phân biệt chữ hoa chữ thường
    }

    if (description) {
      searchConditions.description = {
        [Sequelize.Op.like]: `%${description}%`,
      }; // Tìm kiếm theo mô tả
    }

    // Tìm kiếm roles dựa trên điều kiện đã xác định
    const roles = await RoleModel.findAll({
      where: searchConditions,
    });

    // Kiểm tra nếu không tìm thấy kết quả
    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: "No roles found" });
    }

    // Trả về kết quả tìm kiếm
    res.status(200).json({ data: roles, status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRole,
  updateRole,
  getIdRole,
  getAllRole,
  deleteRole,
  searchRole,
};
