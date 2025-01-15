interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  date: Date;
}

interface IChatMessages {
  [id: string]: IMessage[];
}

interface IChats {
  [id: string]: IChatMessages;
}

export type { IMessage, IChatMessages, IChats };
