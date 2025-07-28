import "@styles/components/service-profile/ServiceProfileCard.css";

import { IUserDTO } from "@interfaces/IUser";
import { useEffect } from "react";

interface ServiceProfileCardProps {
  loggedUserDTO: IUserDTO | null;
  closeMenu: boolean;
  setCloseMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ServiceProfileCard({
  loggedUserDTO,
  closeMenu,
  setCloseMenu,
}: ServiceProfileCardProps) {
  // UseEffect to see the changes in width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setCloseMenu(false);
      } else {
        setCloseMenu(true);
      }
    };

    handleResize(); // Call handleResize to set closeMenu when the page is loaded

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setCloseMenu]);

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

      {closeMenu && (
        <button className="open-menu" onClick={() => setCloseMenu(false)}>
          Menu
        </button>
      )}
    </div>
  );
}
