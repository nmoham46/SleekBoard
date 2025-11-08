import { useState } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import { Button } from "@material-tailwind/react";

const UserStories = () => {
  const [stories, setStories] = useState([])


  return (
    <main>
      <div className="container w-full">
        <div className="flex justify-center mt-[10rem]">
          <div className="flex flex-col w-full max-w-2xl">
            <h4 className="text-h1 font-semibold mb-8 text-center">User Stories</h4>

            <Button className="flex items-center self-start gap-3 mb-6"> 
              Create
              <IoMdAdd className="text-h6"/>
            </Button>

            <div className="bg-tertiary rounded grid grid-cols-4 w-full py-4 px-6">
              <div className="col-span-3">
                <span className="text-accent">#ID </span>
                <span> Lorem ipsum dolor </span>
              </div>

              <div className="flex items-center gap-4 justify-self-end">
                <FaPencilAlt className=""/>
                <FaTrashAlt className="text-red-500"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserStories