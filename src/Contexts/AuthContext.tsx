import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  loggedUserId: string;
  setLoggedUserId: (id: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedUserId, setLoggedUserId] = useState<string>("-1");

  // Load the session when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("loggedUserId");
    if (storedUserId) {
      setLoggedUserId(storedUserId);
    }
  }, []);

  // Update the session when the loggedUserId changes
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
