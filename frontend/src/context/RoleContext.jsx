import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentRole, setCurrentRole, ROLES } from "../../utils/roles";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(getCurrentRole());

  const changeRole = (newRole) => {
    setRole(newRole);
    setCurrentRole(newRole);
  };

  useEffect(() => {
    setRole(getCurrentRole());
  }, []);

  return (
    <RoleContext.Provider value={{ role, changeRole, ROLES }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
