import "./styles/App.css";

import Cards from "./components/Cards";

import { createUsersTest } from "../public/backend/services/generateUsersTest";
import { useUsers } from "./contexts/UsersContext";
import { useEffect } from "react";
import { User, UserDTO } from "./interfaces/User";
import { useUsersDTO } from "./contexts/UsersDTOContext";
import Chat from "./components/Chat";

const App = () => {
  const { setUsers } = useUsers();
  const { setUsersDTO } = useUsersDTO();

  const createUsersDTO = (users: Record<string, User>): Record<string, UserDTO> => {
    const usersDTO: Record<string, UserDTO> = {};

    for (const [id, user] of Object.entries(users)) {
      const { password, ...userWithoutPassword } = user;
      usersDTO[id] = userWithoutPassword;
    }

    return usersDTO;
  };

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
