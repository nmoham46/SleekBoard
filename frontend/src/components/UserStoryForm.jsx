import { createUserStory } from '../services/apis/userStories';
import { useState } from 'react';
import {
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Typography,
} from '@material-tailwind/react';

const fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34, 55];
const statusOptions = ['todo', 'in-review', 'spring-ready'];

export default function UserStoryForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    businessValue: 0,
    storyPoint: 0,
    assignTo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value = event?.target?.value ?? '' ;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSelectChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user selects
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (formData.businessValue !== '') {
      const bp = Number(formData.businessValue);
      if (isNaN(bp) || bp < 0 || bp > 100) {
        newErrors.businessValue = 'Business points must be between 0 and 100';
      }
    }

    if (!formData.storyPoint) {
      newErrors.storyPoint = 'Story points is required';
    }

    if (!formData.assignTo.trim()) {
      newErrors.assignTo = 'Assign to is required';
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const { isValid, errors: validationErrors } = validateForm();
  console.log('Validation result:', isValid, 'Errors:', validationErrors);

  if (!isValid) {
    const errorMessages = Object.values(validationErrors).filter(Boolean);
    console.log('Validation failed, errors:', errorMessages);
    return;
  }

  try {
    const res = await createUserStory(formData);  
    console.log('Story Created:', res);
    handleReset();
    alert('User Story Created Successfully!');
  } catch (err) {
    console.error(err);
    alert('Failed to create user story.');
  }
};

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      status: '',
      businessValue: 0,
      storyPoint: 0,
      assignTo: '',
    });
    setErrors({});
  };

  return (
    <div className="content-center p-8">
      <div className="mb-6">
        <Typography component="h1" variant="h2">
          Create User Story
        </Typography>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3 gap-6">
            <Typography variant="h6" color="blue-gray" >
            Title
          </Typography>
            <Input
              label="Title"
              variant="outlined"
              required
              value={formData.title}
              onChange={handleChange('title')}
            />
          </div>

          <div className="md:col-span-3">
            <Typography variant="h6" color="blue-gray" >
            Description
          </Typography>
            <Textarea
              label="Description"
              variant="outlined"
              rows={4}
              value={formData.description}
              onChange={handleChange('description')}
            />
          </div>

          <div>
            <Typography variant="h6" color="blue-gray">
              Status
            </Typography>
            <Select
              value={formData.status}
              onChange={handleSelectChange('status')}
              label="Status"
            >
              {statusOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" >
            Business Value
          </Typography>
            <Input
              label="Business Points"
              max={100}
              min={0}
              variant="outlined"
              type="number"
              value={formData.businessValue}
              onChange={handleChange('businessValue')}
            />
          </div>

          <div>
            <Typography variant="h6" color="blue-gray">
              Story Points
            </Typography>
            <Select
              value={formData.storyPoint ? String(formData.storyPoint) : ''}
              onChange={handleSelectChange('storyPoint')}
              label="Story Point"
            >
              {fibonacciSequence.map((point) => (
                <Option key={point} value={String(point)}>
                  {point}
                </Option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-3">
            <Typography variant="h6" color="blue-gray" >
            Assign To
          </Typography>
            <Input
              label="Assign To"
              variant="outlined"
              required
              value={formData.assignTo}
              onChange={handleChange('assignTo')}
            />
          </div>

          <div className='flex gap-4'>
            <Button
              type="submit"
            >
              Create User Story
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

