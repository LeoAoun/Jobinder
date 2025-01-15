import "@styles/components/match-and-chat/chat/Chat.css";
import { useEffect, useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
import PrivateChat from "./private-chat/PrivateChat";
import DeleteMatchModal from "./DeleteMatchModal";

import { IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";
import { useMatches } from "@contexts/MatchesContext";

import { getUserDTO } from "@services/userServices";
import { getMatch } from "@services/matchServices";

export default function Chat() {
  const { loggedUserId } = useAuth();
  const { matches } = useMatches();

  const [usersMatchedDTO, setUsersMatchedDTO] = useState<IUserDTO[] | []>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [privateChatUser, setPrivateChatUser] = useState<IUserDTO | null>(null);

  const [openDeleteMatchModal, setOpenDeleteMatchModal] = useState<boolean>(false);
  const [userMatchedToBeDeleted, setUserMatchedToBeDeleted] = useState<IUserDTO | null>(null);

  // Fetch users matched DTO from the database
  useEffect(() => {
    const fetchUsersMatchedDTO = async () => {
      const matchIds = await getMatch(loggedUserId);
      if (matchIds) {
        const fetchedUsers = await Promise.all(
          matchIds.map(async (matchId: string) => {
            const userDTO = await getUserDTO(matchId);
            return userDTO;
          })
        );

        setUsersMatchedDTO(fetchedUsers);
      }
    };

    fetchUsersMatchedDTO();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const filteredUsers = usersMatchedDTO.filter((userSearched) => {
    const fullName = `${userSearched.fullName.toLowerCase()}`;
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="chat-container">
        <ChatHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {!privateChatUser ? (
          filteredUsers.length > 0 ? (
            <ChatBox
              filteredUsers={filteredUsers}
              setUserMatchedToBeDeleted={setUserMatchedToBeDeleted}
              setOpenDeleteMatchModal={setOpenDeleteMatchModal}
              setPrivateChatUser={setPrivateChatUser}
            />
          ) : (
            <span className="no-matches">Nenhum match realizado.</span>
          )
        ) : (
          <PrivateChat privateChatUser={privateChatUser} setPrivateChatUser={setPrivateChatUser} />
        )}
      </div>

      {openDeleteMatchModal ? (
        <DeleteMatchModal
          setOpenDeleteMatchModel={setOpenDeleteMatchModal}
          setUsersMatchedDTO={setUsersMatchedDTO}
          userMatchedToBeDeleted={userMatchedToBeDeleted}
          setUserMatchedToBeDeleted={setUserMatchedToBeDeleted}
        />
      ) : null}
    </>
  );
}
