import { createUserStory, updateUserStory } from '@/services/apis/UserStories';
import { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

import {
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton
} from '@material-tailwind/react';

import { IoClose } from "react-icons/io5";

const fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34, 55];
const statusOptions = ['Todo', 'In-Review', 'Sprint-Ready'];

export default function UserStoryForm(props) {
  const { 
    isFormOpen, 
    handleFormOpen, 
    isEditing, 
    initUserStories,
    selectedStory,
    viewOnly 
  } = props;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: statusOptions[0],
    businessValue: 1,
    storyPoint: fibonacciSequence[0]
  });

  const [errors, setErrors] = useState({});
  const toast = useToast();
  // --------------------------------------------

  const handleChange = (field) => (event) => {
    let value = event?.target?.value ?? '';

    // FIX negative business value
    if (field === "businessValue") {
      if (Number(value) < 1) value = 1;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSelectChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.storyPoint) newErrors.storyPoint = "Story Point is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (viewOnly) return;

    if (!validateForm()) return;

    try {
      isEditing ? await updateUserStory(selectedStory._id, formData) : await createUserStory(formData);  
      await initUserStories()
      resetAndCloseModal()
      
      toast.success(`User story ${isEditing ? "updated" : "created"} successfully!`);
    } 
    catch (err) {
      console.error(err);
      toast.error(`Failed to ${ isEditing ? "update" : "create"} user story.`);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      status: statusOptions[0],
      businessValue: 1,
      storyPoint: fibonacciSequence[0]
    });
    setErrors({});
  };

  const resetAndCloseModal = () => {
    handleReset();
    handleFormOpen();
  };

  useEffect(() => {
    if (!isFormOpen) return;

    if (selectedStory) {
      setFormData({
        title: selectedStory.title ?? '',
        description: selectedStory.description ?? '',
        status: selectedStory.status ?? statusOptions[0],
        businessValue: Number(selectedStory.businessValue) ?? 1,
        storyPoint: Number(selectedStory.storyPoint) ?? fibonacciSequence[0]
      });
    }
  }, [selectedStory, isEditing, viewOnly, isFormOpen]);


  return (
    <Dialog size="lg" open={isFormOpen} handler={handleFormOpen} dismiss={{ outsidePress: false }} className="p-2 md:p-8">
      <DialogHeader className="flex justify-between">
        <h4 className="text-h4 md:text-h2">
          {viewOnly ? "View" : isEditing ? "Edit" : "Create"} User Story
        </h4>

        <IconButton size="sm" variant="text" onClick={resetAndCloseModal}>
          <IoClose className="text-h4" />
        </IconButton>
      </DialogHeader>

      <DialogBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="md:col-span-3">
              <Input label="Title" variant="outlined" value={formData.title} onChange={handleChange("title")} required readOnly={viewOnly} />
            </div>

            <div className="md:col-span-3">
              <Textarea label="Description" variant="outlined" rows={4} value={formData.description} onChange={handleChange("description")} required readOnly={viewOnly} />
            </div>

            <div>
              {viewOnly ? (
                <Input label="Status" variant="outlined" value={formData.status} readOnly/>
              ) : (
                <Select label="Status" value={formData.status} onChange={handleSelectChange("status")} required>
                  {statusOptions.map((option) => (<Option key={option} value={option}>{option}</Option>))}
                </Select>
              )}
            </div>

            <div>
              <Input label="Business Points" variant="outlined" type="number" value={formData.businessValue} onChange={handleChange("businessValue")} required readOnly={viewOnly} />
            </div>

            <div>
              {viewOnly ? (
                <Input label="Story Point" variant="outlined" value={String(formData.storyPoint)}readOnly/>
              ) : (
                <Select label="Story Point" value={String(formData.storyPoint)} onChange={handleSelectChange("storyPoint")} required>
                  {fibonacciSequence.map((point) => ( <Option key={point} value={String(point)}> {point}</Option>))}
                </Select>
              )}
            </div>

            {!viewOnly && (
              <div className="gap-4 flex flex-col sm:flex-row md:col-span-3">
                <Button type="submit">{isEditing ? "Update" : "Create"} User Story</Button>
                <Button variant="outlined" onClick={handleReset}>Reset</Button>
              </div>
            )}

          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
