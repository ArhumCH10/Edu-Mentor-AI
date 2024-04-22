import { useState, useEffect } from 'react';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import './Lessons.css';
import NewReq from './NewReq';
import TrialLessons from './TrialLessons';
import { usePaymentStudent } from '../../services/usePaymentStudent';
import CancellReq from './CancelReq';
import OpenCourse from './OpenCourse';

const lessonsData = [
  {
    title: 'Intro to Machine Learning',
    instructor: 'Bilal Mumtaz',
    code: 'SEAD3453',
    credits: 3.0,
    status: 'Active Class',
    grade: 'Click to calculate',
    attendance: '86.0%',
    term: 'Fall 2023'
  },
  {
    title: 'Operating System',
    instructor: 'Ghous ALi',
    code: 'SEAD3453',
    credits: 3.0,
    status: 'Active Class',
    grade: 'Click to calculate',
    attendance: '86.0%',
    term: 'Fall 2023'
  },
  {
    title: 'Information Security',
    instructor: 'Arhum Naveed',
    code: 'SEAD3453',
    credits: 3.0,
    status: 'Active Class',
    grade: 'Click to calculate',
    attendance: '86.0%',
    term: 'Fall 2023'
  },
  {
    title: 'Software Re enginerring',
    instructor: 'Bilal Mumtaz',
    code: 'SEAD3453',
    credits: 3.0,
    status: 'Active Class',
    grade: 'Click to calculate',
    attendance: '86.0%',
    term: 'Fall 2023'
  },
];

const tutors = [
  // ... add more tutor objects here
  {
    name: "Arhum Naveed",
    imageUrl: "/public/Pic2.jpg", // Local path or URL to the image
    language: "English",
    students: 3,
    lessons: 10,
    active: "18 active students",
    bio: "Hello! I'm Liz, a dedicated English Student from the...",
    status: "Level 1",
    price: "Rs 6,985",
    country: "India",
    duration: "50-min lesson",
    // ...other properties
  },
  {
    name: "Elizabeth T.",
    imageUrl: "/public/Pic2.jpg", // Local path or URL to the image
    language: "English",
    students: 3,
    country: "Pakistan",
    active: "18 active students",
    bio: "Hello! I'm Liz, a dedicated English Student from the...",
    status: "New tutor",
    price: "Rs 6,985",
    duration: "50-min lesson",
    // ...other properties
  }
];

const NewComponent = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">New Requests</Heading>
      </Row>
      {tutors.map((tutor, index) => (
        <NewReq key={index} tutor={tutor} />
      ))}
    </>
  );
};

function Lessons() {
  const [openCourse, setOpenCourse] = useState(false);
  const { data: classes} = usePaymentStudent();
  const [activeTab, setActiveTab] = useState('lessons');
  const [activeLessonsCount, setActiveLessonsCount] = useState(0);
  const [newRequestsCount, setNewRequestsCount] = useState(0);
  const [trialLessonsCount, setTrialLessonsCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  

  useEffect(() => {
    setActiveLessonsCount(lessonsData.filter(lesson => lesson.status === 'Active Class').length);
    setNewRequestsCount(tutors.filter(tutor => tutor.status === 'New tutor').length);
    setTrialLessonsCount(classes.filter(lesson => lesson.lessonType === 'Trial').length);
    setCancelledCount(4);
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleCourseClick = () => {
    setOpenCourse(true);
  };

  return (
    <>
      {!openCourse ? (
         <>
          <div className="tabing">
            <div className={activeTab === 'lessons' ? 'start' : ''} onClick={() => handleTabClick('lessons')}>
              Active Lessons {activeLessonsCount > 0 && `(${activeLessonsCount})`}
            </div>
            <div className={activeTab === 'new' ? 'start' : ''} onClick={() => handleTabClick('new')}>
              New Requests {newRequestsCount > 0 && `(${newRequestsCount})`}
            </div>
            <div className={activeTab === 'trial' ? 'start' : ''} onClick={() => handleTabClick('trial')}>
              Trial Lessons {trialLessonsCount > 0 && `(${trialLessonsCount})`}
            </div>
            <div className={activeTab === 'cancel' ? 'start' : ''} onClick={() => handleTabClick('cancel')}>
              Cancel Requests {cancelledCount > 0 && `(${cancelledCount})`}
            </div>
          </div>
          {activeTab === 'lessons' && (
            <>
              <Row type="horizontal">
                <Heading as="head1">Active Lessons</Heading>
              </Row>
              <div className="active-container">
                {lessonsData.map((lesson, index) => (
                  <div className="lesson-card" key={index} onClick={handleCourseClick}>
                    <div className="student-lesson-header">{lesson.title}</div>
                    <div className="student-lesson-body">
                      <h3>{lesson.instructor}</h3>
                      <p>{lesson.code} Credits: {lesson.credits}</p>
                      <p>{lesson.status}</p>
                      <p>Projected Grade: {lesson.grade}</p>
                      <p>Attendance: {lesson.attendance} {lesson.term}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>

          )
          }
          {activeTab === 'new' && (
            <NewComponent />
          )}

          {activeTab === 'trial' && (
            <TrialLessons />
          )}

          {activeTab === 'cancel' && (
            <CancellReq />
          )}
        </>
      ) : (
        <OpenCourse setOpenCourse={setOpenCourse}/>
      )}
    </>
  );
}

export default Lessons;