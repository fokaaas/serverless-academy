import * as fs from 'node:fs/promises';

const formatName = (str) => {
  const name = str.trim();
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export const getUsers = async () => {
  const obj = await fs.readFile('users.txt', 'utf-8');
  return obj ? JSON.parse(obj).users : [];
}

export const addUser = async (user) => {
  const users = await getUsers();
  const name = formatName(user.name);
  users.push({ ...user, name });
  await fs.writeFile('users.txt', JSON.stringify({ users }))
}

export const searchUser = async (name) => {
  const users = await getUsers();
  const userName = formatName(name);
  return users.find(({ name }) => name === userName);
}