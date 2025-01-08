import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Definindo o tipo para o contexto
interface AuthContextType {
  loggedUserId: string;
  setLoggedUserId: (id: string) => void;
}

// Definindo o tipo para as props do AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente Provider do AuthContext
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedUserId, setLoggedUserId] = useState<string>("-1");

  // Recuperar o loggedUserId do localStorage (caso tenha sido armazenado)
  useEffect(() => {
    const storedUserId = localStorage.getItem("loggedUserId");
    if (storedUserId) {
      setLoggedUserId(storedUserId);
    }
  }, []);

  // Atualiza o localStorage sempre que o loggedUserId mudar
  useEffect(() => {
    if (loggedUserId !== "-1") {
      localStorage.setItem("loggedUserId", loggedUserId);
    }
  }, [loggedUserId]);

  return (
    <AuthContext.Provider value={{ loggedUserId, setLoggedUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para consumir o AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
