import "@styles/components/home/Home.css";

import HomeMenu from "./menu/HomeMenu";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <div className="home-container">
      <HomeMenu />
      <HomeContent />
    </div>
  );
}
