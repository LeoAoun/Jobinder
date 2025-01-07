import { useState } from "react";
import TinderCard from "react-tinder-card";

import { Profile, ProfileDTO } from "../interfaces/Profile";
import { useMatches } from "../Contexts/MatchesContext";

export default function Card() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
  const [profiles, setProfiles] = useState<ProfileDTO[]>();
  const [removedProfiles, setRemovedProfiles] = useState<ProfileDTO[]>([]);
  const { matches, setMatches } = useMatches();

  const handleSwipe = (direction: string, profile: ProfileDTO) => {
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
            <img src="../public/assets/adv1.jpeg" />
            <div className="info">
              <h3>{profile.fullName}</h3>
              <div>
                <span>Especialidade:</span>
                <span>sAUDE</span>
              </div>
              <div>
                <span>Disponibilidade:</span>
                <span>Segudna a sexta</span>
              </div>
              <div>
                <span>Descrição:</span>
                <span>
                  Experiencia em
                  exammasdjksakdskaaksdasdkexammasdjksakdskaaksdasdkexammasdjksakdskaaksdasdk
                </span>
              </div>
            </div>
            <div className="buttons">
              <button>
                <img src="../public/assets/buttons/cancel.png" />
              </button>
              <button onClick={undoLast}>
                <img src="../public/assets/buttons/voltar.png" />
              </button>
              <button>
                <img src="../public/assets/buttons/confirme.png" />
              </button>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
