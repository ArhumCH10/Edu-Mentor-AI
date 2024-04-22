import './TrialLessons.css'; 
import Heading from "../../ui/Heading";
import { usePaymentStudent } from '../../services/usePaymentStudent';
import Row from "../../ui/Row";

function formatTimeSlot(startTime, durationMinutes) {
  const endTime = new Date(new Date(`1970/01/01 ${startTime}`).getTime() + durationMinutes * 60000);
  const formattedEndTime = `${endTime.getHours()}:${endTime.getMinutes()}`;
  return `${startTime}-${formattedEndTime}`;
}
  
export default function TrialLessons() {
  const { data: classes, status } = usePaymentStudent();
  
  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">Trial Lessons</Heading>
      </Row>
      <div className="trial-container">
        {status === 'success' && (
          <>
            {classes.map((lesson, index) => (
              <div className="student-lesson-card" key={index}>
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
                <div className="student-lesson-body">
                  <h3>{lesson.teacherName}</h3>
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
