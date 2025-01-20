import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import noServiceImg from "@assets/no-service-img.webp";

import { IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";

import { getUserDTO } from "@services/userServices";

export default function HomeMenuLogged() {
  const { loggedUserId, setLoggedUserId } = useAuth();

  const [loggedUserDTO, setLoggedUserDTO] = useState<IUserDTO | null>(null);

  // Fetch logged user DTO when component mounts
  useEffect(() => {
    const fetchLoggedUser = async () => {
      const user: IUserDTO | null = await getUserDTO(loggedUserId);
      setLoggedUserDTO(user);
    };

    fetchLoggedUser();
  }, [loggedUserId]);

  const handleExitLogin = () => {
    setLoggedUserId("-1");
  };

  return (
    <div className="menu-logged">
      {loggedUserDTO?.serviceProfile ? (
        <Link className="service-profile" to="/service-profile">
          <span>PERFIL DE SERVIÇOS</span>
        </Link>
      ) : (
        <Link className="create-service-profile" to="/create-service-profile/categories">
          <span>CRIAR PERFIL DE SERVIÇOS</span>
        </Link>
      )}
      <span className="exit-login" onClick={handleExitLogin}>
        SAIR
      </span>
      <div className="menu-logged-user">
        <img
          className="menu-logged-user-img"
          src={
            loggedUserDTO?.serviceProfile ? loggedUserDTO?.serviceProfile.serviceImg : noServiceImg
          }
        />
        <span>{loggedUserDTO?.fullName.split(" ")[0]}</span>
      </div>
    </div>
  );
}
