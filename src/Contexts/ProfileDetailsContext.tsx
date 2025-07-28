import { createContext, useContext, useState, ReactNode } from "react";
import { IUserDTO } from "@interfaces/IUser";

interface ProfileDetailsContextType {
  profileDetails: IUserDTO | null;
  setProfileDetails: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
}

const ProfileDetailsContext = createContext<ProfileDetailsContextType | undefined>(undefined);

export const ProfileDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [profileDetails, setProfileDetails] = useState<IUserDTO | null>(null);

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
