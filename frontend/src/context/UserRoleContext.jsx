import { createContext, useContext, useState, useMemo } from "react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/solid";

const UserRoleContext = createContext(null);

const roles = {
  productOwner: "Product Owner",
  scrumMaster: "Scrum Master",
  teamMember: "Team Member"
}

const profileMenuItems = [
  {
    label: roles.productOwner,
    icon: UserCircleIcon,
  },
  {
    label: roles.scrumMaster,
    icon: CubeTransparentIcon,
  },
  {
    label: roles.teamMember,
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
  const [userSelectedRole, setUserSelectedRole] = useState(roles.productOwner);

  const isProductOwner = useMemo(() => {
    return userSelectedRole === roles.productOwner
  }, [userSelectedRole])

  return (
    <UserRoleContext.Provider value={{
      userSelectedRole,
      setUserSelectedRole,
      profileMenuItems,
      isProductOwner
    }}>
      {children}
    </UserRoleContext.Provider>
  );
};

