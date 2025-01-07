import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MatchesProvider } from "./contexts/MatchesContext.tsx";
import { UsersProvider } from "./contexts/UsersContext.tsx";
import { UsersDTOProvider } from "./contexts/UsersDTOContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UsersProvider>
      <UsersDTOProvider>
        <MatchesProvider>
          <App />
        </MatchesProvider>
      </UsersDTOProvider>
    </UsersProvider>
  </StrictMode>
);
