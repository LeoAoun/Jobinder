import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../interfaces/User";

// Define o tipo do contexto
interface UsersContextType {
  users: Record<string, User>;
  setUsers: React.Dispatch<React.SetStateAction<Record<string, User>>>;
}

// Inicializa o contexto
const UserContext = createContext<UsersContextType | undefined>(undefined);

// Componente Provider
export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<Record<string, User>>({});

  return <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>;
};

// Hook para usar o contexto
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
