import  { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, Box, Divider } from '@mui/material'; // Import Material-UI components

function CourseMaterialForm({ onSave }) {
  const [materialDescription, setMaterialDescription] = useState('');
  const [materialFile, setMaterialFile] = useState(null);
  const [courseMaterials, setCourseMaterials] = useState([]); // State for storing course materials

  const handleDescriptionChange = (event) => {
    setMaterialDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setMaterialFile(event.target.files[0]); // Get the selected file
  };

  const handleSave = () => {
    const materialData = {
      description: materialDescription,
      file: materialFile,
    };
    const updatedMaterials = [...courseMaterials, materialData]; // Add new material to the list
    setCourseMaterials(updatedMaterials); // Update course materials list
    onSave(materialData); // Pass material data to onSave function
    // Clear form fields after saving
    setMaterialDescription('');
    setMaterialFile(null);
  };

  return (
    <div>
      <h3>Add Course Material</h3>
      <TextField
        value={materialDescription}
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
        Save
      </Button>
      <br />
      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h6" gutterBottom>
        Course Material Preview
      </Typography>
      {courseMaterials.map((material, index) => (
        <Box key={index} sx={{ border: '1px solid grey', padding: '10px', margin: '5px', borderRadius: '5px' }}>
          <Typography variant="subtitle1">Description: {material.description}</Typography>
          {material.file && <Typography variant="subtitle2">File: {material.file.name}</Typography>}
        </Box>
      ))}
    </div>
  );
}

CourseMaterialForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CourseMaterialForm;
