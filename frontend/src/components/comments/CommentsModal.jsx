import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

import {
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton
} from '@material-tailwind/react';


const dummyComments = [
  {
    _id: 1,
    userStoryId: 0,
    commentText: "Hello there my name is karim",
    commentedBy: "Karim Omar"
  },
  {
    _id: 2,
    userStoryId: 0,
    commentText: "This looks great! I think we should prioritize this feature.",
    commentedBy: "Sarah Johnson"
  },
  {
    _id: 3,
    userStoryId: 0,
    commentText: "I have some concerns about the implementation. Can we discuss this in the next meeting?",
    commentedBy: "Michael Chen"
  },
  {
    _id: 4,
    userStoryId: 0,
    commentText: "Update: I've completed the initial implementation. Ready for testing.",
    commentedBy: "Karim Omar"
  },
]

const CommentsModal = (props) => {
  const {
    isCommentOpen,
    handleCommentOpen,
    selectedStoryComments
  } = props

  // --------------------------------------------------
  
  const [newComment, setNewComment] = useState("")
  
  // --------------------------------------------------

  const handleNewCommentChange = (e) => {
    e.preventDefault()

    const newCommentValue = e.target.value
    setNewComment(newCommentValue)
  }

  const submitNewComment = () => {}


  return (
    <Dialog size='lg' 
            open={isCommentOpen} 
            handler={handleCommentOpen} 
            dismiss={{
              outsidePress: false
            }} 
            className="p-2 md:p-8">

      <DialogHeader className='flex justify-between'>
        <h4 className='text-h4 md:text-h2'>
          Comments
        </h4>

        <IconButton size='sm' variant='text' onClick={handleCommentOpen}>
          <IoClose className='text-h4'/>
        </IconButton>
      </DialogHeader>

      <DialogBody>
        <div className="flex flex-col gap-4 overflow-auto h-[15rem] p-2">
          {dummyComments.map(({ _id, commentText, commentedBy }) => (
            <div key={_id} 
                 className="flex flex-col text-tPrimary font-primary gap-4 shadow-border rounded p-4">

              <div className="border-b-2 border-tertiary pb-1">
                <h4>By: {commentedBy}</h4>
              </div>

              <p>{commentText}</p>
            </div>
          ))}
        </div>
      </DialogBody>

      <DialogFooter className='gap-4 justify-start'>
        <Textarea
          label="Comment"
          variant="outlined"
          rows={4}
          value={newComment}
          onChange={handleNewCommentChange} 
          className=''/>

        <Button onClick={submitNewComment}> Add new comment </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default CommentsModal