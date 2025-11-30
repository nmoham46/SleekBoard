export const ROLES = {
  PRODUCT_OWNER: "Product Owner",
  SCRUM_MASTER: "Scrum Master",
  TEAM_MEMBER: "Team Member",
};

const ROLE_KEY = "sleekboard_user_role";
const DEFAULT_ROLE = ROLES.PRODUCT_OWNER;

export const ROLE_CHANGED_EVENT = "sleekboard-role-changed";

let currentRole;

if (typeof window !== "undefined") {
  currentRole = window.localStorage.getItem(ROLE_KEY) || DEFAULT_ROLE;
} else {
  currentRole = DEFAULT_ROLE;
}

export const getCurrentRole = () => currentRole;

export const setCurrentRole = (role) => {
  currentRole = role;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ROLE_KEY, role);

    
    window.dispatchEvent(new Event(ROLE_CHANGED_EVENT));
  }
};

export const isProductOwner = () => currentRole === ROLES.PRODUCT_OWNER;
