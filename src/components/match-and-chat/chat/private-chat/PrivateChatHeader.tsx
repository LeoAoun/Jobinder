import noServiceImg from "@assets/no-service-img.webp";

import { IUserDTO } from "@interfaces/IUser";

interface PrivateChatHeaderProps {
  privateChatUser: IUserDTO | null;
  setPrivateChatUser: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
}

export default function PrivateChatHeader({
  privateChatUser,
  setPrivateChatUser,
}: PrivateChatHeaderProps) {
  const handleCloseChat = () => {
    setPrivateChatUser(null);
  };

  return (
    <div className="private-chat-header">
      <button className="close-private-chat" onClick={handleCloseChat}>
        Voltar
      </button>
      <img
        src={
          privateChatUser?.serviceProfile?.serviceImg
            ? privateChatUser?.serviceProfile?.serviceImg
            : noServiceImg
        }
      />
      <span className="fullname">{privateChatUser?.fullName}</span>
      <button className="hire">Contratar</button>
    </div>
  );
}
