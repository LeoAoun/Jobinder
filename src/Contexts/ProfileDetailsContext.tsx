import { createContext, useContext, useState, ReactNode } from "react";
import { UserDTO } from "../../interfaces/User";

interface ProfileDetailsContextType {
  profileDetails: UserDTO | null;
  setProfileDetails: React.Dispatch<React.SetStateAction<UserDTO | null>>;
}

const ProfileDetailsContext = createContext<ProfileDetailsContextType | undefined>(undefined);

export const ProfileDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [profileDetails, setProfileDetails] = useState<UserDTO | null>(null);

  return (
    <ProfileDetailsContext.Provider value={{ profileDetails, setProfileDetails }}>
      {children}
    </ProfileDetailsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfileDetails = () => {
  const context = useContext(ProfileDetailsContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
