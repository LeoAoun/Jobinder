import "../styles/components/Card.css";

import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

import { UserDTO } from "../interfaces/User.ts";

import { useUsersDTO } from "../contexts/UsersDTOContext.tsx";
import { useMatches } from "../contexts/MatchesContext.tsx";

export default function Cards() {
  const { usersDTO } = useUsersDTO();

  const [profiles, setProfiles] = useState<UserDTO[]>([]);
  const [removedProfiles, setRemovedProfiles] = useState<UserDTO[]>([]);
  const { matches, setMatches } = useMatches();

  useEffect(() => {
    if (usersDTO) {
      setProfiles(Object.values(usersDTO));
    }
  }, [usersDTO]);

  const handleSwipe = (direction: string, profile: UserDTO) => {
    if (direction === "left") {
      setRemovedProfiles((prev) => [profile, ...prev]);
    } else if (direction === "right") {
      setMatches((prev) => [profile, ...prev]);
    }
    setProfiles((prev) => prev.filter((p) => p.fullName !== profile.fullName));
    console.log(matches);
  };

  const undoLast = () => {
    if (removedProfiles.length > 0) {
      const lastRemoved = removedProfiles[0];
      setRemovedProfiles((prev) => prev.slice(1));
      setProfiles((prev) => [...prev, lastRemoved]);
    }
  };

  return (
    <div className="cardContainer">
      {profiles.map((profile, index) => (
        <TinderCard
          key={index}
          className="swipe"
          preventSwipe={["up", "down"]}
          onSwipe={(dir) => handleSwipe(dir, profile)}
        >
          <div className="card">
            <span className="location">Adolfo, São Paulo</span>
            <img src={profile.serviceProfile?.serviceImg} />
            <div className="info">
              <h3>{profile.fullName}</h3>
              <div>
                <span>Especialidade:</span>
                <span>{profile.serviceProfile?.specialty}</span>
              </div>
              <div>
                <span>Disponibilidade:</span>
                <span>{profile.serviceProfile?.availability}</span>
              </div>
              <div>
                <span>Descrição:</span>
                <span>{profile.serviceProfile?.description}</span>
              </div>
            </div>
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
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
