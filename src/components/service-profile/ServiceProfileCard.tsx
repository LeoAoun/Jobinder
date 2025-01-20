import "@styles/components/ServiceProfile/ServiceProfileCard.css";
import { useEffect, useState } from "react";

import { useAuth } from "@contexts/AuthContext";
import { getUserDTO } from "@services/userServices";
import { IUserDTO } from "@interfaces/IUser";

export default function ServiceProfileCard() {
  const { loggedUserId } = useAuth();
  const [loggedUserDTO, setLoggedUserDTO] = useState<IUserDTO | null>();

  // Fetch userDTO when loggedUserId changes
  useEffect(() => {
    const fetchUserDTO = async () => {
      if (loggedUserId) {
        const userDTO = await getUserDTO(loggedUserId);
        console.log(loggedUserId);
        setLoggedUserDTO(userDTO);
      }
    };

    fetchUserDTO();
  }, [loggedUserId]);

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
