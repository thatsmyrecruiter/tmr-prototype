const fs = require('fs');
const path = require('path');

const dbFile = path.join(process.cwd(), 'data.json');

function readDb() {
  const raw = fs.readFileSync(dbFile, 'utf8');
  return JSON.parse(raw);
}
function writeDb(db) {
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
}
function findUserByEmail(email) {
  const db = readDb();
  return db.users.find(u => u.email === email);
}
function findUserById(id) {
  const db = readDb();
  return db.users.find(u => u.id === id);
}
module.exports = { readDb, writeDb, findUserByEmail, findUserById };
