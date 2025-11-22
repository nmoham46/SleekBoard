import { useState, useEffect } from "react";

import CommentsModal from "@/components/comments/CommentsModal";
import UserStoryForm from "@/components/user-stories/UserStoryForm";

import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Button } from "@material-tailwind/react";

import {
  fetchAllUserStories,
  deleteUserStory,
  getUserStoryByID,
} from "@/services/apis/UserStories";

const UserStories = () => {
  const [stories, setStories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  // Comments modal state
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [selectedStoryComments, setSelectedStoryComments] = useState([]);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  // ------------------------------------------------------
  // Handlers for form modal
  // ------------------------------------------------------

  const handleFormOpen = () => setIsFormOpen((prev) => !prev);
  const handleCommentOpen = () => setIsCommentOpen((prev) => !prev);

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

  // ------------------------------------------------------
  // Comments
  // ------------------------------------------------------

  const handleCommentClick = async (storyData) => {
    try {
      setIsCommentOpen(true);
      setSelectedStoryId(storyData._id);
      setSelectedStoryComments([]);
      setIsCommentsLoading(true);

      const fullStory = await getUserStoryByID(storyData._id);
      // Expect fullStory.comments to be an array of populated comment objects
      setSelectedStoryComments(fullStory?.comments || []);
    } catch (error) {
      console.error("Error fetching story for comments:", error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  // ------------------------------------------------------
  // User stories CRUD
  // ------------------------------------------------------

  const initUserStories = async () => {
    try {
      const userStories = await fetchAllUserStories();
      setStories(userStories || []);
    } catch (error) {
      console.error("Error fetching user stories:", error);
    }
  };

  const deleteStory = async (id) => {
    try {
      await deleteUserStory(id);
      await initUserStories();
    } catch (error) {
      console.error("Error deleting user story:", error);
    }
  };

  useEffect(() => {
    initUserStories();
  }, []);

  // ------------------------------------------------------
  // Render
  // ------------------------------------------------------

  return (
    <main>
      <div className="container w-full">
        <div className="flex justify-center mt-[10rem]">
          <div className="flex flex-col w-full max-w-2xl">
            <h4 className="text-h1 font-semibold mb-8 text-center">
              User Stories
            </h4>

            <Button
              onClick={handleCreateClick}
              className="flex items-center self-center gap-3 mb-6 md:self-start"
            >
              Create
              <IoMdAdd className="text-h6" />
            </Button>

            {stories.length ? (
              <div className="flex flex-col gap-5 h-[30rem] overflow-auto md:h-[20rem]">
                {stories.map((storyData) => (
                  <div
                    key={storyData._id}
                    className="bg-tertiary rounded flex flex-col gap-6 w-full py-4 px-6 sm:grid sm:grid-cols-4"
                  >
                    <div className="text-center sm:text-start sm:col-span-3">
                      <span>{storyData.title}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 justify-self-end">
                      <FaEye
                        className="cursor-pointer"
                        onClick={() => handleViewClick(storyData)}
                      />

                      <FaPencilAlt
                        className="cursor-pointer"
                        onClick={() => handleEditClick(storyData)}
                      />

                      <BiSolidCommentDetail
                        className="cursor-pointer text-h6"
                        onClick={() => handleCommentClick(storyData)}
                      />

                      <FaTrashAlt
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteStory(storyData._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="text-center text-h4 border-2 border-info rounded p-4">
                No User Stories Available...
              </h4>
            )}
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <CommentsModal
        isCommentOpen={isCommentOpen}
        handleCommentOpen={handleCommentOpen}
        selectedStoryComments={selectedStoryComments}
        userStoryId={selectedStoryId}
        currentUserName="Developer"
        isCommentsLoading={isCommentsLoading} // if you want to show spinner inside modal, otherwise ignore in component
      />

      {/* User Story Form */}
      <UserStoryForm
        isFormOpen={isFormOpen}
        handleFormOpen={handleFormOpen}
        isEditing={isEditing}
        initUserStories={initUserStories}
        viewOnly={viewOnly}
        selectedStory={selectedStory}
      />
    </main>
  );
};

export default UserStories;
