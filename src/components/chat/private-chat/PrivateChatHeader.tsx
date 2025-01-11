import { UserDTO } from "../../../../interfaces/User";

interface PrivateChatHeaderProps {
  privateChatUser: UserDTO | null;
  setPrivateChatUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
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
      <img src={privateChatUser?.serviceProfile?.serviceImg} />
      <span className="fullname">{privateChatUser?.fullName}</span>
      <button className="hire">Contratar</button>
    </div>
  );
}
