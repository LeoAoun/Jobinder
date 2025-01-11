import { createContext, useContext, useState, ReactNode } from "react";
import { ChatMessages } from "../../interfaces/Chat";

interface ChatMessagesContextType {
  chatMessages: ChatMessages | null;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessages | null>>;
}

const ChatMessagesContext = createContext<ChatMessagesContextType | undefined>(undefined);

export const ChatMessagesProvider = ({ children }: { children: ReactNode }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessages | null>(null);

  return (
    <ChatMessagesContext.Provider value={{ chatMessages, setChatMessages }}>
      {children}
    </ChatMessagesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChatMessages = () => {
  const context = useContext(ChatMessagesContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
