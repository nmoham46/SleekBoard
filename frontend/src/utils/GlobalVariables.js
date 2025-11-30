export const ROLES = {
  PRODUCT_OWNER: "Product Owner",
  SCRUM_MASTER: "Scrum Master",
  TEAM_MEMBER: "Team Member",
};

const ROLE_KEY = "sleekboard_user_role";
export const ROLE_CHANGED_EVENT = "sleekboard-role-changed";

const DEFAULT_ROLE = ROLES.PRODUCT_OWNER;

// Always fetch latest from localStorage
export const getCurrentRole = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(ROLE_KEY) || DEFAULT_ROLE;
  }
  return DEFAULT_ROLE;
};

export const setCurrentRole = (role) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ROLE_KEY, role);
    window.dispatchEvent(new Event(ROLE_CHANGED_EVENT));
  }
};

// Check role dynamically each time
export const isProductOwner = () => {
  const currentRole = getCurrentRole();
  return currentRole === ROLES.PRODUCT_OWNER;
};
