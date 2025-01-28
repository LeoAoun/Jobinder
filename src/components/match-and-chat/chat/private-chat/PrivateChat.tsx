import "@styles/components/match-and-chat/chat/PrivateChat.css";
import { useEffect, useRef, useState } from "react";

import PrivateChatHeader from "./PrivateChatHeader";
import PrivateChatMessagesContainer from "./PrivateChatMessagesContainer";
import PrivateChatInputContainer from "./PrivateChatInputContainer";

import { IUserDTO } from "@interfaces/IUser";
import { IChatMessages } from "@interfaces/IChat";
import { useAuth } from "@contexts/AuthContext";
import { useChatMessages } from "@contexts/ChatMessagesContext";

import { getChatMessages } from "@services/chatServices";

interface ChatMessagesProps {
  privateChatUser: IUserDTO | null;
  setPrivateChatUser: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
}

export default function PrivateChat({ privateChatUser, setPrivateChatUser }: ChatMessagesProps) {
  const { loggedUserId } = useAuth();
  const { chatMessages, setChatMessages } = useChatMessages();
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchChatMessages = async () => {
    if (!privateChatUser) return;

    const chatMessages: IChatMessages = await getChatMessages(loggedUserId, privateChatUser?.phone);
    setChatMessages(chatMessages);
  };

  // Fetch chat messages every 2 seconds
  setInterval(() => {
    fetchChatMessages();
  }, 2000);

  // Fetch chat messages from the database
  useEffect(() => {
    fetchChatMessages();
  }, [loggedUserId, privateChatUser, setChatMessages]);

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  return (
    <div className="private-chat">
      <PrivateChatHeader
        privateChatUser={privateChatUser}
        setPrivateChatUser={setPrivateChatUser}
      />

      <PrivateChatMessagesContainer
        chatContainerRef={chatContainerRef}
        chatMessages={chatMessages}
      />

      <PrivateChatInputContainer
        privateChatUser={privateChatUser}
        setScrollToBottom={setScrollToBottom}
      />
    </div>
  );
}
