import './TrialLessons.css'; 

const lessonsData = [
    {
      title: 'Introduction to Machine Learning',
      instructor: 'Bilal Mumtaz',
      code: 'SEAD3453',
      credits: "8:00-9:55",
      status:  'Trial Class',
      grade: 'Year 7',
      price: 'Rs 6,985',
      term: '50-min Lesson'
    },
    {
      title: 'Operating System',
      instructor: 'Ghous ALi',
      code: 'SEAD3453',
      credits: "8:00-9:55",
      status: 'Trial Class',
      grade: 'Year 7',
      price: 'Rs 6,985',
      term: '25-min Lesson'
    },
    {
      title: 'Information Security',
      instructor: 'Arhum Naveed',
      code: 'SEAD3453',
      credits: "8:00-9:55",
      status: 'Trial Class',
      grade: 'Year 7',
      price: 'Rs 6,985',
      term: '50-min Lesson'
    },

    {
        title: 'Information Security',
        instructor: 'Arhum Naveed',
        code: 'SEAD3453',
        credits: "8:00-9:55",
        status: 'Trial Class',
        grade: 'Year 7',
        price: 'Rs 6,985',
        term: '50-min Lesson'
      },
  ];

export default function TrialLessons() {
  return (
    <>
    <h2 className="lesson-title">Trial Lessons</h2>
    <div className="lessons-container">
      {lessonsData.map((lesson, index) => (
        <div className="lesson-card" key={index}>
          <div className="triallesson-header">{lesson.title}</div>
          <div className="lesson-body">
            <h3>{lesson.instructor}</h3>
            <p>{lesson.code}<strong> Time:</strong> {lesson.credits}</p>
            <p><strong>{lesson.status}</strong></p>
            <p>{lesson.grade}</p>
            <div className="add">
            <p><strong>{lesson.price} </strong>{lesson.term}</p>
            <button className="view">View Lesson</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}
