const users = [
  {
    userId: 1,
    firstName: 'Alice',
    lastName: 'Cohen',
    createDate: '2024-01-10T08:00:00.000Z',
    updateDate: '2024-01-10T08:00:00.000Z',
    userRole: 'admin'
  },
  {
    userId: 2,
    firstName: 'Ben',
    lastName: 'Levi',
    createDate: '2024-02-15T10:30:00.000Z',
    updateDate: '2024-02-15T10:30:00.000Z',
    userRole: 'manager'
  },
  {
    userId: 3,
    firstName: 'Dana',
    lastName: 'Mizrahi',
    createDate: '2024-03-20T14:00:00.000Z',
    updateDate: '2024-03-20T14:00:00.000Z',
    userRole: 'user'
  }
];

let nextId = 4;

function getNextId() {
  return nextId++;
}

module.exports = { users, getNextId };