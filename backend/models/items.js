const items = [
  {
    itemId: 1,
    name: 'Milk',
    quantity: 2,
    expirationDate: '2026-05-08',
    storageType: 'fridge',
    userId: 3,
    createDate: '2026-05-01T09:00:00.000Z',
    updateDate: '2026-05-01T09:00:00.000Z'
  },
  {
    itemId: 2,
    name: 'Chicken Breast',
    quantity: 1,
    expirationDate: '2026-05-05',
    storageType: 'freezer',
    userId: 3,
    createDate: '2026-05-01T09:00:00.000Z',
    updateDate: '2026-05-01T09:00:00.000Z'
  },
  {
    itemId: 3,
    name: 'Rice',
    quantity: 5,
    expirationDate: '2027-01-01',
    storageType: 'pantry',
    userId: 2,
    createDate: '2026-04-10T11:00:00.000Z',
    updateDate: '2026-04-10T11:00:00.000Z'
  },
  {
    itemId: 4,
    name: 'Eggs',
    quantity: 12,
    expirationDate: '2026-05-15',
    storageType: 'fridge',
    userId: 3,
    createDate: '2026-05-01T09:00:00.000Z',
    updateDate: '2026-05-01T09:00:00.000Z'
  }
];

let nextId = 5;

function getNextId() {
  return nextId++;
}

module.exports = { items, getNextId };