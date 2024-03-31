import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import GradeBook from './GradeBook';
import Attendance from './Attendance';
import Header from './header';
import AnnouncementForm from './AnnouncementForm'
import CourseOutlineForm from './CourseOutlineForm'
import CourseMaterialForm from './CourseMaterialForm'
import SubmissionForm from './SubmissionForm'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function StudentCourse() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAnnouncementSave = (description) => {
    console.log('Announcement saved:', description);
  };

  const handleCourseOutlineSave = (courseOutlineData) => {
    console.log('Course outline saved:', courseOutlineData);
  };

  const handleCourseMaterialSave = (courseOutlineData) => {
    console.log('Course outline saved:', courseOutlineData);
  };

  const handleSubmissionSave = (submissionData) => {
    console.log('Submission saved:', submissionData);
  };

  

  const testsData = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
    { id: 3, name: 'Test 3' },
  ];

  const classes = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
  ];

  const handleSaveAttendance = (attendance) => {
    console.log('Attendance saved:', attendance);
  };

  const handleSaveGrade = (grades) => {
    console.log('Grades saved:', grades);
  };

  return (
    <Box sx={{ width: '100%', background: '#fff' }}>
      <Header />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="Student Course Tabs">
          <Tab label="Announcement/News" />
          <Tab label="Course Outline" />
          <Tab label="Course Material" />
          <Tab label="Submission" />
          <Tab label="Grade Book" />
          <Tab label="Attendance" />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        <AnnouncementForm onSave={handleAnnouncementSave} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <CourseOutlineForm onSave={handleCourseOutlineSave} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <CourseMaterialForm onSave={handleCourseMaterialSave} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3}>
        <SubmissionForm onSave={handleSubmissionSave} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={4}>
        <GradeBook tests={testsData}  onSaveGrade={handleSaveGrade} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={5}>
        <Attendance classes={classes} onSaveAttendance={handleSaveAttendance} />
      </CustomTabPanel>
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default StudentCourse;
