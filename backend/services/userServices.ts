import { User, UserDTO } from "../interfaces/User";

// Get users from database
const getUsers = async (): Promise<Record<string, User>> => {
  const users = localStorage.getItem("jobinder-users");
  return users ? JSON.parse(users) : {};
};

// Get userDTO from database
const getUserDTO = async (id: string): Promise<UserDTO> => {
  const users = await getUsers();

  if (!users[id]) {
    throw new Error(`Usuário com ID ${id} não encontrado.`);
  }

  const user = users[id];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// Create a list of usersDTO
const createUsersDTO = (users: Record<string, User>): Record<string, UserDTO> => {
  const usersDTO: Record<string, UserDTO> = {};

  for (const [id, user] of Object.entries(users)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    usersDTO[id] = userWithoutPassword;
  }

  return usersDTO;
};

export { getUsers, getUserDTO, createUsers, createUser, createUsersDTO };
