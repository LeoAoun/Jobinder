import { User } from "../interfaces/User";

// Get users from database
const getUsers = async () => {
  const users = localStorage.getItem("jobinder-users");
  return users ? JSON.parse(users) : {};
};

// Get userDTO from database
const getUserDTO = async (id: string) => {
  const users = await getUsers();
  const user = users[id];
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Create a list of users in the database
const createUsers = async (users: Record<string, User>) => {
  localStorage.setItem("jobinder-users", JSON.stringify(users));
};

// Create a new user in the database
const createUser = async (user: User) => {
  const users = await getUsers();
  const newUsers = { ...users, [user.phone]: user };
  localStorage.setItem("jobinder-users", JSON.stringify(newUsers));
};

export { getUsers, getUserDTO, createUsers, createUser };
