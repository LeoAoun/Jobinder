import "../../../styles/components/chat/PrivateChat.css";
import { useEffect, useRef } from "react";

import PrivateChatHeader from "./PrivateChatHeader";
import PrivateChatMessagesContainer from "./PrivateChatMessagesContainer";
import PrivateChatInputContainer from "./PrivateChatInputContainer";

import { UserDTO } from "../../../../interfaces/User";
import { ChatMessages } from "../../../../interfaces/Chat";
import { useAuth } from "../../../contexts/AuthContext";
import { useChatMessages } from "../../../contexts/ChatMessagesContext";

import { getChatMessages } from "../../../../backend/services/chatServices";

interface ChatMessagesProps {
  privateChatUser: UserDTO | null;
  setPrivateChatUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
}

export default function PrivateChat({ privateChatUser, setPrivateChatUser }: ChatMessagesProps) {
  const { loggedUserId } = useAuth();
  const { chatMessages, setChatMessages } = useChatMessages();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch chat messages from the database
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!privateChatUser) return;

      const chatMessages: ChatMessages = await getChatMessages(
        loggedUserId,
        privateChatUser?.phone
      );
      setChatMessages(chatMessages);
    };

    fetchChatMessages();
  }, [loggedUserId, privateChatUser, setChatMessages]);

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, privateChatUser]);

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

      <PrivateChatInputContainer privateChatUser={privateChatUser} />
    </div>
  );
}
