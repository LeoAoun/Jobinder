import "@styles/components/service-profile/ServiceProfile.css";

import ServiceProfileMenu from "./menu/ServiceProfileMenu";
import ServiceProfileCard from "./ServiceProfileCard";
import { IUserDTO } from "@interfaces/IUser";
import { useEffect, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { getUserDTO } from "@services/userServices";

export default function ServiceProfile() {
  const { loggedUserId } = useAuth();
  const [loggedUserDTO, setLoggedUserDTO] = useState<IUserDTO | null>(null);
  const [closeMenu, setCloseMenu] = useState<boolean>(false);

  // Fetch loggedUserDTO when loggedUserId changes
  useEffect(() => {
    const fetchUserDTO = async () => {
      if (loggedUserId) {
        const userDTO = await getUserDTO(loggedUserId);
        setLoggedUserDTO(userDTO);
      }
    };

    fetchUserDTO();
  }, [loggedUserId]);

  return (
    <div className="service-profile-container">
      {!closeMenu ? (
        <ServiceProfileMenu
          loggedUserDTO={loggedUserDTO}
          setLoggedUserDTO={setLoggedUserDTO}
          setCloseMenu={setCloseMenu}
        />
      ) : null}
      <ServiceProfileCard loggedUserDTO={loggedUserDTO} setCloseMenu={setCloseMenu} />
    </div>
  );
}
