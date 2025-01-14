import "@styles/components/ServiceCategories.css";
import { Link } from "react-router-dom";

import logo from "@assets/logo.png";
import Category from "./Category";

import ROUTES from "@routes";
import { categories } from "@utils/Categories";

export default function ServiceCategories() {
  return (
    <div className="choose-category-container">
      <Link to={ROUTES.Home}>
        <img className="logo" src={logo} />
      </Link>

      <div className="categories-container">
        {categories.map((category: string) => (
          <Category key={category} category={category} />
        ))}
      </div>
    </div>
  );
}
