import { useRef, useState } from "react";

import { IUserDTO } from "@interfaces/IUser";
import { IChatMessages } from "@interfaces/IChat";
import { useAuth } from "@contexts/AuthContext";
import { useChatMessages } from "@contexts/ChatMessagesContext";

import { addChatMessage, getChatMessages } from "@services/chatServices";

interface PrivateChatInputContainerProps {
  privateChatUser: IUserDTO | null;
}

export default function PrivateChatInputContainer({
  privateChatUser,
}: PrivateChatInputContainerProps) {
  const { loggedUserId } = useAuth();
  const { setChatMessages } = useChatMessages();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [message, setMessage] = useState<string>("");

  // Send a message to the private chat
  const handleSendMessage = async () => {
    if (!message.trim() || !privateChatUser) return;

    await addChatMessage(loggedUserId, privateChatUser.phone, message);

    const updatedMessages: IChatMessages = await getChatMessages(
      loggedUserId,
      privateChatUser.phone
    );

    setChatMessages(updatedMessages);
    setMessage(""); // Clear the message input after sending the message

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      const maxLines = 6;
      const lineHeight = 1.2 * 16;
      const maxHeight = lineHeight * maxLines;

      textAreaRef.current.style.height = `${Math.min(
        textAreaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  };

  return (
    <div className="private-chat-input-container">
      <textarea
        ref={textAreaRef}
        placeholder="Digite uma mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        rows={3}
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
}
