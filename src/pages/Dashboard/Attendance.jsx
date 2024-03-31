import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

function Attendance({ classes, onSaveAttendance }) {
  const [attendance, setAttendance] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const handleAttendanceChange = (classId, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [`${classId}`]: status,
    }));
  };

  const handleSaveAttendance = () => {
    onSaveAttendance(attendance);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setAttendance({});
    }, 2000); // Reset confirmation message after 2 seconds
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Attendance
      </Typography>
      {classes.map((classItem) => (
        <Box key={classItem.id} sx={{ marginBottom: 10 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {classItem.name}:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
              Status:
            </Typography>
            <select
              value={attendance[classItem.id] || 'present'}
              onChange={(e) => handleAttendanceChange(classItem.id, e.target.value)}
              style={{ marginRight: 10 }}
            >
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
            </select>
          </Box>
          {/* Attendance Preview */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle2">Attendance Preview:</Typography>
            <Box sx={{ display: 'inline-block', marginRight: 10 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {classItem.name}:
              </Typography>
              <Typography variant="body2">
                {attendance[classItem.id] || 'Not Set'}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      {isSaved && (
        <Typography variant="body1" sx={{ color: 'green', marginTop: 2 }}>
          Attendance saved successfully!
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleSaveAttendance}>
        Save Attendance
      </Button>
    </div>
  );
}

Attendance.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSaveAttendance: PropTypes.func.isRequired,
};

export default Attendance;
