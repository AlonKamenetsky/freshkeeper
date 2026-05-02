const { users, getNextId } = require('../models/users');

const getAllUsers = (req, res) => {
  res.status(200).json({ success: true, data: users, error: null });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid user ID.', details: { field: 'id' } }
    });
  }

  const user = users.find(u => u.userId === id);
  if (!user) {
    return res.status(404).json({
      success: false, data: null,
      error: { code: 'NOT_FOUND', message: `User with id ${id} not found.`, details: {} }
    });
  }

  res.status(200).json({ success: true, data: user, error: null });
};

const createUser = (req, res) => {
  const { firstName, lastName, userRole } = req.body;

  if (!firstName || !lastName || !userRole) {
    const missing = ['firstName', 'lastName', 'userRole'].filter(f => !req.body[f]);
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Missing required fields.', details: { missing } }
    });
  }

  const now = new Date().toISOString();
  const newUser = {
    userId: getNextId(),
    firstName,
    lastName,
    createDate: now,
    updateDate: now,
    userRole
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: { userId: newUser.userId }, error: null });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid user ID.', details: { field: 'id' } }
    });
  }

  const user = users.find(u => u.userId === id);
  if (!user) {
    return res.status(404).json({
      success: false, data: null,
      error: { code: 'NOT_FOUND', message: `User with id ${id} not found.`, details: {} }
    });
  }

  const { firstName, lastName, userRole } = req.body;
  if (!firstName || !lastName || !userRole) {
    const missing = ['firstName', 'lastName', 'userRole'].filter(f => !req.body[f]);
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Missing required fields.', details: { missing } }
    });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.userRole = userRole;
  user.updateDate = new Date().toISOString();

  res.status(200).json({ success: true, data: { userId: user.userId }, error: null });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid user ID.', details: { field: 'id' } }
    });
  }

  const index = users.findIndex(u => u.userId === id);
  if (index === -1) {
    return res.status(404).json({
      success: false, data: null,
      error: { code: 'NOT_FOUND', message: `User with id ${id} not found.`, details: {} }
    });
  }

  users.splice(index, 1);
  res.status(200).json({ success: true, data: { userId: id }, error: null });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };