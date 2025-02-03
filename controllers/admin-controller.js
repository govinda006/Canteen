const User = require("../models/user-model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//user update logic

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserdata = req.body;
    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserdata,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

//single user data

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id });
    if (!User) {
      return res.status(404).json({ data, message: "User not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//user delete logic

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, deleteUserById, getUserById, updateUserById };
