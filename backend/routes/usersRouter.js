const express = require('express');
const router = express.Router();
const { roleCheck } = require('../middleware/roleCheck');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usersController');

router.get('/',        getAllUsers);
router.get('/:id',     getUserById);
router.post('/',       createUser);
router.put('/:id',     roleCheck('admin', 'manager'), updateUser);
router.delete('/:id',  roleCheck('admin'),            deleteUser);

module.exports = router;