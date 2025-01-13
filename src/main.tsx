import App from "./App.tsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, ToastOptions } from "react-toastify";

import { AuthProvider } from "@contexts/AuthContext.tsx";
import { UsersProvider } from "@contexts/UsersContext.tsx";
import { UsersDTOProvider } from "@contexts/UsersDTOContext.tsx";
import { MatchesProvider } from "@contexts/MatchesContext.tsx";
import { ProfileDetailsProvider } from "@contexts/ProfileDetailsContext.tsx";
import { ChatMessagesProvider } from "@contexts/ChatMessagesContext.tsx";

export const toastConfig: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <UsersDTOProvider>
            <MatchesProvider>
              <ProfileDetailsProvider>
                <ChatMessagesProvider>
                  <ToastContainer {...toastConfig} />
                  <App />
                </ChatMessagesProvider>
              </ProfileDetailsProvider>
            </MatchesProvider>
          </UsersDTOProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
