interface ChatHeaderProps {
  setCloseChatContainer: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatHeader({
  setCloseChatContainer,
  searchTerm,
  setSearchTerm,
}: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <h2>Mensagens</h2>
      <div>
        <input
          type="text"
          placeholder="Localizar Contato"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="close-chat-container" onClick={() => setCloseChatContainer(true)}>
          Fechar
        </button>
      </div>
    </div>
  );
}
