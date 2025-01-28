import "@styles/components/match-and-chat/MatchAndChat.css";

import Cards from "./cards/Cards";
import Chat from "./chat/Chat";
import ProfileDetailsModal from "../profile-details/ProfileDetailsModal";

import { useProfileDetails } from "@contexts/ProfileDetailsContext";
import Header from "./header/Header";
import { useEffect, useState } from "react";
import { IUserDTO } from "@interfaces/IUser";

export default function MatchAndChat() {
  const { profileDetails } = useProfileDetails();

  const [profiles, setProfiles] = useState<IUserDTO[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [closeChatContainer, setCloseChatContainer] = useState<boolean>(true);

  const handleApplyFilter = (selectedCategory: string) => {
    setFilterTerm(selectedCategory);
  };

  // UseEffect to see the changes in viewport width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setCloseChatContainer(false);
      } else {
        setCloseChatContainer(true);
      }
    };

    // Call handleResize to set closeChatContainer when the page is loaded
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setCloseChatContainer]);

  return (
    <div className="match-and-chat-container">
      <div className="match-container">
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleApplyFilter={handleApplyFilter}
        />
        <Cards profiles={profiles} setProfiles={setProfiles} filterTerm={filterTerm} />
        {closeChatContainer ? (
          <button className="open-chat" onClick={() => setCloseChatContainer(false)}>
            Conversas
          </button>
        ) : null}
      </div>
      {!closeChatContainer ? <Chat setCloseChatContainer={setCloseChatContainer} /> : null}
      {profileDetails ? <ProfileDetailsModal /> : null}
    </div>
  );
}
