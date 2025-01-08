import "./styles/App.css";
import { useEffect } from "react";

import Cards from "./components/Cards";
import Chat from "./components/Chat";

import { User } from "./interfaces/User";
import { useUsers } from "./contexts/UsersContext";
import { useUsersDTO } from "./contexts/UsersDTOContext";

import { createUsersTest } from "../backend/services/generateUsersTest";
import { createUsersDTO } from "../backend/services/userServices";

const App = () => {
  const { setUsers } = useUsers();
  const { setUsersDTO } = useUsersDTO();

  const fetchUsersTest = async () => {
    const usersFetched: Record<string, User> = await createUsersTest();
    setUsers(usersFetched);

    const usersDTO = createUsersDTO(usersFetched);
    setUsersDTO(usersDTO);
  };

  useEffect(() => {
    fetchUsersTest();
  }, []);

  return (
    <div className="app">
      <div className="match-container">
        <Cards />
      </div>
      <Chat />
    </div>
  );
};

export default App;
