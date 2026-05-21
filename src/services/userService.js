// In-memory store (replace with DB in production)
let users = [
  { id: 1, name: "Alice García", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Martínez", email: "bob@example.com", role: "user" },
];
let nextId = 3;

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const user = users.find((u) => u.id === Number(id));
  if (!user) throw new Error("User not found");
  return user;
};

const createUser = ({ name, email, role = "user" }) => {
  if (!name || !email) throw new Error("Name and email are required");
  if (users.find((u) => u.email === email)) throw new Error("Email already exists");

  const newUser = { id: nextId++, name, email, role };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, updates) => {
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) throw new Error("User not found");

  users[index] = { ...users[index], ...updates, id: Number(id) };
  return users[index];
};

const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) throw new Error("User not found");

  const deleted = users.splice(index, 1)[0];
  return deleted;
};

// For testing — reset state
const _reset = () => {
  users = [
    { id: 1, name: "Alice García", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob Martínez", email: "bob@example.com", role: "user" },
  ];
  nextId = 3;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, _reset };
