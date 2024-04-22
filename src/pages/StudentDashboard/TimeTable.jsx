import { useEffect, useState } from 'react';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import './Timetable.css';
import { usePaymentStudent } from '../../services/usePaymentStudent';
import toast from 'react-hot-toast';

// Function to generate a consistent color based on the code
const generateColor = (description) => {
  let hash = 0;
  for (let i = 0; i < (description || '').length; i++) {
    hash = (hash * 31 + description.charCodeAt(i)) % 360;  // Better hash function using a prime number
  }
  return `hsl(${hash}, 100%, 70%)`;  // Full saturation and lightness adjusted for readability
};

function convertTo24Hour(time) {
  const [hours, minutes] = time.split(':');
  return `${parseInt(hours) + 12}:${minutes}`; // converts "3:00" to "15:00"
}

function TimeTable() {
  const { data: classes, status } = usePaymentStudent();
  const [schedule, setSchedule] = useState({});
  const times = ['08:00-08:55', '09:00-09:55', '10:00-10:55', '11:00-11:55', '12:00-12:55', 
                 '13:00-13:55', '14:00-14:55', '15:00-15:55', '16:00-16:55', '17:00-17:55', 
                 '18:00-18:55', '19:00-19:55', '20:00-20:55', '21:00-21:55', '22:00-22:55', 
                 '23:00-23:55'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (status === 'success') {
      const newSchedule = times.reduce((acc, time) => {
        acc[time] = days.reduce((dAcc, day) => {
          dAcc[day] = [];
          return dAcc;
        }, {});
        return acc;
      }, {});

      classes.forEach(cls => {
        const startTime = convertTo24Hour(cls.lessonTime);
        const endTime = new Date(new Date(`1970/01/01 ${startTime}`).getTime() + cls.lessonTimeDuration * 60000);
        const endTimeFormatted = `${endTime.getHours()}:${endTime.getMinutes()}`;        
        const timeSlot = `${startTime}-${endTimeFormatted}`;

        if (Object.prototype.hasOwnProperty.call(newSchedule, timeSlot)) {
          const dayIndex = days.findIndex(day => day === cls.lessonDay);
          if (dayIndex !== -1) {
            newSchedule[timeSlot][days[dayIndex]].push({
              name: cls.teacherName,
              classType: cls.lessonType,
              description: cls.subjectsTaught, // Assuming subjectsTaught is included in the teacher details obtained from the backend
              time: `${cls.lessonTimeDuration} mins`,
            });
          }
        } else {
          // Handle missing time slots if they don't exist in predefined times
          if (!Object.prototype.hasOwnProperty.call(newSchedule, timeSlot)) newSchedule[timeSlot] = {};
          days.forEach(day => {
            if (!Object.prototype.hasOwnProperty.call(newSchedule[timeSlot], day)) newSchedule[timeSlot][day] = [];
          });
          newSchedule[timeSlot][cls.lessonDay].push({
            name: cls.teacherName,
            classType: cls.lessonType,
            description: cls.subjectsTaught, // Use optional chaining to access the property safely
            time: `${cls.lessonTimeDuration} mins`,
          });
        }
      });
    

      setSchedule(newSchedule);
    } else if (status === 'error') {
      toast.error('Failed to load classes. Please try again.');
    }
  }, [classes, status]);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">My Timetable</Heading>
      </Row>
      <div className="current-month">
        <p className="month">Month: {currentMonth}</p>
      </div>
      <div className="classroom-container">
        <table className="time-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {Object.keys(schedule).sort().map(time => (
              <tr key={time}>
                <td>{time}</td>
                {days.map(day => (
                  <td key={`${time}-${day}`} style={{ backgroundColor: schedule[time][day].length ? generateColor(schedule[time][day][0].description) : 'none' }}>
                    {schedule[time][day].map((classDetails, index) => (
                      <div key={index} className="session">
                        <div className="session-time">{classDetails.time}</div>
                        <div className="session-details">
                          <div className="session-name">{classDetails.name}</div>
                          <div className="session-description">{classDetails.description} lesson</div>
                          <div className="session-duration">{classDetails.classType} class</div>
                        </div>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TimeTable;
