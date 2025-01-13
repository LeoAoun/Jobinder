import { Message, ChatMessages, Chats } from "../../interfaces/Chat";
import { v4 as uuidv4 } from "uuid";

// Storage key for chats
const jobinderChatsStorageKey = "jobinder-chats";

// Get the chat messages from the database
const getChats = async (): Promise<Chats> => {
  const chats = JSON.parse(localStorage.getItem(jobinderChatsStorageKey) || "{}");
  return chats;
};

// Get the storage key for a private chat
const getPrivateChatStorageKey = async (loggedUserId: string, chatUserId: string) => {
  const [firstId, secondId] = [loggedUserId, chatUserId].sort();
  return `chat-${firstId}-${secondId}`;
};

// Get the chat messages from a private chat
const getChatMessages = async (loggedUserId: string, chatUserId: string): Promise<ChatMessages> => {
  const chats = await getChats();
  const privateChatStorageKey = await getPrivateChatStorageKey(loggedUserId, chatUserId);
  return chats[privateChatStorageKey] || [];
};

// Add a message to a private chat
const addChatMessage = async (loggedUserId: string, chatUserId: string, message: string) => {
  const chats = await getChats();
  const privateChatStorageKey = await getPrivateChatStorageKey(loggedUserId, chatUserId);

  const newMessage: Message = {
    id: uuidv4(),
    senderId: loggedUserId,
    receiverId: chatUserId,
    message,
    date: new Date(),
  };

  const updatedMessages: Message[] = Array.isArray(chats[privateChatStorageKey])
    ? chats[privateChatStorageKey]
    : [];
  updatedMessages.push(newMessage);

  localStorage.setItem(
    jobinderChatsStorageKey,
    JSON.stringify({ ...chats, [privateChatStorageKey]: updatedMessages })
  );
};

const getLastMessagePrivateChat = async (
  loggedUserId: string,
  chatUserId: string
): Promise<Message | null> => {
  const chatMessages: ChatMessages = await getChatMessages(loggedUserId, chatUserId);

  if (Array.isArray(chatMessages) && chatMessages.length > 0) {
    return chatMessages[chatMessages.length - 1];
  }

  return null; // Return null if there are no messages
};

export { getChatMessages, addChatMessage, getLastMessagePrivateChat };