import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../../interfaces/User";

interface UsersContextType {
  users: Record<string, User>;
  setUsers: React.Dispatch<React.SetStateAction<Record<string, User>>>;
}

const UserContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<Record<string, User>>({});

  return <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
