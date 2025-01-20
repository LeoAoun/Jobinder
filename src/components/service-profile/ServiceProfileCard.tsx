import "@styles/components/service-profile/ServiceProfileCard.css";

import { IUserDTO } from "@interfaces/IUser";

interface ServiceProfileCardProps {
  loggedUserDTO: IUserDTO | null;
}

export default function ServiceProfileCard({ loggedUserDTO }: ServiceProfileCardProps) {
  return (
    <div className="service-profile-card-container">
      <div className="service-profile-card">
        <img src={loggedUserDTO?.serviceProfile?.serviceImg} />
        <span className="service-profile-card-location">
          {`${loggedUserDTO?.serviceProfile?.location.city},
            ${loggedUserDTO?.serviceProfile?.location.state}`}
        </span>
        <span className="service-profile-card-fullname">{loggedUserDTO?.fullName}</span>
        <div>
          <span>Especialidade:</span>
          <span>{loggedUserDTO?.serviceProfile?.specialty}</span>
        </div>
        <div>
          <span>Disponivel:</span>
          <span>{loggedUserDTO?.serviceProfile?.availability}</span>
        </div>
        <div>
          <span>Descrição:</span>
          <span>{loggedUserDTO?.serviceProfile?.description}</span>
        </div>
      </div>
    </div>
  );
}
