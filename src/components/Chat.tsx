import { useMatches } from "../contexts/MatchesContext";
import "../styles/components/Chat.css";

export default function Chat() {
  const { matches, setMatches } = useMatches();

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Mensagens</h2>
        <input type="text" placeholder="Localizar Contato" />
        <button>Fechar</button>
      </div>
      {matches.length > 0 ? (
        <ul className="chat-list">
          {matches.length > 0 ? (
            matches.map((match, index) => {
              const splitName = match.fullName.split(" ");
              const firstName = splitName[0];
              const lastName = splitName[splitName.length - 1];

              return (
                <li key={index} className="chat-box">
                  <div className="chat-box-info">
                    <img className="img" src={match.serviceProfile?.serviceImg} />
                    <div className="name-and-last-message">
                      <span className="name">{`${firstName} ${lastName}`}</span>
                      <span className="last-message">aaa</span>
                    </div>
                  </div>
                  <button className="delete-chat">X</button>
                </li>
              );
            })
          ) : (
            <span className="no-matches">Nenhum match encontrado.</span>
          )}
        </ul>
      ) : (
        <p>Nenhum match encontrado.</p>
      )}
    </div>
  );
}
