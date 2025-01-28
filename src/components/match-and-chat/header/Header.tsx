import "@styles/components/match-and-chat/Header.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FuseResult } from "fuse.js";

import logo from "@assets/logo.png";
import map from "@assets/map.png";
import magnifyingGlass from "@assets/magnifying-glass.png";

import { IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";

import { fuse } from "@utils/CategoriesFuseJS";

import { getUserDTO } from "@services/userServices";

interface HeaderProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleApplyFilter: (selectedCategory: string) => void;
}

export default function Header({ searchValue, setSearchValue, handleApplyFilter }: HeaderProps) {
  const { loggedUserId } = useAuth();

  const [loggedUserDTO, setLoggedUserDTO] = useState<IUserDTO | null>(null);
  const [categoriesFound, setCategoriesFound] = useState<FuseResult<string>[]>([]);
  const [showLogo, setShowLogo] = useState<boolean>(true);

  // Fix the bug where the dropdown should disappear when clicking on a category
  const [specialtyClicked, setSpecialtyClicked] = useState<boolean>(false);

  // UseEffect to see the changes in viewport width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };

    // Call handleResize to set showLogo when the page is loaded
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setShowLogo]);

  // Fetch logged user DTO when component mounts
  useEffect(() => {
    const fetchLoggedUser = async () => {
      const user: IUserDTO | null = await getUserDTO(loggedUserId);
      setLoggedUserDTO(user);
    };

    fetchLoggedUser();
  }, [loggedUserId]);

  // Update categoriesFound when searchValue changes
  useEffect(() => {
    if (searchValue.trim() === "" || specialtyClicked) {
      setCategoriesFound([]);
      setSpecialtyClicked(false);
      return;
    }

    const result: FuseResult<string>[] = fuse.search(searchValue);

    // Limit the number of categories found to 7
    if (result.length > 7) result.splice(7);

    setCategoriesFound(result);
  }, [searchValue]);

  // Handle click on dropdown item
  const handleClick = (category: string) => {
    setSpecialtyClicked(true);
    setSearchValue(category);
    handleApplyFilter(category);
  };

  return (
    <nav className="match-and-chat-header">
      {showLogo ? (
        <Link to="/home">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      ) : null}

      <div className="search-and-map">
        <div
          className="search-box"
          style={{ borderRadius: categoriesFound.length > 0 ? "0.5rem 0.5rem 0 0" : "" }}
        >
          <input
            type="text"
            placeholder="Procurar por serviço"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <img src={magnifyingGlass} alt="Magnifying Glass" />
          {categoriesFound.length > 0 && (
            <ul className="dropdown">
              {categoriesFound.map((category: FuseResult<string>, index) => (
                <li key={index} onClick={() => handleClick(category.item)}>
                  {category.item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="map">
          <img src={map} />
        </button>
      </div>
      <span className="greeting-logged-user">
        Olá, {loggedUserId === "-1" ? "Visitante" : loggedUserDTO?.fullName.split(" ")[0]}!
      </span>
    </nav>
  );
}
