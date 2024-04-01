import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Typography } from '@mui/material';

function GradeBook({ tests, onSaveGrade }) {
  const [grades, setGrades] = useState({});
  const [savedGrades, setSavedGrades] = useState(null);

  const handleGradeChange = (testId, event) => {
    const { value } = event.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [`${testId}`]: value,
    }));
  };

  const handleSaveGrades = () => {
    onSaveGrade(grades);
    setSavedGrades(grades); // Set saved grades for preview
    setGrades({});
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Grade Book
      </Typography>
      <Box sx={{ marginBottom: 10 }}>
        {tests?.map((test) => (
          <Box key={test.id} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
              {test.name}:
            </Typography>
            <input
              type="number"
              min="0"
              max="100"
              value={grades[test.id] || ''}
              onChange={(e) => handleGradeChange(test.id, e)}
              style={{ width: 80, marginRight: 10 }}
            />
          </Box>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleSaveGrades}>
        Save Grades
      </Button>

      <Divider style={{ margin: '20px 0' }} />

      {savedGrades && (
        <Box sx={{ marginTop: 20 }}>
          <Typography variant="h5">Previous Grades :</Typography>
          <Box sx={{ marginBottom: 5 }}>
            {tests?.map((test) => (
              <Box key={test.id} sx={{ display: 'inline-block', marginRight: 10 }}>
                <Typography variant="subtitle2">
                  {test.name}: {savedGrades[test.id]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
}

GradeBook.propTypes = {
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSaveGrade: PropTypes.func.isRequired,
};

export default GradeBook;
