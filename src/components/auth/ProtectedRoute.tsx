import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { IUserDTO } from "@interfaces/IUser";
import ROUTES from "@routes";

import { useAuth } from "@contexts/AuthContext";
import { getUserDTO } from "@services/userServices";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { loggedUserId } = useAuth();

  const [loggedUser, setLoggedUser] = useState<IUserDTO | null>(null);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!loggedUserId) {
        setLoggedUser(null);
        return;
      }
      const user = await getUserDTO(loggedUserId);
      setLoggedUser(user);
    };

    checkUserProfile();
  }, [loggedUserId]);

  if (loggedUser === undefined) {
    return null;
  }

  const userHasProfile =
    loggedUser && loggedUser.serviceProfile && Object.keys(loggedUser.serviceProfile).length >= 2;

  if (!userHasProfile) {
    return <Navigate to={ROUTES.CreateServiceProfileCategories} replace />;
  }

  return children;
};
