import { UserDTO } from "../../../interfaces/User";

interface CardButtonsProps {
  handleSwipe: (direction: string, profile: UserDTO) => void;
  profile: UserDTO;
  removedProfiles: UserDTO[];
  setRemovedProfiles: React.Dispatch<React.SetStateAction<UserDTO[]>>;
  setProfiles: React.Dispatch<React.SetStateAction<UserDTO[]>>;
}

export default function CardButtons({
  handleSwipe,
  profile,
  setProfiles,
  removedProfiles,
  setRemovedProfiles,
}: CardButtonsProps) {

  const undoLast = () => {
    if (removedProfiles.length > 0) {
      const lastRemoved = removedProfiles[0];
      setRemovedProfiles((prev) => prev.slice(1));
      setProfiles((prev) => [...prev, lastRemoved]);
    }
  };

  return (
    <div className="buttons">
      <button onClick={() => handleSwipe("left", profile)}>
        <img src="../assets/buttons/cancel.png" />
      </button>
      <button onClick={undoLast}>
        <img src="../assets/buttons/voltar.png" />
      </button>
      <button onClick={() => handleSwipe("right", profile)}>
        <img src="../assets/buttons/confirme.png" />
      </button>
    </div>
  );
}
