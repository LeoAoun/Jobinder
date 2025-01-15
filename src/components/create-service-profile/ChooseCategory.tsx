import "@styles/components/create-service-profile/ChooseCategory.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "@assets/logo.png";
import ROUTES from "@routes";
import Category from "./Category";

import { IServiceProfile } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";
import { categories } from "@utils/Categories";
import { updateUserServiceProfile } from "@services/userServices";

export default function ChooseCategory() {
  const { loggedUserId } = useAuth();
  const navigate = useNavigate();

  const [categoryChosen, setCategoryChosen] = useState<string | null>(null);

  const handleChooseCategory = (category: string) => {
    setCategoryChosen(category);
  };

  const handleSubmitChoose = () => {
    if (categoryChosen) {
      const serviceProfile: IServiceProfile = {
        specialty: categoryChosen,
        serviceImg: "",
        servicesPerformed: 0,
        rating: 0,
        availability: "",
        description: "",
        location: { city: "", state: "" },
      };

      updateUserServiceProfile(loggedUserId, serviceProfile);

      setTimeout(() => {
        navigate(ROUTES.CreateServiceProfileDetails);
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
