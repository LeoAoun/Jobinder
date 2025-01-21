import { useEffect, useState } from "react";

import noServiceImg from "@assets/no-service-img.webp";

import { IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";

import { getLastMessagePrivateChat } from "../../../../backend/services/chatServices";

interface ChatBoxProps {
  filteredUsers: IUserDTO[];
  setPrivateChatUser: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
  setUserMatchedToBeDeleted: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
  setOpenDeleteMatchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatBox({
  filteredUsers,
  setPrivateChatUser,
  setUserMatchedToBeDeleted,
  setOpenDeleteMatchModal,
}: ChatBoxProps) {
  const { loggedUserId } = useAuth();
  const [lastMessages, setLastMessages] = useState<Record<string, string | null>>({});

  // Fetch last messages for all filtered users
  useEffect(() => {
    const fetchLastMessages = async () => {
      if (filteredUsers.length === 0) return;

      const messages: Record<string, string | null> = {};
      const allLastMessages = filteredUsers.map(async (user) => {
        const lastMessage = await getLastMessagePrivateChat(loggedUserId, user.phone);
        messages[user.phone] = lastMessage?.message || null;
      });

      await Promise.all(allLastMessages);
      setLastMessages(messages);
    };

    fetchLastMessages();
  }, [filteredUsers, loggedUserId]);

  const handleDeleteMatch = (userDTO: IUserDTO) => {
    setUserMatchedToBeDeleted(userDTO);
    setOpenDeleteMatchModal(true);
  };

  const handleOpenPrivateChat = (userDTO: IUserDTO) => {
    setPrivateChatUser(userDTO);
  };

  // Extract the first and last names from the full name
  const extractNames = (fullName: string): [string, string] => {
    const names = fullName.split(" ");
    const firstName = names[0];
    const lastName = names[names.length - 1];
    return [firstName, lastName];
  };

  // Truncate the message if it's too long
  const truncateMessage = (message: string | null, maxLength: number = 20): string | null => {
    if (!message) return null;
    return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
  };

  return (
    <ul className="chat-list">
      {filteredUsers.map((user, index) => {
        const [firstName, lastName] = extractNames(user.fullName);
        const lastMessage = truncateMessage(lastMessages[user.phone]);

        return (
          <li
            key={user.phone || index}
            className="chat-box"
            onClick={() => handleOpenPrivateChat(user)}
          >
            <div className="chat-box-info">
              <img className="img" src={user.serviceProfile?.serviceImg ? user.serviceProfile?.serviceImg : noServiceImg} />
              <div className="name-and-last-message">
                <span className="name">{`${firstName} ${lastName}`}</span>
                <span className="last-message">{lastMessage}</span>
              </div>
            </div>
            <button
              className="delete-match"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteMatch(user);
              }}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
}
