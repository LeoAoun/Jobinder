import "@styles/components/match-and-chat/MatchAndChat.css";

import Cards from "./cards/Cards";
import Chat from "./chat/Chat";
import ProfileDetailsModal from "../profile-details/ProfileDetailsModal";

import { useProfileDetails } from "@contexts/ProfileDetailsContext";
import Header from "./header/Header";

export default function MatchAndChat() {
  const { profileDetails } = useProfileDetails();

  return (
    <div className="match-and-chat-container">
      <div className="match-container">
        <Header />
        <Cards />
      </div>
      <Chat />
      {profileDetails ? <ProfileDetailsModal /> : null}
    </div>
  );
}
