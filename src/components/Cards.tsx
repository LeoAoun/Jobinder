import "../styles/components/Card.css";

import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

import { UserDTO } from "../interfaces/User.ts";
import { useUsersDTO } from "../contexts/UsersDTOContext.tsx";
import { useMatches } from "../contexts/MatchesContext.tsx";

import { addMatch, getMatches } from "../../backend/services/matchServices.ts";

export default function Cards() {
  const loggedUserId: string = "-1";
  const { usersDTO } = useUsersDTO();

  const [profiles, setProfiles] = useState<UserDTO[]>([]);
  const [removedProfiles, setRemovedProfiles] = useState<UserDTO[]>([]);
  const { matches, setMatches } = useMatches();

  // Fetch matches from the database
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesFromDB = await getMatches();
        setMatches(matchesFromDB);
      } catch (error) {
        console.error("Erro ao buscar matches do banco de dados:", error);
      }
    };

    fetchMatches(); 
  }, [setMatches]);

  // Update profiles state when usersDTO and matches are changed
  useEffect(() => {
    if (usersDTO && matches) {
      // Get the matches of the logged user
      const matchedIds = matches[loggedUserId] || [];

      // Filter the profiles that are not matched
      const notMatchedProfiles = Object.values(usersDTO).filter(
        (profile) => !matchedIds.includes(profile.phone) && profile.phone !== loggedUserId
      );

      setProfiles(notMatchedProfiles);
    }
  }, [usersDTO, matches, loggedUserId]);

  const handleSwipe = (direction: string, profile: UserDTO) => {
    switch (direction) {
      case "left":
        setRemovedProfiles((prev) => [profile, ...prev]);
        break;
      case "right":
        addMatch(loggedUserId, profile.phone);
        setMatches((prev) => ({
          ...prev,
          [loggedUserId]: [...(prev[loggedUserId] || []), profile.phone],
        }));
        break;
      default:
        break;
    }
    setProfiles((prev) => prev.filter((p) => p.phone !== profile.phone));
  };

  const undoLast = () => {
    if (removedProfiles.length > 0) {
      const lastRemoved = removedProfiles[0];
      setRemovedProfiles((prev) => prev.slice(1));
      setProfiles((prev) => [...prev, lastRemoved]);
    }
  };

  return (
    <div className="card-container">
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
