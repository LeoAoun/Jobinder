interface ChatHeaderProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatHeader({ searchTerm, setSearchTerm }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <h2>Mensagens</h2>
      <input
        type="text"
        placeholder="Localizar Contato"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>Fechar</button>
    </div>
  );
}
