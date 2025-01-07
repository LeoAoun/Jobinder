import { createContext, useContext, useState, ReactNode } from "react";
import { UserDTO } from "../interfaces/User";

// Define o tipo do contexto
interface UsersDTOContextType {
  usersDTO: Record<string, UserDTO>;
  setUsersDTO: React.Dispatch<React.SetStateAction<Record<string, UserDTO>>>;
}

// Inicializa o contexto
const UserDTOContext = createContext<UsersDTOContextType | undefined>(undefined);

// Componente Provider
export const UsersDTOProvider = ({ children }: { children: ReactNode }) => {
  const [usersDTO, setUsersDTO] = useState<Record<string, UserDTO>>({});

  return <UserDTOContext.Provider value={{ usersDTO, setUsersDTO }}>{children}</UserDTOContext.Provider>;
};

// Hook para usar o contexto
export const useUsersDTO = () => {
  const context = useContext(UserDTOContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
