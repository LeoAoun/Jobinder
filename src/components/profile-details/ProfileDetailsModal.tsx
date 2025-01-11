import "../../styles/components/ProfileDetailsModal.css";
import ProfileDetailsRating from "./ProfileDetailsRating";

import { useProfileDetails } from "../../contexts/ProfileDetailsContext";

export default function ProfileDetailsModal() {
  const { profileDetails, setProfileDetails } = useProfileDetails();

  const closeProfileDetails = () => {
    setProfileDetails(null);
  };

  return (
    <div className="profile-details-modal">
      <div className="profile-details-container">
        <img src={profileDetails?.serviceProfile?.serviceImg} />
        <ProfileDetailsRating rating={profileDetails?.serviceProfile?.rating} />
        <button className="close-profile-details" onClick={closeProfileDetails}>
          Fechar
        </button>
        <div className="profile-details">
          <div>
            <span>Nome:</span>
            <span>{profileDetails?.fullName}</span>
          </div>
          <div>
            <span>Especialidade:</span>
            <span>{profileDetails?.serviceProfile?.specialty}</span>
          </div>
          <div>
            <span>Serviços realizados:</span>
            <span>{profileDetails?.serviceProfile?.specialty}</span>
          </div>
          <div>
            <span>Disponibilidade:</span>
            <span>{profileDetails?.serviceProfile?.availability}</span>
          </div>
          <div>
            <span>Estado:</span>
            <span>{profileDetails?.serviceProfile?.location.state}</span>
          </div>
          <div>
            <span>Cidade:</span>
            <span>{profileDetails?.serviceProfile?.location.city}</span>
          </div>
          <div>
            <span>Celular:</span>
            <span>{profileDetails?.phone}</span>
          </div>
          <div>
            <span>Descrição:</span>
            <span>{profileDetails?.serviceProfile?.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
