import { createContext, useContext, useState } from "react";

const UserRoleContext = createContext(null);

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export const UserRoleProvider = ({ children }) => {
  const [userSelectedRole, setUserSelectedRole] = useState("Chose Role");

  return (
    <UserRoleContext.Provider value={{
      userSelectedRole,
      setUserSelectedRole
    }}>
      {children}
    </UserRoleContext.Provider>
  );
};

