import "../../styles/components/cards/Card.css";

import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

import { UserDTO } from "../../interfaces/User.ts";
import { useUsersDTO } from "../../contexts/UsersDTOContext.tsx";
import { useMatches } from "../../contexts/MatchesContext.tsx";

import { addMatch, getMatches } from "../../../backend/services/matchServices.ts";
import { useAuth } from "../../contexts/AuthContext.tsx";
import CardInfo from "./CardInfo.tsx";
import CardButtons from "./CardButtons.tsx";

export default function Cards() {
  const { loggedUserId } = useAuth();

  const { usersDTO } = useUsersDTO();
  const { matches, setMatches } = useMatches();

  const [profiles, setProfiles] = useState<UserDTO[]>([]);
  const [removedProfiles, setRemovedProfiles] = useState<UserDTO[]>([]);

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
      const matchedIds = matches[loggedUserId] || [];

      // Filter the profiles that are not matched
      const notMatchedProfiles = Object.values(usersDTO).filter(
        (profile) => !matchedIds.includes(profile.phone) && profile.phone !== loggedUserId
      );

      setProfiles(notMatchedProfiles);
    }
  }, [usersDTO, loggedUserId]);

  const handleSwipe = (direction: string, profile: UserDTO): void => {
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
            <CardInfo profile={profile} />
            <CardButtons
              handleSwipe={handleSwipe}
              profile={profile}
              removedProfiles={removedProfiles}
              setRemovedProfiles={setRemovedProfiles}
              setProfiles={setProfiles}
            />
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
