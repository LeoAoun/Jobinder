import "@styles/components/create-service-profile/ChooseCategory.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Category from "./Category";

import logo from "@assets/logo.png";

import ROUTES from "@routes";
import { categories } from "@utils/Categories";

import { IServiceProfile, IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";

import { getUserDTO, updateUserServiceProfile } from "@services/userServices";

export default function EditSpecialty() {
  const { loggedUserId } = useAuth();
  const [loggedUserDTO, setLoggedUserDTO] = useState<IUserDTO | null>(null);

  const navigate = useNavigate();

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

  const [categoryChosen, setCategoryChosen] = useState<string | null>(null);

  const handleChooseCategory = (category: string) => {
    setCategoryChosen(category);
  };

  const handleSubmitChoose = () => {
    if (categoryChosen) {
      if (!loggedUserDTO) {
        return;
      }

      const updatedServiceProfile = loggedUserDTO.serviceProfile as IServiceProfile;
      const serviceProfile = { ...updatedServiceProfile, specialty: categoryChosen };

      updateUserServiceProfile(loggedUserId, serviceProfile);

      setTimeout(() => {
        navigate(ROUTES.ServiceProfile);
      }, 3000);

      toast.success("Categoria escolhida com sucesso");
    } else {
      toast.error("Escolha uma categoria para continuar");
    }
  };

  return (
    <div className="choose-category-container">
      <Link to={ROUTES.Home}>
        <img className="logo" src={logo} />
      </Link>

      <div className="categories-container">
        {categories.map((category: string) => (
          <Category
            key={category}
            category={category}
            categoryChosen={categoryChosen}
            onChooseCategory={handleChooseCategory}
          />
        ))}
      </div>

      <button className="choose-category" onClick={handleSubmitChoose}>
        Escolher
      </button>
    </div>
  );
}
