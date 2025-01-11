import App from "./App.tsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { UsersProvider } from "./contexts/UsersContext.tsx";
import { UsersDTOProvider } from "./contexts/UsersDTOContext.tsx";
import { MatchesProvider } from "./contexts/MatchesContext.tsx";
import { ProfileDetailsProvider } from "./contexts/ProfileDetailsContext.tsx";
import { ChatMessagesProvider } from "./contexts/ChatMessagesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UsersProvider>
        <UsersDTOProvider>
          <MatchesProvider>
            <ProfileDetailsProvider>
              <ChatMessagesProvider>
                <App />
              </ChatMessagesProvider>
            </ProfileDetailsProvider>
          </MatchesProvider>
        </UsersDTOProvider>
      </UsersProvider>
    </AuthProvider>
  </StrictMode>
);
