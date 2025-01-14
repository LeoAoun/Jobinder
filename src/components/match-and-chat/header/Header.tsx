import "@styles/components/match-and-chat/Header.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FuseResult } from "fuse.js";

import logo from "@assets/logo.png";
import map from "@assets/map.png";
import magnifyingGlass from "@assets/magnifying-glass.png";

import { useAuth } from "@contexts/AuthContext";

import { fuse } from "@utils/CategoriesFuseJS";

export default function Header() {
  const { loggedUserId } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoriesFound, setCategoriesFound] = useState<FuseResult<string>[]>([]);

  // Update categoriesFound when searchValue changes
  useEffect(() => {
    if (searchValue.trim() === "") {
      setCategoriesFound([]);
      return;
    }

    const result: FuseResult<string>[] = fuse.search(searchValue);

    // Limit the number of categories found to 7
    if (result.length > 7) result.splice(7);

    setCategoriesFound(result);
  }, [searchValue]);

  return (
    <nav className="match-and-chat-header">
      <Link to="/home">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="search-and-map">
        <div
          className="search-box"
          style={{ borderRadius: categoriesFound.length > 0 ? "0.5rem 0.5rem 0 0" : "" }}
        >
          <input
            type="text"
            placeholder="Procurar por serviço"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // Atualiza searchValue
          />
          <img src={magnifyingGlass} alt="Magnifying Glass" />
          {categoriesFound.length > 0 && (
            <ul className="dropdown">
              {categoriesFound.map((category: FuseResult<string>, index) => (
                <li key={index}>{category.item}</li>
              ))}
            </ul>
          )}
        </div>
        <button className="map">
          <img src={map} />
        </button>
      </div>
      <span className="greeting-logged-user">Olá {loggedUserId === "-1" ? "Visitante" : ""}</span>
    </nav>
  );
}
