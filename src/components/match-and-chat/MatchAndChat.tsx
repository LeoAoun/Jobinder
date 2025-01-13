import "@styles/components/MatchAndChat.css";

import Cards from "./cards/Cards";
import Chat from "./chat/Chat";
import ProfileDetailsModal from "../profile-details/ProfileDetailsModal";

import { useProfileDetails } from "@contexts/ProfileDetailsContext";

export default function MatchAndChat() {
  const { profileDetails } = useProfileDetails();

  return (
    <div className="match-and-chat-container">
      <div className="match-container">
        <Cards />
      </div>
      <Chat />
      {profileDetails ? <ProfileDetailsModal /> : null}
    </div>
  );
}
