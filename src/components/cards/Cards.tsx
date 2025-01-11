import "../../styles/components/cards/Card.css";
import CardInfo from "./CardInfo.tsx";
import CardButtons from "./CardButtons.tsx";

import { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";

import { UserDTO } from "../../../interfaces/User.ts";
import { useUsersDTO } from "../../contexts/UsersDTOContext.tsx";
import { useMatches } from "../../contexts/MatchesContext.tsx";

import { addMatch, getMatches } from "../../../backend/services/matchServices.ts";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useProfileDetails } from "../../contexts/ProfileDetailsContext.tsx";

export default function Cards() {
  const { loggedUserId } = useAuth();

  const { usersDTO } = useUsersDTO();
  const { matches, setMatches } = useMatches();
  const { setProfileDetails } = useProfileDetails();

  const [profiles, setProfiles] = useState<UserDTO[]>([]);
  const [removedProfiles, setRemovedProfiles] = useState<UserDTO[]>([]);

  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleUserDetails = (profile: UserDTO) => {
    setProfileDetails(profile);
  };

  const handlePointerDown = (profile: UserDTO) => {
    isDraggingRef.current = false;
    hasMovedRef.current = false;

    holdTimeoutRef.current = setTimeout(() => {
      if (!isDraggingRef.current && !hasMovedRef.current) {
        handleUserDetails(profile);
      }
    }, 500);
  };

  const handlePointerMove = () => {
    hasMovedRef.current = true;
  };

  const handlePointerUp = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  return (
    <div className="card-container">
      {profiles.map((profile) => (
        <TinderCard
          key={profile.phone}
          className="swipe"
          preventSwipe={["up", "down"]}
          onSwipe={(dir) => handleSwipe(dir, profile)}
        >
          <div
            className="card"
            onDoubleClick={() => handleUserDetails(profile)}
            onPointerDown={() => handlePointerDown(profile)}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
            <CardInfo profile={profile} />
            <CardButtons
              profile={profile}
              removedProfiles={removedProfiles}
              handleSwipe={handleSwipe}
              setRemovedProfiles={setRemovedProfiles}
              setProfiles={setProfiles}
            />
          </div>
        </TinderCard>
      ))}
    </div>
  );
}
