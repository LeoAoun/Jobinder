interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  date: Date;
}

interface ChatMessages {
  [id: string]: Message[];
}

interface Chats {
  [id: string]: ChatMessages;
}

export type { Message, ChatMessages, Chats };
