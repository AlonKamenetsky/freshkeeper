const express = require('express');
const router = express.Router();
const { roleCheck } = require('../middleware/roleCheck');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemsController');

router.get('/',        getAllItems);
router.get('/:id',     getItemById);
router.post('/',       createItem);
router.put('/:id',     roleCheck('admin', 'manager'), updateItem);
router.delete('/:id',  roleCheck('admin'),            deleteItem);

module.exports = router;