import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

import {
  Input,
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton
} from '@material-tailwind/react';


const CommentsModal = (props) => {
  const {
    isCommentOpen,
    handleCommentOpen,
    selectedStoryComments
  } = props

  // --------------------------------------------------
  
  const [newComment, setNewComment] = useState(null)
  
  // --------------------------------------------------

  const handleNewCommentChange = (e) => {
    e.preventDefault()


  }

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
        
      </DialogBody>

      <DialogFooter className='gap-4 justify-start'>
        <Textarea
          label="Comment"
          variant="outlined"
          rows={4}
          value={newComment}
          onChange={handleNewCommentChange} />

        <Button> Add new comment </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default CommentsModal