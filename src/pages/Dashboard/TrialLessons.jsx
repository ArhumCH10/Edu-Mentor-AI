import './TrialLessons.css'; 
import { usePaymentTeacher } from '../../services/usePaymentTeacher';
import StyledSpinner from "../TeacherSignUpProcess/startSpinner";

function formatTimeSlot(startTime, durationMinutes) {
  const endTime = new Date(new Date(`1970/01/01 ${startTime}`).getTime() + durationMinutes * 60000);
  const formattedEndTime = `${endTime.getHours()}:${endTime.getMinutes()}`;
  return `${startTime}-${formattedEndTime}`;
}
  
export default function TrialLessons() {
  const { data: classes, status, isLoading } = usePaymentTeacher();

  if (isLoading) {
    return <StyledSpinner/>;
  }

  if (!classes || classes.length === 0 || status !== 'success') {
    return(
    <>
   <h2 className="lesson-title">Trial Lessons</h2>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <p>No classes found.</p>
</div>
     </>)
  }
  
  return (
    <>
    <h2 className="lesson-title">Trial Lessons</h2>
      <div className="lessons-container">
        {status === 'success' && (
          <>
            {classes.map((lesson, index) => (
              <div className="lesson-card" key={index}>
                <div className="triallesson-header">
                 <div>
                 {lesson.subjectsTaught.toUpperCase()} class
                 </div>
                 <div className="triallesson-date">
                 {new Date(lesson.lessonDate).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                 </div>
                </div>
                <div className="lesson-body">
                  <h3>{lesson.studentName}</h3>
                  <p><strong> Time:</strong> {formatTimeSlot(lesson.lessonTime, lesson.lessonTimeDuration)}</p>
                  <p><strong>{lesson.lessonType} class</strong></p>
                  <p>{lesson.subjectsTaught} lesson</p>
                  <div className="add">
                    <p>Price <strong>$ {lesson.amountPaid} <br/> </strong></p>
                    <button className="student-view">View Lesson</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}