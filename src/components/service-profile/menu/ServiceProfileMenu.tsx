import "@styles/components/service-profile/ServiceProfileMenu.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import EditAvailability from "./options/EditAvailability";
import EditDescription from "./options/EditDescription";
import EditLocation from "./options/EditLocation";
import EditImage from "./options/EditImage";

import specialty from "@assets/service-profile-options/specialty.png";
import availability from "@assets/service-profile-options/availability.png";
import description from "@assets/service-profile-options/description.png";
import location from "@assets/service-profile-options/location.png";
import image from "@assets/service-profile-options/image.png";

import ROUTES from "@routes";

import { IUserDTO } from "@interfaces/IUser";

interface ServiceProfileMenuProps {
  loggedUserDTO: IUserDTO | null;
  setLoggedUserDTO: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
}

export default function ServiceProfileMenu({
  loggedUserDTO,
  setLoggedUserDTO,
}: ServiceProfileMenuProps) {
  const navigate = useNavigate();

  const [choosedOption, setChoosedOption] = useState<string | null>(null);

  useEffect(() => {
    if (choosedOption === "edit-specialty") {
      navigate(ROUTES.UpdateServiceProfileSpecialty);
    }
  }, [choosedOption, navigate]);

  const renderOptionComponent = () => {
    switch (choosedOption) {
      case "edit-availability":
        return (
          <EditAvailability
            loggedUserDTO={loggedUserDTO}
            setLoggedUserDTO={setLoggedUserDTO}
            setChoosedOption={setChoosedOption}
          />
        );
      case "edit-description":
        return (
          <EditDescription
            loggedUserDTO={loggedUserDTO}
            setLoggedUserDTO={setLoggedUserDTO}
            setChoosedOption={setChoosedOption}
          />
        );
      case "edit-location":
        return (
          <EditLocation
            loggedUserDTO={loggedUserDTO}
            setLoggedUserDTO={setLoggedUserDTO}
            setChoosedOption={setChoosedOption}
          />
        );
      case "edit-image":
        return (
          <EditImage
            loggedUserDTO={loggedUserDTO}
            setLoggedUserDTO={setLoggedUserDTO}
            setChoosedOption={setChoosedOption}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="service-profile-menu-container">
      {choosedOption ? (
        renderOptionComponent()
      ) : (
        <div className="menu-options">
          <div className="menu-other-options">
            <h2>Menu</h2>
            <Link to={ROUTES.Home} className="link">
              <span>Página Inicial</span>
            </Link>
            <button>Serviços Realizados</button>
            <button>Chat</button>
          </div>
          <div className="menu-edit-options">
            {/* <h2>Editar</h2> */}
            <button onClick={() => setChoosedOption("edit-specialty")}>
              <img src={specialty} />
              <span>Editar Especialidade</span>
            </button>

            <button onClick={() => setChoosedOption("edit-availability")}>
              <img src={availability} />
              <span>Editar Disponibilidade</span>
            </button>

            <button onClick={() => setChoosedOption("edit-description")}>
              <img src={description} />
              <span>Editar Descrição</span>
            </button>

            <button onClick={() => setChoosedOption("edit-location")}>
              <img src={location} />
              <span>Editar Localização</span>
            </button>

            <button onClick={() => setChoosedOption("edit-image")}>
              <img src={image} />
              <span>Editar Imagem</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
