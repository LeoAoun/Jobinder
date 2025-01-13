import "@styles/components/home/HomeMenu.css";

import { useAuth } from "@contexts/AuthContext";
import HomeMenuLogged from "./HomeMenuLogged";
import logo from "@assets/logo.png";
import HomeMenuNotLogged from "./HomeMenuNotLogged";

export default function HomeMenu() {
  const { loggedUserId } = useAuth();

  return (
    <div className="menu-container">
      <img className="logo" src={logo} />
      {loggedUserId !== "-1" ? <HomeMenuLogged /> : <HomeMenuNotLogged />}
    </div>
  );
}
