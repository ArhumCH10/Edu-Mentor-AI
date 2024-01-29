
import Header from "./header";
import { useState, useEffect } from 'react'
import { LineChart, Line, ReferenceLine, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BsGraphUpArrow, BsGraphDownArrow, BsThreeDots } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate();
  const handleShowAllMessages = () => {
    navigate('/dashboardlinks/Message');
  };
  const handleShowAllClasses = () => {
    navigate('/dashboardlinks/Classroom');
  };
  const data = [{ name: '0', This_Year: 0 }, { name: 'Jan', This_Year: 18 },
  { name: 'Feb', This_Year: 9 },
  { name: 'Mar', This_Year: 23 },
  { name: 'Apr', This_Year: 20 },
  { name: 'May', This_Year: 50 },
  { name: 'Jun', This_Year: 73 },
  { name: 'Jul', This_Year: 33 },
  { name: 'Aug', This_Year: 57 },
  { name: 'Sep', This_Year: 90 },
  { name: 'Oct', This_Year: 47 },
  { name: 'Nov', This_Year: 21 },
  { name: 'Dec', This_Year: 27 }
  ];
  const data1 = [
    { name: '0', Last_Year: 0 },
    { name: 'Jan', Last_Year: 0 },
    { name: 'Feb', Last_Year: 12 },
    { name: 'Mar', Last_Year: 38 },
    { name: 'Apr', Last_Year: 27 },
    { name: 'May', Last_Year: 32 },
    { name: 'Jun', Last_Year: 73 },
    { name: 'Jul', Last_Year: 57 },
    { name: 'Aug', Last_Year: 49 },
    { name: 'Sep', Last_Year: 52 },
    { name: 'Oct', Last_Year: 24 },
    { name: 'Nov', Last_Year: 68 },
    { name: 'Dec', Last_Year: 40 }
  ];
  const minY = Math.min(...data.map(entry => entry.This_Year));
  const maxY = Math.max(...data.map(entry => entry.This_Year));

  const interval = 25;
  const numberOfTicks = Math.ceil((maxY - minY) / interval);
  const yAxisTicks = Array.from({ length: numberOfTicks + 1 }, (_, index) => minY + index * interval);
  const initialCombinedData = data.map((entry, index) => ({ ...entry, Last_Year: data1[index].Last_Year }));

  const monthOrder = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const [combinedData, setCombinedData] = useState([...initialCombinedData]);
  const handleSortByYear = (selectedValue) => {
    let sortedData = [];

    if (selectedValue === 'week') {
      // Week-wise sorting logic (simplified example)
      sortedData = [...combinedData].sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedValue === 'month') {
      // Month-wise sorting logic
      sortedData = [...combinedData].sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
    } else if (selectedValue === 'year') {
      // Year-wise sorting logic
      sortedData = [...combinedData].sort((a, b) => a.name.localeCompare(b.name));
    }

    setCombinedData(sortedData);
  };



  const income = 2.500;
  const roundedNumber = income.toFixed(3);



  const totalThisYear = data.reduce((acc, item) => acc + item.This_Year, 0);
  const totalLastYear = data1.reduce((acc, item) => acc + item.Last_Year, 0);
  const totalPercentChange = ((totalThisYear - totalLastYear) / totalLastYear) * 100;

  const result = {
    Total_This_Year: totalThisYear,
    Total_Last_Year: totalLastYear,
    Total_Percent_Change: totalPercentChange.toFixed(1)
  };
  const activeStudents = 10;
  const TotalStudents = 30;
  const AvgLessonRate = 32.14;
  const ResponseRate = 100;
  const lessonTought = 41;
  const inboxResTime = 1;

  const classesdata = [
    {
      name: "Ali",
      timeLeft: '00:29:15',
      content: "Algebra"
    },
    {
      name: "Tayyaba",
      timeLeft: "01:15:15",
      content: "Graphs"
    },
    {
      name: "Wajiha",
      timeLeft: "02:15:15",
      content: "Equation of line"
    }
  ];
  const [updatedData, setUpdatedData] = useState([...classesdata]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUpdatedData(prevData =>
        prevData.map(person => {
          const [hours, minutes, seconds] = person.timeLeft.split(":").map(Number);
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          const newTotalSeconds = Math.max(0, totalSeconds - 1);
          const newHours = Math.floor(newTotalSeconds / 3600);
          const newMinutes = Math.floor((newTotalSeconds % 3600) / 60);
          const newSeconds = newTotalSeconds % 60;
          const newTimeLeft = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
          return { ...person, timeLeft: newTimeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const messagesData = [
    {
      name: "Ayesha",
      message: "Sir, Today's Home Work",
      timeAgo: "5m ago"
    },
    {
      name: "Arhum",
      message: "Sir, I want Help!!",
      timeAgo: "20m ago"
    },
    {
      name: "Ghous",
      message: "Sir, I did my work",
      timeAgo: "2h ago"
    }
  ];

  return (
    <>
      <Header />
      <div className="container-fluid graph-msg-row" >
        <div className="row ">
          <div className="col-7 Graph" >
            <div className="head">
              <div className="row">
                <div className="col-8">
                  <h5 style={{ marginLeft: 30 }}>Over All</h5>
                </div>
                <dic className="col-4">
                  <select
                    onChange={(e) => handleSortByYear(e.target.value)}
                    style={{ background: 'white', border: 'none' }}
                  >
                    <option value="week">Sort by Week</option>
                    <option value="month">Sort by Month</option>
                    <option value="year">Sort by Year</option>
                  </select>
                </dic>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={'90%'}>
              <LineChart width={'auto'} height={'auto'} data={combinedData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <Line type="linear" dataKey="This_Year" stroke="green" />
                <Line type="linear" dataKey="Last_Year" stroke="gray" />
                {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" /> */}
                {yAxisTicks.map((tick, index) => (
                  <ReferenceLine
                    key={`refLine-${index}`}
                    y={tick}
                  />
                ))}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend wrapperStyle={{ right: 200, top: -33, width: 'auto' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="col Messages p-4"  >
            <div className="row">
              <div className="col-10">
                <h4>Messages</h4>
              </div>
              <div className="col" style={{ fontSize: 22 }}>
                <button style={{ background: 'transparent', border: 'none', color: 'rgb(34, 245, 80)' }}>
                  <BsThreeDots />
                </button>
              </div>
            </div>
            {messagesData.map((person, index) => (
              <div key={index} className="row MessageBox">
                <div className="col-2" style={{marginRight:5}}>
                  <img src="/profilepicture.png" alt="dp" height={50} width={70} style={{ borderRadius: 150,marginTop:4 }} />
                </div>
                <div className="col">
                  <div className="row" style={{ marginTop:4 }}>
                    <div className="col-8">{person.name}</div>
                    <div className="col-4">
                      <span style={{ color: 'gray' }}> {person.timeAgo} </span>
                    </div>
                  </div>
                  <div className="row" style={{paddingRight:'35px'}}>
                    <small>{person.message}</small>
                    <hr style={{marginRight:50}}/>
                  </div>
                </div>
                
              </div>
            ))}
            <div className="row">
            <button onClick={handleShowAllMessages} className="show-all-msg-button">Show All <IoMdArrowDropdown style={{color:'rgb(34, 245, 80);'}}/></button>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-3 Earnings gap-3" >
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-8">
                <span style={{ marginLeft: 20, fontWeight: 'bold', fontSize: "large", padding: 2 }}>
                  Total Earnings
                </span>
              </div>
              <div className="col-4">
                <img src="/money.png" alt="Earning Pic" height={60} width={60} style={{ marginTop: -17 }} />
              </div>
            </div>
            <div className="row " >
              <div className="col-2">
                <div className="dollarSign" style={{ fontWeight: '500', fontSize: 28, marginTop: 3, marginLeft: 20, color: '#57cbf5' }}>
                  $
                </div>
              </div>
              <div className="col-6">
                <div className="earn" style={{ fontWeight: '500', fontSize: 54, color: '#57cbf5' }}>
                  {roundedNumber}
                </div>
              </div>
              <div className="col-1">
                <div style={{ fontWeight: '500', marginTop: 36, marginLeft: 0, fontSize: 22, color: '#57cbf5' }}>
                  ,00
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ marginLeft: 20 }}>
                {result.Total_Percent_Change < 0 ? (
                  <div> <span style={{ fontWeight: '500', color: "#57cbf5" }}><BsGraphDownArrow style={{ marginBottom: 6 }} /> Down to {Math.abs(result.Total_Percent_Change)}%</span> from Last Year</div>
                ) : (
                  <div><span style={{ fontWeight: '500', color: "#57cbf5" }}><BsGraphUpArrow style={{ marginBottom: 6 }} /> Up to {result.Total_Percent_Change}%</span> from Last Year</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-3 overview">
            <h5> Overview </h5>
            <div className="row">
              <div className="col-8">
                <h6>
                  Active Students
                </h6>
              </div>
              <div className="col-4">
                <h6 className="Active-student" style={{ fontWeight: '500', color: '#57cbf5' }}>
                  {activeStudents}
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <h6>
                  Total Students
                </h6>
              </div>
              <div className="col-4">
                <h6 className="total-student" style={{ fontWeight: '500', color: '#57cbf5' }}>
                  {TotalStudents}
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <h6>
                  Average Lesson Rate
                </h6>
              </div>
              <div className="col-4">
                <h6 className="avg-lesson-rate" style={{ fontWeight: '500', color: '#57cbf5' }}>
                  ${AvgLessonRate}
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <h6>
                  Response Rate
                </h6>
              </div>
              <div className="col-4">
                <h6 className="response-rate" style={{ fontWeight: '500', color: '#57cbf5' }}>
                  {ResponseRate}%
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <h6>
                  Lesson taught
                </h6>
              </div>
              <div className="col-4">
                <h6 className="lesson-taught" style={{ fontWeight: '500', color: '#57cbf5' }}>
                  {lessonTought}
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <h6>
                  Inbox Response Time
                </h6>
              </div>
              <div className="col-4">
                <h6 className="inbox-res-time" style={{ fontWeight: '500', color: '#57cbf5' }}>
                  {inboxResTime} hr
                </h6>
              </div>
            </div>
          </div>
          <div className="col-4 Upcoming-classes-today">
            <div className="row">
              <div className="col-10">
                <h4>Upcoming classes today</h4>
              </div>
              <div className="col" style={{ fontSize: 22 }}>
                <button style={{ background: 'transparent', border: 'none', color: 'white' }}>
                  <BsThreeDots />
                </button>
              </div>
            </div>
            {updatedData.map((person, index) => (
              <div key={index} className="row classComing">
                <div className="col-2">
                  <img src="/profilepicture.png" alt="dp" height={50} width={70} style={{ borderRadius: 180 }} />
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-6">{person.name}</div>
                    <div className="col-6">
                      <small>Time Left</small> <span style={{ color: 'red' }}> {person.timeLeft} </span>
                    </div>
                  </div>
                  <div className="row">
                    <small>Content: {person.content}</small>
                  </div>
                </div>
              </div>
            ))}
            <div className="row">
            <button className="show-all-class-button" onClick={handleShowAllClasses}>Show All <IoMdArrowDropdown style={{color:'white'}}/></button>
             </div>
          </div>
        </div>
      </div>
    </>
  )
}