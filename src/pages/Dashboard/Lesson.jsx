import Header from "./header";
import './Lessons.css'; 

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

export default function Lessons() {
  return (
    <>
      <Header/>
      <h2 className="lesson-title"> My Lessons</h2>
      <div className="lessons-container">
        {lessonsData.map((lesson, index) => (
          <div className="lesson-card" key={index}>
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
  );
}