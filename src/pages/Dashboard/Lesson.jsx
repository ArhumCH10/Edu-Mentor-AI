import { useState, useEffect } from 'react';
import Header from "./header";
import './Lessons.css'; 
import NewRequest from './NewRequest';
import TrialLessons from './TrialLessons';
import Clicked from './Clicked';
import { usePaymentTeacher } from '../../services/usePaymentTeacher';
import Cancelled from './Cancelled';
import { useNavigate } from 'react-router-dom';

const lessonsData = [
  {
    title: 'Introduction to Machine Learning',
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
    grade: "Year 10",
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
    grade: "Year 7",
    bio: "Hello! I'm Liz, a dedicated English Student from the...",
    status: "New Student",
    price: "Rs 6,985",
    duration: "50-min lesson",
    // ...other properties
  }
];

const ClickComponent = () => {
  return  (
    <>
      <h2 className="lesson-title">Profile Clicked</h2>
      {tutors.map((tutor, index) => (
        <Clicked key={index} tutor={tutor} />
      ))}
    </>
  );
};

const TrialComponent = () => {
  return (<><TrialLessons/></>);
};

const NewComponent = () => {
  return (
    <>
      <h2 className="lesson-title">Classes for today</h2>
      {tutors.map((tutor, index) => (
        <NewRequest key={index} tutor={tutor} />
      ))}
    </>
  );
};

const CancelComponent = () => {
  return <Cancelled/>;
};

export default function Lessons() {
  const { data: classes} = usePaymentTeacher();
  const [activeTab, setActiveTab] = useState('lessons'); 
  const [activeLessonsCount, setActiveLessonsCount] = useState(0);
  const [newRequestsCount, setNewRequestsCount] = useState(0);
  const [trialLessonsCount, setTrialLessonsCount] = useState(0);
  const [clickedCount, setClickedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);

  useEffect(() => {
    setActiveLessonsCount(lessonsData.filter(lesson => lesson.status === 'Active Class').length);
    setNewRequestsCount(tutors.filter(tutor => tutor.status === 'New Student').length);
    if (classes) {
      setTrialLessonsCount(classes.filter(lesson => lesson.lessonType === 'Trial').length); 
    }
    setClickedCount(3); 
    setCancelledCount(4);
  }, [classes]); // Make sure to add classes in the dependency array to re-run the effect when classes changes
  

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); 
  };

  const navigate=useNavigate()

  const handleModuleOpen = () => {
    navigate("student");
  };
  
  return (
    <>
      <Header />
      <div className="tabs">
        <div className={activeTab === 'lessons' ? 'start' : ''} onClick={() => handleTabClick('lessons')}>
          Active Lessons {activeLessonsCount > 0 && `(${activeLessonsCount})`}
        </div>
        <div className={activeTab === 'new' ? 'start' : ''} onClick={() => handleTabClick('new')}>
          Classroom {newRequestsCount > 0 && `(${newRequestsCount})`}
        </div>
        <div className={activeTab === 'trial' ? 'start' : ''} onClick={() => handleTabClick('trial')}>
          Trial Lessons {trialLessonsCount > 0 && `(${trialLessonsCount})`}
        </div>
        <div className={activeTab === 'click' ? 'start' : ''} onClick={() => handleTabClick('click')}>
          Clicked for Lessons {clickedCount > 0 && `(${clickedCount})`}
        </div>
        <div className={activeTab === 'cancel' ? 'start' : ''} onClick={() => handleTabClick('cancel')}>
          Cancel Requests {cancelledCount > 0 && `(${cancelledCount})`}
        </div>
      </div>
      {activeTab === 'lessons' && (
        <>
          <h2 className="lesson-title">Active Lessons</h2>
          <div  className="lessons-container">
            {lessonsData.map((lesson, index) => (
              <div className="lesson-card"                 onClick={() => handleModuleOpen(lesson)}
              key={index}>
                <div className="lesson-header">{lesson.title}</div>
                <div className="lesson-body">
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
      )}
      {activeTab === 'click' && (
        <ClickComponent />
      )}

     {activeTab === 'new' && (
        <NewComponent />
      )}

     {activeTab === 'trial' && (
        <TrialComponent/>
      )}

     {activeTab === 'cancel' && (
        <CancelComponent />
      )}
    </>
  );
}