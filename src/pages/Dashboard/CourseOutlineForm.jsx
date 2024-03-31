import  { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, Box, Divider } from '@mui/material'; // Import Material-UI components

function CourseOutlineForm({ onSave }) {
  const [courseDescription, setCourseDescription] = useState('');
  const [courseObjectives, setCourseObjectives] = useState('');
  const [courseRequirements, setCourseRequirements] = useState('');
  const [previewData, setPreviewData] = useState(null);

  const handleSave = () => {
    const courseOutlineData = {
      description: courseDescription,
      objectives: courseObjectives,
      requirements: courseRequirements,
    };
    onSave(courseOutlineData); // Pass course outline data to onSave function
    // Clear form fields after saving
    setCourseDescription('');
    setCourseObjectives('');
    setCourseRequirements('');
    setPreviewData(courseOutlineData); // Update preview data after saving
  };

  return (
    <div>
      <h3>Add Course Outline</h3>
     
      <TextField
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        label="Course Description"
        multiline
        rows={5}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        value={courseObjectives}
        onChange={(e) => setCourseObjectives(e.target.value)}
        label="Course Objectives"
        multiline
        rows={5}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        value={courseRequirements}
        onChange={(e) => setCourseRequirements(e.target.value)}
        label="Course Requirements"
        multiline
        rows={5}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <br />
      <Divider style={{ margin: '20px 0' }} />

      {previewData && (
        <Box mt={3} p={2} border={1}>
          <Typography variant="h6">Preview</Typography>
          <Typography>Description: {previewData.description}</Typography>
          <Typography>Objectives: {previewData.objectives}</Typography>
          <Typography>Requirements: {previewData.requirements}</Typography>
        </Box>
      )}
    </div>
  );
}

CourseOutlineForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CourseOutlineForm;
