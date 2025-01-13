import "./styles/App.css";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import MatchAndChat from "./components/match-and-chat/MatchAndChat";

import { User } from "../interfaces/User";
import { useUsers } from "./contexts/UsersContext";
import { useUsersDTO } from "./contexts/UsersDTOContext";

import { getUsers, createUsersDTO } from "../backend/services/userServices";
import { createFakeUsers } from "../backend/fake-users/generateFakeUsers";
import ChooseCategory from "./components/create-service-profile/ChooseCategory";
import Details from "./components/create-service-profile/Details";

const App = () => {
  const { setUsers } = useUsers();
  const { setUsersDTO } = useUsersDTO();

  // Fetch fake users if there are no users in the database
  const fetchFakeUsers = async () => {
    const fakeUsers: Record<string, User> = await createFakeUsers();
    setUsers(fakeUsers);
    setUsersDTO(createUsersDTO(fakeUsers));
  };

  // Initialize users from the database
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-service-profile">
          <Route path="categories" element={<ChooseCategory />} />
          <Route path="details" element={<Details />} />
        </Route>
        <Route path="match-and-chat" element={<MatchAndChat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
