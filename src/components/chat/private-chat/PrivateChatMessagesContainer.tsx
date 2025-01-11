import { ChatMessages } from "../../../../interfaces/Chat";
import { useAuth } from "../../../contexts/AuthContext";

interface ChatMessagesProps {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  chatMessages: ChatMessages | null;
}

export default function PrivateChatMessagesContainer({
  chatContainerRef,
  chatMessages,
}: ChatMessagesProps) {
  const { loggedUserId } = useAuth();

  return (
    <div className="private-chat-messages" ref={chatContainerRef}>
      {chatMessages && Array.isArray(chatMessages)
        ? chatMessages.map((chatMessage, index) => {
            return (
              <div
                key={index}
                className={`message ${
                  chatMessage.senderId === loggedUserId ? "sender-message" : "receiver-message"
                }`}
              >
                {chatMessage.message}
              </div>
            );
          })
        : null}
    </div>
  );
}
