import { createContext, useContext, useState } from "react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/solid";

const UserRoleContext = createContext(null);

const profileMenuItems = [
  {
    label: "Product Owner",
    icon: UserCircleIcon,
  },
  {
    label: "Scrum Master",
    icon: CubeTransparentIcon,
  },
  {
    label: "Team Member",
    icon: CodeBracketSquareIcon,
  }
];


export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export const UserRoleProvider = ({ children }) => {
  const [userSelectedRole, setUserSelectedRole] = useState(profileMenuItems[0].label);

  return (
    <UserRoleContext.Provider value={{
      userSelectedRole,
      setUserSelectedRole,
      profileMenuItems
    }}>
      {children}
    </UserRoleContext.Provider>
  );
};

