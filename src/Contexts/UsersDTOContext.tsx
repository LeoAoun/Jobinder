import { createContext, useContext, useState, ReactNode } from "react";
import { UserDTO } from "../../interfaces/IUser";

interface UsersDTOContextType {
  usersDTO: Record<string, UserDTO>;
  setUsersDTO: React.Dispatch<React.SetStateAction<Record<string, UserDTO>>>;
}

const UserDTOContext = createContext<UsersDTOContextType | undefined>(undefined);

export const UsersDTOProvider = ({ children }: { children: ReactNode }) => {
  const [usersDTO, setUsersDTO] = useState<Record<string, UserDTO>>({});

  return <UserDTOContext.Provider value={{ usersDTO, setUsersDTO }}>{children}</UserDTOContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsersDTO = () => {
  const context = useContext(UserDTOContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
