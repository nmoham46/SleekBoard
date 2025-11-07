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
    businessPoints: '',
    storyPoints: '',
    assignTo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value = event?.target?.value ?? '';
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

    if (formData.businessPoints !== '') {
      const bp = Number(formData.businessPoints);
      if (isNaN(bp) || bp < 0 || bp > 100) {
        newErrors.businessPoints = 'Business points must be between 0 and 100';
      }
    }

    if (!formData.storyPoints) {
      newErrors.storyPoints = 'Story points is required';
    }

    if (!formData.assignTo.trim()) {
      newErrors.assignTo = 'Assign to is required';
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { isValid, errors: validationErrors } = validateForm();
    console.log('Validation result:', isValid, 'Errors:', validationErrors);

    if (isValid) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      // You can add API call or other submission logic here
    } else {
      // Validation failed
      const errorMessages = Object.values(validationErrors).filter((msg) => msg !== '');
      console.log('Validation failed, errors:', errorMessages);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      status: '',
      businessPoints: '',
      storyPoints: '',
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
            Business Points
          </Typography>
            <Input
              label="Business Points"
              max={100}
              min={0}
              variant="outlined"
              type="number"
              value={formData.businessPoints}
              onChange={handleChange('businessPoints')}
            />
          </div>

          <div>
            <Typography variant="h6" color="blue-gray">
              Story Points
            </Typography>
            <Select
              value={formData.storyPoints ? String(formData.storyPoints) : ''}
              onChange={handleSelectChange('storyPoints')}
              label="Story Points"
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

