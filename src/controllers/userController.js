const userService = require("../services/userService");

const getAll = (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.json({ success: true, data: users, count: users.length });
  } catch (err) {
    next(err);
  }
};

const getById = (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const create = (req, res, next) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    const user = userService.updateUser(req.params.id, req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  try {
    const user = userService.deleteUser(req.params.id);
    res.json({ success: true, data: user, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
