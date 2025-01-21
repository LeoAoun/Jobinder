import "@styles/components/match-and-chat/cards/Card.css";
import { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";

import CardInfo from "./CardInfo";
import CardButtons from "./CardButtons";

import { IUserDTO } from "@interfaces/IUser.ts";
import { useAuth } from "@contexts/AuthContext";
import { useUsersDTO } from "@contexts/UsersDTOContext";
import { useMatches } from "@contexts/MatchesContext";
import { useProfileDetails } from "@contexts/ProfileDetailsContext";

import { addMatch, getMatches } from "@services/matchServices.ts";

interface CardsProps {
  profiles: IUserDTO[];
  setProfiles: React.Dispatch<React.SetStateAction<IUserDTO[]>>;
  filterTerm: string; // Novo valor de filtro para buscar
}

export default function Cards({ profiles, setProfiles, filterTerm }: CardsProps) {
  const { loggedUserId } = useAuth();

  const { usersDTO } = useUsersDTO();
  const { matches, setMatches } = useMatches();
  const { setProfileDetails } = useProfileDetails();

  const [removedProfiles, setRemovedProfiles] = useState<IUserDTO[]>([]);

  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);

  const filteredProfiles = profiles.filter((profile) =>
    profile.serviceProfile?.specialty.toLowerCase().includes(filterTerm.toLowerCase())
  );

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
        (profile) =>
          !matchedIds.includes(profile.phone) && // The profile is not matched
          profile.phone !== loggedUserId && // The profile is not the logged user
          profile.serviceProfile // The profile is a service profile
      );

      setProfiles(notMatchedProfiles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersDTO, loggedUserId]);

  const handleSwipe = (direction: string, profile: IUserDTO): void => {
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

  const handleUserDetails = (profile: IUserDTO) => {
    setProfileDetails(profile);
  };

  const handlePointerDown = (profile: IUserDTO) => {
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
      {filteredProfiles.map((profile) => (
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
