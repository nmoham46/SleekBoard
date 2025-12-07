import CommentsModal from "@/components/comments/CommentsModal";
import UserStoryForm from "@/components/user-stories/UserStoryForm";
import ExportToJiraForm from "@/components/user-stories/ExportToJiraForm";

import { useState, useEffect } from "react";
import { useLoader } from "@/context/LoaderContext"
import { useToast } from '@/context/ToastContext';

import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

import { fetchAllUserStories, deleteUserStory } from "@/services/apis/UserStories";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserStories = () => {
  const toast = useToast();
  const {
    startGlobalLoading,
    stopGlobalLoading
  } = useLoader()

  // ------------------------------------------------------

  const [stories, setStories] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [viewOnly, setViewOnly] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null)

  // Comments modal state
  // Used for comments opened and process the rest in comment modal
  const [isCommentOpen, setIsCommentOpen] = useState(false); 
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [jiraJson, setJiraJson] = useState("");
  
  // ------------------------------------------------------

  const handleFormOpen = () => setIsFormOpen(!isFormOpen)
  const handleCommentOpen = () => setIsCommentOpen(!isCommentOpen)

  const handleCreateClick = () => {
    setIsEditing(false);
    setViewOnly(false);
    setSelectedStory(null);
    handleFormOpen();
  };

  const handleEditClick = (storyData) => {
    setIsEditing(true);
    setViewOnly(false);
    setSelectedStory(storyData);
    handleFormOpen();
  };

  const handleViewClick = (storyData) => {
    setIsEditing(false);
    setViewOnly(true);
    setSelectedStory(storyData);
    handleFormOpen();
  };

  const handleCommentClick = async (id) => {
    handleCommentOpen()
    setSelectedStoryId(id);
  };

  const handleExportClick = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/exports/jira`);
      if (!response.ok) {
        console.error("Failed to fetch Jira export JSON");
        toast.error("Error fetching Jira export JSON");
        return;
      }
      const data = await response.json();
      const prettyJson = JSON.stringify(data, null, 2);
      setJiraJson(prettyJson);
      setIsExportOpen(true);
    } catch (error) {
      console.error("Error fetching Jira export JSON:", error);
      toast.error("Error fetching Jira export JSON");
    }
  };

  const initUserStories = async () => {
    try {
      startGlobalLoading()

      const userStories = await fetchAllUserStories()
      setStories(userStories)
    }
    catch (error) {
      console.error(error)
      toast.error("Error Fetching User Stories")
    }
    finally {
      stopGlobalLoading()
    }
  }

  const deleteStory = async (id) => {
    try {
      startGlobalLoading()

      await deleteUserStory(id)
      await initUserStories()
      toast.success("User Story Deleted Successfully")
    }
    catch (error) {
      console.error(error)
      toast.error("Error Deleting User Story")
    }
    finally {
      stopGlobalLoading()
    }
  }

  // ------------------------------------------------------

  useEffect(() => {
    initUserStories();
  }, []);

  return (
    <main>
      <div className="container w-full">
        <div className="flex justify-center mt-[10rem]">
          <div className="flex flex-col w-full max-w-2xl">
            <h4 className="text-h1 font-semibold mb-8 text-center">User Stories</h4>

            <div className="flex items-center self-center gap-3 mb-6 md:self-start">
              <Button
                onClick={handleCreateClick}
                className="flex items-center gap-3"
              >
                Create
                <IoMdAdd className="text-h6" />
              </Button>
              <Button
                onClick={handleExportClick}
                className="flex items-center gap-3"
              >
                Export to Jira
              </Button>
            </div>

            {stories.length ? (
              <div className="flex flex-col gap-5 h-[30rem] overflow-auto md:h-[20rem]">
                {stories.map((storyData) => (
                  <div key={storyData._id} className="bg-tertiary rounded flex flex-col gap-6 w-full py-4 px-6 sm:grid sm:grid-cols-4">
                    <div className="text-center sm:text-start sm:col-span-3">
                      <span>{storyData.title}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 justify-self-end">

                      <FaEye className="cursor-pointer" onClick={() => handleViewClick(storyData)} />


                      <FaPencilAlt className="cursor-pointer"
                        onClick={() => handleEditClick(storyData)} />

                      <BiSolidCommentDetail className="cursor-pointer text-h6"
                        onClick={() => handleCommentClick(storyData._id)} />

                      <FaTrashAlt className="text-red-500 cursor-pointer"
                        onClick={() => deleteStory(storyData._id)} />

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="text-center text-h4 border-2 border-info rounded p-4">No User Stories Available...</h4>
            )}
          </div>
        </div>
      </div>


      <CommentsModal isCommentOpen={isCommentOpen}
        handleCommentOpen={handleCommentOpen}
        userStoryId={selectedStoryId}
        currentUserName="Developer" />

      <UserStoryForm isFormOpen={isFormOpen}
        handleFormOpen={handleFormOpen}
        isEditing={isEditing}
        initUserStories={initUserStories}
        viewOnly={viewOnly}
        selectedStory={selectedStory} />

      <Dialog open={isExportOpen} handler={setIsExportOpen} size="lg">
        <DialogHeader>Export to Jira</DialogHeader>
        <DialogBody divider>
          <ExportToJiraForm jsonText={jiraJson} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setIsExportOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </main>
  );
};

export default UserStories;