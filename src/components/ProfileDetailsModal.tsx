import "../styles/components/ProfileDetailsModal.css";

import { useAuth } from "../contexts/AuthContext";
import { useMatches } from "../contexts/MatchesContext";
import { getUserDTO } from "../../backend/services/userServices";
import { useEffect, useState } from "react";
import { UserDTO } from "../interfaces/User";

export default function ProfileDetailsModal() {
  const { loggedUserId } = useAuth();
  const { matches } = useMatches();

  const [profile, setProfile] = useState<UserDTO | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (matches[loggedUserId]?.[0]) {
        const firstMatch = matches[loggedUserId][0];
        const profileData = await getUserDTO(firstMatch);
        setProfile(profileData);
      }
    };

    fetchProfile();
  }, [loggedUserId, matches]);

  return (
    <div className="profile-details-modal">
      <div className="profile-details-container">
        <img src={profile?.serviceProfile?.serviceImg} />
        <span className="rating"></span>
        <div className="profile-details">
          <div>
            <span>Nome</span>
            <span>{profile?.fullName}</span>
          </div>
          <div>
            <span>Especialidade</span>
            <span>{profile?.serviceProfile?.specialty}</span>
          </div>
          <div>
            <span>Serviços realizados</span>
            <span>{profile?.serviceProfile?.specialty}</span>
          </div>
          <div>
            <span>Disponibilidade</span>
            <span>{profile?.serviceProfile?.availability}</span>
          </div>
          <div>
            <span>Estado</span>
            <span>{profile?.serviceProfile?.location.state}</span>
          </div>
          <div>
            <span>Cidade</span>
            <span>{profile?.serviceProfile?.location.city}</span>
          </div>
          <div>
            <span>Celular</span>
            <span>{profile?.phone}</span>
          </div>
          <div>
            <span>Descrição</span>
            <span>{profile?.serviceProfile?.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
