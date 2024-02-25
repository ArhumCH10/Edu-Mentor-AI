import Header from "./header";
import './Classroom.css'; 

const generateColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert the integer to a color
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
};

export default function Classroom() {
  const times = [
    '08:00-08:55', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Assume this data structure for schedule
  const schedule = {
    '08:00-08:55': {
      'Tuesday': { name: 'Sir Owais Hakeem', description: 'Software Re-engineering', code: 'SESE4143-F2B-BS-SE-F20-S1', room: 'C-310' },
      'Friday': { name: 'Muhammad Tayyab Mir', description: 'Introduction to Machine Learning', code: 'SEAD3453-F2B-BS-SE-F20-S4', room: 'A-109' }
    },
    '09:00': {
      'Wednesday': { name: 'Arhum Naveed', description: 'Introduction to Machine Learning', code: 'SEAD3453-F2B-BS-SE-F20-S4', room: 'A-109' }
    },
  };


  return (
    <>
      <Header />
      <h2 className="classroom-title"> My Classroom</h2>
      <div className="current-month">
        <p className="month">Month: </p> 
        <p>February </p>
      </div>
      <div className="classroom-container">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td>{time}</td>
                {days.map((day) => {
                  const classDetails = schedule[time] && schedule[time][day];
                  const colorStyle = classDetails ? { backgroundColor: generateColor(classDetails.name) } : {};
                  return (
                    <td key={day} style={colorStyle}>
                      {classDetails && (
                        <div className="session">
                          <div className="session-time">{time}</div>
                          <div className="session-details">
                            <div className="session-name">{classDetails.name}</div>
                            <div className="session-description">{classDetails.description}</div>
                            <div className="session-code">{classDetails.code}</div>
                            <div className="session-room">{classDetails.room}</div>
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
      </table>
      </div>
    </>
  );
}