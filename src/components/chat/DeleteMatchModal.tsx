import "../../styles/components/chat/DeleteMatchModal.css";

import { UserDTO } from "../../../interfaces/User";
import { useAuth } from "../../contexts/AuthContext";

import { deleteMatch } from "../../../backend/services/matchServices";
import { useMatches } from "../../contexts/MatchesContext";

interface DeleteMatchModalProps {
  setOpenDeleteMatchModel: React.Dispatch<React.SetStateAction<boolean>>;
  setUsersMatchedDTO: React.Dispatch<React.SetStateAction<UserDTO[]>>;
  userMatchedToBeDeleted: UserDTO | null;
  setUserMatchedToBeDeleted: React.Dispatch<React.SetStateAction<UserDTO | null>>;
}

export default function DeleteMatchModal({
  setOpenDeleteMatchModel,
  setUsersMatchedDTO,
  userMatchedToBeDeleted,
  setUserMatchedToBeDeleted,
}: DeleteMatchModalProps) {
  const { loggedUserId } = useAuth();

  const { setMatches } = useMatches();

  const handleCancelDeleteMatch = () => {
    setOpenDeleteMatchModel(false);
    setUserMatchedToBeDeleted(null);
  };

  const handleDeleteMatch = async () => {
    if (userMatchedToBeDeleted) {
      setOpenDeleteMatchModel(false);
      await deleteMatch(loggedUserId, userMatchedToBeDeleted.phone);

      setMatches((prev) => ({
        ...prev,
        [loggedUserId]: prev[loggedUserId].filter(
          (match) => match !== userMatchedToBeDeleted.phone
        ),
      }));

      setUsersMatchedDTO((prev) =>
        prev.filter((user) => user.phone !== userMatchedToBeDeleted.phone)
      );

      setUserMatchedToBeDeleted(null);
    }
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-info">
          <span>Você deseja realmente apagar a conversa com </span>
          <span>{userMatchedToBeDeleted?.fullName}?</span>
          <span>(todos os dados da conversa serão apagados)</span>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={handleCancelDeleteMatch}>
            Cancelar
          </button>
          <button className="confirm" onClick={handleDeleteMatch}>
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
}
