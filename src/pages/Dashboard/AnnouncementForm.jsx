import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Snackbar, TextField } from '@mui/material'; // Import Material-UI components

function AnnouncementForm({ onSave }) {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null); // State for file upload
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [announcements, setAnnouncements] = useState([]); // State for announcements

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get the selected file
  };

  const handleSave = () => {
    const newAnnouncement = {
      description,
      file,
      preview: description.substr(0, 50), // Assuming preview is first 50 characters of description
    };
    setAnnouncements([...announcements, newAnnouncement]); // Add new announcement to the list
    onSave(description, file); // Pass both description and file to onSave function
    setDescription('');
    setFile(null); // Reset file state after saving
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      <h3>Add Announcement</h3>
      <TextField
        value={description}
        onChange={handleChange}
        label="Announcement Description"
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
        Save
      </Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Announcement saved successfully!"
      />
            <Divider style={{ margin: '20px 0' }} />

      <div >
        {announcements.map((announcement, index) => (
          <div key={index} style={{ border: '1px solid grey', padding: '10px', margin: '10px', borderRadius: '1em' }}>
            <h4>{announcement.preview}</h4>
            {announcement.file && <p>File uploaded: {announcement.file.name}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

AnnouncementForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default AnnouncementForm;
