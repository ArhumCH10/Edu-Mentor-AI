import  { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, Box, Divider } from '@mui/material'; // Import Material-UI components

function SubmissionForm({ onSave }) {
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submissionDescription, setSubmissionDescription] = useState('');
  const [file, setFile] = useState(null);
  const [submissions, setSubmissions] = useState([]); // State for storing submitted assignments

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setSubmissionDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get the selected file
  };

  const handleSave = () => {
    const submissionData = {
      startTime,
      startDate,
      endDate,
      description: submissionDescription,
      file,
    };
    const updatedSubmissions = [...submissions, submissionData]; // Add new submission to the list
    setSubmissions(updatedSubmissions); // Update submissions list
    onSave(submissionData); // Pass submission data to onSave function
    // Clear form fields after saving
    setStartTime('');
    setStartDate('');
    setEndDate('');
    setSubmissionDescription('');
    setFile(null);
  };

  return (
    <div>
      <h3>Add Submission</h3>
      <TextField
        value={startTime}
        onChange={handleStartTimeChange}
        label="Start Time"
        type="time"
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        value={startDate}
        onChange={handleStartDateChange}
        label="Start Date"
        type="date"
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        value={endDate}
        onChange={handleEndDateChange}
        label="End Date"
        type="date"
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        value={submissionDescription}
        onChange={handleDescriptionChange}
        label="Description"
        multiline
        rows={5}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <input
        style={{ margin: '10px 0' }}
        type="file"
        accept=".pdf,.doc,.docx" // Limit accepted file types
        onChange={handleFileChange}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Submit
      </Button>
      <br />
      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h6" gutterBottom>
        Submissions
      </Typography>
      {submissions.map((submission, index) => (
        <Box key={index} sx={{ border: '1px solid grey', padding: '10px', margin: '5px', borderRadius: '5px' }}>
          <Typography variant="subtitle1">Start Time: {submission.startTime}</Typography>
          <Typography variant="subtitle1">Start Date: {submission.startDate}</Typography>
          <Typography variant="subtitle1">End Date: {submission.endDate}</Typography>
          <Typography variant="subtitle1">Description: {submission.description}</Typography>
          {submission.file && <Typography variant="subtitle2">File: {submission.file.name}</Typography>}
        </Box>
      ))}
    </div>
  );
}

SubmissionForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SubmissionForm;
