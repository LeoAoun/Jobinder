import "@styles/components/match-and-chat/MatchAndChat.css";

import Cards from "./cards/Cards";
import Chat from "./chat/Chat";
import ProfileDetailsModal from "../profile-details/ProfileDetailsModal";

import { useProfileDetails } from "@contexts/ProfileDetailsContext";
import Header from "./header/Header";
import { useState } from "react";
import { IUserDTO } from "@interfaces/IUser";

export default function MatchAndChat() {
  const { profileDetails } = useProfileDetails();

  const [profiles, setProfiles] = useState<IUserDTO[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterTerm, setFilterTerm] = useState<string>("");

  const handleApplyFilter = (selectedCategory: string) => {
    setFilterTerm(selectedCategory);
  };

  return (
    <div className="match-and-chat-container">
      <div className="match-container">
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleApplyFilter={handleApplyFilter}
        />
        <Cards profiles={profiles} setProfiles={setProfiles} filterTerm={filterTerm} />
      </div>
      <Chat />
      {profileDetails ? <ProfileDetailsModal /> : null}
    </div>
  );
}
