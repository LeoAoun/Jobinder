import { createContext, useContext, useState, ReactNode } from "react";

interface MatchesContextType {
  matches: Record<string, string[]>;
  setMatches: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

const MatchContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Record<string, string[]>>({});

  return (
    <MatchContext.Provider value={{ matches, setMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMatches = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch deve ser usado dentro de um MatchProvider");
  }
  return context;
};
