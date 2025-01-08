import "./styles/App.css";
import { useEffect } from "react";

import Cards from "./components/cards/Cards";
import Chat from "./components/chat/Chat";

import { User } from "./interfaces/User";
import { useUsers } from "./contexts/UsersContext";
import { useUsersDTO } from "./contexts/UsersDTOContext";

import { getUsers, createUsersDTO } from "../backend/services/userServices";
import { createFakeUsers } from "../backend/fake-users/generateFakeUsers";

import ProfileDetailsModal from "./components/ProfileDetailsModal";

const App = () => {
  const { setUsers } = useUsers();
  const { setUsersDTO } = useUsersDTO();

  const fetchFakeUsers = async () => {
    const fakeUsers: Record<string, User> = await createFakeUsers();
    setUsers(fakeUsers);
    setUsersDTO(createUsersDTO(fakeUsers));
  };

  useEffect(() => {
    const initializeUsers = async () => {
      const usersInDB = await getUsers();

      if (Object.keys(usersInDB).length > 0) {
        setUsers(usersInDB);
        setUsersDTO(createUsersDTO(usersInDB));
      } else {
        await fetchFakeUsers();
      }
    };

    initializeUsers();
  }, []);

  return (
    <div className="app">
      <div className="match-container">
        <Cards />
      </div>
      <Chat />
      <ProfileDetailsModal />
    </div>
  );
};

export default App;
