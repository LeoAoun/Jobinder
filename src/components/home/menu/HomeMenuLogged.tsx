import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import noServiceImg from "@assets/no-service-img.webp";

import { IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";

import { getUserDTO } from "@services/userServices";

export default function HomeMenuLogged() {
  const { loggedUserId, setLoggedUserId } = useAuth();

  const [loggedUserHasServiceProfile, setLoggedUserHasServiceProfile] = useState<boolean>(false);
  const [loggedUserDTO, setLoggedUserDTO] = useState<IUserDTO | null>(null);

  // Fetch logged user DTO when component mounts
  useEffect(() => {
    const fetchLoggedUser = async () => {
      const user: IUserDTO | null = await getUserDTO(loggedUserId);
      setLoggedUserDTO(user);

      if (user?.serviceProfile && user.serviceProfile.description) {
        setLoggedUserHasServiceProfile(true);
      }
    };

    fetchLoggedUser();
  }, [loggedUserId]);

  const handleExitLogin = () => {
    setLoggedUserId("-1");
  };

  return (
    <div className="menu-logged">
      {loggedUserHasServiceProfile ? (
        <Link className="service-profile" to="/service-profile">
          <span>PERFIL</span>
        </Link>
      ) : (
        <Link className="create-service-profile" to="/create-service-profile/categories">
          <span>CRIAR PERFIL</span>
        </Link>
      )}
      <span className="exit-login" onClick={handleExitLogin}>
        SAIR
      </span>
      <div className="menu-logged-user">
        <img
          className="menu-logged-user-img"
          src={
            loggedUserHasServiceProfile && loggedUserDTO?.serviceProfile
              ? loggedUserDTO.serviceProfile.serviceImg
              : noServiceImg
          }
        />
        <span>{loggedUserDTO?.fullName.split(" ")[0]}</span>
      </div>
    </div>
  );
}
