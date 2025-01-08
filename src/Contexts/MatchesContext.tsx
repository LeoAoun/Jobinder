import { createContext, useContext, useState, ReactNode } from "react";

// Define o tipo do contexto
interface MatchesContextType {
  matches: Record<string, string[]>;
  setMatches: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

// Inicializa o contexto
const MatchContext = createContext<MatchesContextType | undefined>(undefined);

// Componente Provider
export const MatchesProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Record<string, string[]>>({});

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
