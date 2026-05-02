const { items, getNextId } = require('../models/items');

const getAllItems = (req, res) => {
  res.status(200).json({ success: true, data: items, error: null });
};

const getItemById = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid item ID.', details: { field: 'id' } }
    });
  }

  const item = items.find(i => i.itemId === id);
  if (!item) {
    return res.status(404).json({
      success: false, data: null,
      error: { code: 'NOT_FOUND', message: `Item with id ${id} not found.`, details: {} }
    });
  }

  res.status(200).json({ success: true, data: item, error: null });
};

const createItem = (req, res) => {
  const { name, quantity, expirationDate, storageType, userId } = req.body;
  const missing = ['name', 'quantity', 'storageType', 'userId'].filter(f => !req.body[f]);

  if (missing.length > 0) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Missing required fields.', details: { missing } }
    });
  }

  const validStorage = ['fridge', 'freezer', 'pantry'];
  if (!validStorage.includes(storageType)) {
    return res.status(400).json({
      success: false, data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'storageType must be fridge, freezer, or pantry.',
        details: { field: 'storageType' }
      }
    });
  }

  const now = new Date().toISOString();
  const newItem = {
    itemId: getNextId(),
    name,
    quantity,
    expirationDate: expirationDate || null,
    storageType,
    userId,
    createDate: now,
    updateDate: now
  };

  items.push(newItem);
  res.status(201).json({ success: true, data: { itemId: newItem.itemId }, error: null });
};

const updateItem = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid item ID.', details: { field: 'id' } }
    });
  }

  const item = items.find(i => i.itemId === id);
  if (!item) {
    return res.status(404).json({
      success: false, data: null,
      error: { code: 'NOT_FOUND', message: `Item with id ${id} not found.`, details: {} }
    });
  }

  const { name, quantity, expirationDate, storageType, userId } = req.body;
  const missing = ['name', 'quantity', 'storageType', 'userId'].filter(f => !req.body[f]);

  if (missing.length > 0) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Missing required fields.', details: { missing } }
    });
  }

  const validStorage = ['fridge', 'freezer', 'pantry'];
  if (!validStorage.includes(storageType)) {
    return res.status(400).json({
      success: false, data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'storageType must be fridge, freezer, or pantry.',
        details: { field: 'storageType' }
      }
    });
  }

  item.name = name;
  item.quantity = quantity;
  item.expirationDate = expirationDate || item.expirationDate;
  item.storageType = storageType;
  item.userId = userId;
  item.updateDate = new Date().toISOString();

  res.status(200).json({ success: true, data: { itemId: item.itemId }, error: null });
};

const deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false, data: null,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid item ID.', details: { field: 'id' } }
    });
  }

  const index = items.findIndex(i => i.itemId === id);
  if (index === -1) {
    return res.status(404).json({
      success: false, data: null,
      error: { code: 'NOT_FOUND', message: `Item with id ${id} not found.`, details: {} }
    });
  }

  items.splice(index, 1);
  res.status(200).json({ success: true, data: { itemId: id }, error: null });
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };