import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useUserRole } from "@/context/UserRoleContext";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

 

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { userSelectedRole, setUserSelectedRole, profileMenuItems } = useUserRole();

  const handleMenuItemClick = (label) => {
    setUserSelectedRole(label);
    setIsMenuOpen(false);
  };
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center text-tPrimary gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Typography
            className="hidden lg:inline-flex lg:mr-2 normal-case"
          >
            {userSelectedRole}
          </Typography>

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1 text-tPrimary">
        {profileMenuItems.map(({ label, icon }, key) => {
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick(label)}
              className={`flex items-center gap-2 rounded`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={"inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
export function Navigationbar() {  
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          SleekBoard
        </Typography>
 
        <ProfileMenu />
      </div>
    </Navbar>
  );
}