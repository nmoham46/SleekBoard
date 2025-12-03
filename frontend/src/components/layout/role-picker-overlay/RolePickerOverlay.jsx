import { Card, CardBody,CardFooter } from "@material-tailwind/react";
import { useUserRole } from "@/context/UserRoleContext";
import { createElement, useState } from "react";

const RolePickerOverlay = () => {
  const { profileMenuItems, setUserSelectedRole } = useUserRole()
  const [isOverlayOn, setIsOverlayOn] = useState(true)

  const toggleOverlay = () => setIsOverlayOn(!isOverlayOn)

  const handleCardClick = (selectedRole) => {
    setUserSelectedRole(selectedRole)
    toggleOverlay()
  }

  return (
    isOverlayOn && (
      <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 flex justify-center items-center z-[99999]"> 
        <div className="container">
          <div className="grid grid-cols-3 justify-center items-center">
            {profileMenuItems.map(({ label, icon }) => (
              <Card key={label} onClick={() => handleCardClick(label)}
                    className="w-96 text-tPrimary font-primary items-center transition-transform duration-200 transform hover:scale-110 hover:bg-opacity-85 cursor-pointer">

                <CardBody className="flex flex-col items-center gap-4">
                  {createElement(icon, {
                    className: `w-14`,
                    strokeWidth: 2,
                  })}
  
                  <h4 className="text-h5">{label}</h4>
                </CardBody>
  
                <CardFooter>
                  <h6 className="text-info">Select Role</h6>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default RolePickerOverlay