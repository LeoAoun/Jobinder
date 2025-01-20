import { IServiceProfile, IUser, IUserDTO } from "../../interfaces/IUser";

// Storage key for users
const jobinderUsersStorageKey = "jobinder-users";

// Get users from database
const getUsers = async (): Promise<Record<string, IUser>> => {
  const users = localStorage.getItem(jobinderUsersStorageKey);
  return users ? JSON.parse(users) : {};
};

// Get user from database
const getUser = async (id: string): Promise<IUser | null> => {
  const users = await getUsers();
  return users[id] || null;
};

// Get userDTO from database
const getUserDTO = async (id: string): Promise<IUserDTO | null> => {
  const users = await getUsers();

  if (!users[id]) {
    return null;
  }

  const user = users[id];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

// Create a list of users in the database
const createUsers = async (users: Record<string, IUser>) => {
  localStorage.setItem(jobinderUsersStorageKey, JSON.stringify(users));
};

// Create a new user in the database
const createUser = async (user: IUser) => {
  const users = await getUsers();
  const newUsers = { ...users, [user.phone]: user };
  localStorage.setItem(jobinderUsersStorageKey, JSON.stringify(newUsers));
};

// Create a list of usersDTO
const createUsersDTO = (users: Record<string, IUser>): Record<string, IUserDTO> => {
  const usersDTO: Record<string, IUserDTO> = {};

  for (const [id, user] of Object.entries(users)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    usersDTO[id] = userWithoutPassword;
  }

  return usersDTO;
};

// Update user in the database
const updateUser = async (user: IUser) => {
  const users = await getUsers();
  users[user.phone] =
    users[user.phone] && user.phone === users[user.phone].phone ? user : users[user.phone];
  localStorage.setItem(jobinderUsersStorageKey, JSON.stringify(users));
};

// Update user service profile
const updateUserServiceProfile = async (userId: string, serviceProfile: IServiceProfile) => {
  const user = await getUser(userId);
  if (!user) return;
  user.serviceProfile = serviceProfile;
  await updateUser(user);
};

// Update service image in the database
const updateServiceImage = async (userId: string, serviceImg: File) => {
  // Parse image to base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  try {
    const user = await getUser(userId);

    if (!user) return;

    const serviceProfile = user.serviceProfile;

    if (!serviceProfile) return;

    // Parse image to base64
    const base64Img = await toBase64(serviceImg);

    serviceProfile.serviceImg = base64Img;

    await updateUser(user);
  } catch (error) {
    console.error("Erro ao atualizar a imagem do serviço:", error);
  }
};

// Convert a File to a base64 string
const convertImageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export { convertImageToBase64 };

export {
  getUsers,
  getUser,
  getUserDTO,
  createUsers,
  createUser,
  createUsersDTO,
  updateUserServiceProfile,
  updateServiceImage,
};
