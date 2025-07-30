const crypto = require('crypto');
const { readDb, writeDb } = require('./db');

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}
function createUser(role, name, email, password) {
  const db = readDb();
  if (db.users.find(u => u.email === email)) {
    throw new Error('User exists');
  }
  const id = generateId();
  const passwordHash = hashPassword(password);
  const user = {
    id,
    role,
    name,
    email,
    passwordHash,
    preferences: '',
    documents: [],
    shareSlug: null,
    buddyRequests: [],
    buddyRequestsSent: [],
    buddies: [],
    messages: {},
    jobRequests: [],
    docRequests: [],
    meetingRequests: []
  };
  db.users.push(user);
  writeDb(db);
  return user;
}
function authenticate(email, password) {
  const db = readDb();
  return db.users.find(u => u.email === email && u.passwordHash === hashPassword(password)) || null;
}
function createSession(user) {
  const data = user.id;
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  return `${data}|${sig}`;
}
function verifySession(session) {
  if (!session) return null;
  const parts = session.split('|');
  if (parts.length !== 2) return null;
  const [id, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET).update(id).digest('hex');
  if (expectedSig !== sig) return null;
  const db = readDb();
  return db.users.find(u => u.id === id) || null;
}
module.exports = { hashPassword, generateId, createUser, authenticate, createSession, verifySession };
