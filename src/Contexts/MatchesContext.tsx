import { createContext, useContext, useState, ReactNode } from "react";
import { UserDTO } from "../interfaces/User";

// Define o tipo do contexto
interface MatchesContextType {
  matches: UserDTO[];
  setMatches: React.Dispatch<React.SetStateAction<UserDTO[]>>;
}

// Inicializa o contexto
const MatchContext = createContext<MatchesContextType | undefined>(undefined);

// Componente Provider
export const MatchesProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<UserDTO[]>([]);

  return (
    <MatchContext.Provider value={{ matches, setMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

// Hook para usar o contexto
export const useMatches = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch deve ser usado dentro de um MatchProvider");
  }
  return context;
};
