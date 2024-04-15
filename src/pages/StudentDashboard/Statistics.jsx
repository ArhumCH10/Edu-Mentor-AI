import   { useState } from "react";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import './Stat.css';
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2';
import Button from "../../ui/TeacherButton";


const Milestone = ({ currentLevel, levels, onUpdateLevelSystem }) => {

  return (
    <div className="milestone-container">
      <div className="milestone-track">
        {levels.map((level, index) => (
          <div key={level.name} className={`milestone ${currentLevel >= index ? 'achieved' : ''}`}>
            <div className="milestone-icon">
              <span className="milestone-text">{level.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="update-notice">
        <p>We,re updating the level system...</p>
        <Button onClick={onUpdateLevelSystem}>Go to level overview</Button>
      </div>
    </div>
  );
};


Milestone.propTypes = {
  currentLevel: PropTypes.number.isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateLevelSystem: PropTypes.func.isRequired
};


const ProgressBar = ({ progress }) => {
  return <div style={{ width: '100%', backgroundColor: '#ddd' }}>
    <div style={{ width: `${progress}%`, backgroundColor: 'green', color: 'white', textAlign: 'center' }}>
      {progress}%
    </div>
  </div>;
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

// Statistics component
function Statistics() {
  const quizScores = [80, 85, 90, 75, 95];

  // Prepare the data for the quiz scores chart
  const data = {
    labels: quizScores.map((_, index) => `Quiz ${index + 1}`),
    datasets: [
      {
        label: 'Quiz Scores',
        data: quizScores,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  const assignmentCompletionRate = 12; // 12 out of 15 assignments completed
  const classAttendanceRate = 90; // 90% attendance rate
  const interactionsWithTeachers = 35; // Number of interactions
  const courseProgress = {
    'Mathematics': 80,
    'Science': 65,
    'History': 90,
  };

  const [currentLevel, setCurrentLevel] = useState(0);
  const levels = [
    { name: 'New Student' },
    { name: 'Level One' },
    { name: 'Level Two' },
    { name: 'Top Rated' }
    // Add more levels as needed
  ];

  const handleLevelUpdate = (newLevel) => {
    setCurrentLevel(newLevel); // You would have logic to determine the new level
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">My Statistics</Heading>
      </Row>

      <Row type="horizontal">
        <div className="stat-card">
          <h3>Quiz Average Score</h3>
          <Bar data={data} />
        </div>
        <div className="stat-card">
          <h3>Assignment Completion</h3>
          <ProgressBar progress={(assignmentCompletionRate / 15) * 100} />
          <p>{assignmentCompletionRate} out of 15 assignments completed</p>
        </div>
        <div className="stat-card">
          <h3>Class Attendance</h3>
          <ProgressBar progress={classAttendanceRate} />
        </div>
      </Row>

      <Row type="horizontal">
        <div className="stat-card">
          <h3>Teacher Interactions</h3>
          <p>Total interactions: {interactionsWithTeachers}</p>
        </div>
        <div className="stat-card">
          <h3>Teacher Interactions</h3>
          <p>Total interactions: {interactionsWithTeachers}</p>
        </div>
        <div className="stat-card">
          <h3>Class Participation</h3>
          <ProgressBar progress={75} label="Class Participation" />
          </div>
      </Row>

      <Row type="horizontal">
        {Object.entries(courseProgress).map(([course, progress]) => (
          <div className="stat-card" key={course}>
            <h3>{course} Progress</h3>
            <ProgressBar progress={progress} />
          </div>
        ))}
      </Row>

      <Row type="horizontal">
      <div className="milestone-card">
          <h3>MilesStones</h3>

          <Milestone currentLevel={currentLevel} levels={levels} onUpdateLevelSystem={handleLevelUpdate} />
          </div>
          </Row>

      {/* Add more rows and cards to display other statistics as needed */}
    </>
  );
}

export default Statistics;