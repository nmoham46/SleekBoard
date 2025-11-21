import UserStoryForm from "@/components/user-stories/UserStoryForm";

import { useState, useEffect } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { useToast } from '@/context/ToastContext';

import { 
  fetchAllUserStories,
  deleteUserStory
} from "@/services/apis/UserStories"


const UserStories = () => {
  const [stories, setStories] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)
  const toast = useToast();


  // ------------------------------------------------------
  
  const handleFormOpen = () => setIsFormOpen(!isFormOpen)

  const handleCreateClick = () => {
    setIsEditing(false)
    handleFormOpen()
  }

  const handleEditClick = (storyData) => {
    setIsEditing(true)
    setSelectedStory(storyData)
    handleFormOpen()
  }

  const initUserStories = async () => {
    try {
      const userStories = await fetchAllUserStories()
      setStories(userStories)
    }
    catch (error) {
      console.error(error)
    }
  }

  const deleteStory = async (id) => {
    try {
      await deleteUserStory(id)
      await initUserStories()
      toast.success("User Story Deleted Successfully")
    }
    catch (error) {
      console.error(error)
    }
  }

  // ------------------------------------------------------

  useEffect(() => {
    initUserStories()
  }, [])

  // ------------------------------------------------------

  return (
    <main>
      <div className="container w-full">
        <div className="flex justify-center mt-[10rem]">
          <div className="flex flex-col w-full max-w-2xl">
            <h4 className="text-h1 font-semibold mb-8 text-center">User Stories</h4>

            <Button onClick={handleCreateClick} 
                    className="flex items-center self-center gap-3 mb-6 md:self-start"> 
              Create
              <IoMdAdd className="text-h6"/>
            </Button>
            
            {stories.length ? (
              <div className="flex flex-col gap-5 h-[30rem] overflow-auto md:h-[20rem]">
                {stories.map((storyData) => (
                  <div key={storyData._id} className="bg-tertiary rounded flex flex-col gap-6 w-full py-4 px-6 sm:grid sm:grid-cols-4">
                    <div className="text-center sm:text-start sm:col-span-3">
                      <span> {storyData.title} </span>
                    </div>

                    <div className="flex items-center justify-center gap-4 justify-self-end">
                      <FaPencilAlt className="cursor-pointer" onClick={() => handleEditClick(storyData)}/>
                      <FaTrashAlt className="text-red-500 cursor-pointer" onClick={() => deleteStory(storyData._id)}/>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="text-center text-h4 border-2 border-info rounded p-4"> No User Stories Available... </h4>
            )}
          </div>
        </div>
      </div>

      <UserStoryForm isFormOpen={isFormOpen}
                     handleFormOpen={handleFormOpen}
                     isEditing={isEditing}
                     initUserStories={initUserStories}
                     selectedStory={selectedStory}/>
    </main>
  )
}

export default UserStories