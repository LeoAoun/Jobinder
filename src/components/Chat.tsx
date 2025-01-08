import "../styles/components/Chat.css";
import { useEffect, useState } from "react";

import { UserDTO } from "../interfaces/User";
import { useMatches } from "../contexts/MatchesContext";
import { getUserDTO } from "../../backend/services/userServices";
import { getMatch } from "../../backend/services/matchServices";
import { useAuth } from "../contexts/AuthContext";

export default function Chat() {
  const { loggedUserId } = useAuth();
  const { matches } = useMatches();
  const [usersMatchedDTO, setUsersMatchedDTO] = useState<UserDTO[]>([]);

  useEffect(() => {
    const fetchUsersMatchedDTO = async () => {
      const matchIds = await getMatch(loggedUserId);

      if (matchIds) {
        const fetchedUsers = await Promise.all(
          matchIds.map(async (matchId) => {
            const userDTO = await getUserDTO(matchId);
            return userDTO;
          })
        );

        setUsersMatchedDTO(fetchedUsers);
      }
    };

    fetchUsersMatchedDTO();
  }, [matches]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Mensagens</h2>
        <input type="text" placeholder="Localizar Contato" />
        <button>Fechar</button>
      </div>
      {usersMatchedDTO.length > 0 ? (
        <ul className="chat-list">
          {usersMatchedDTO.length > 0 ? (
            usersMatchedDTO.map((userDTO: UserDTO, index: number) => {
              const splitName = userDTO.fullName.split(" ");
              const firstName = splitName[0];
              const lastName = splitName[splitName.length - 1];

              return (
                <li key={index} className="chat-box">
                  <div className="chat-box-info">
                    <img className="img" src={userDTO.serviceProfile?.serviceImg} />
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
