import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper,
} from '@mui/material';

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
    const value = event.target.value;
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
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
      const errorMessages = Object.values(validationErrors).filter(msg => msg !== '');
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
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create User Story
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title Field */}
            <Grid item size={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={formData.title}
                onChange={handleChange('title')}
              />
            </Grid>

            {/* Description Field */}
            <Grid item size={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange('description')}
              />
            </Grid>

            {/* Status, Business Points, and Story Points in the same row */}
            <Grid item size={4}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleChange('status')}
                  label="Status"
                  inputProps={{
                    tabIndex: -1,
                  }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item size={4} sm={4}>
              <TextField
                label="Business Points"
                variant="outlined"
                type="number"
                fullWidth
                value={formData.businessPoints}
                onChange={handleChange('businessPoints')}
                helperText="Maximum 100"
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Grid>

            <Grid item size={4} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Story Points</InputLabel>
                <Select
                  value={formData.storyPoints}
                  onChange={handleChange('storyPoints')}
                  label="Story Points"
                  inputProps={{
                    tabIndex: -1,
                  }}
                >
                  {fibonacciSequence.map((point) => (
                    <MenuItem key={point} value={point}>
                      {point}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Assign To Field */}
            <Grid item size={12}>
              <TextField
                label="Assign To"
                variant="outlined"
                fullWidth
                required
                value={formData.assignTo}
                onChange={handleChange('assignTo')}
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item size={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  size="large"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Create User Story
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

