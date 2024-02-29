import { useState } from 'react';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import './StudentDashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Assuming this data array represents your weekly data
const DailyData = [
    { name: 'Day 1', Math: 20, Science: 10 },
    { name: 'Day 2', Math: 50, Science: 40 },
    { name: 'Day 3', Math: 25, Science: 65 },
    { name: 'Day 4', Math: 90, Science: 85 },
    { name: 'Day 5', Math: 20, Science: 10 },
    { name: 'Day 6', Math: 50, Science: 40 },
    { name: 'Day 7', Math: 25, Science: 65 },
  ];
  
  // Placeholder for monthly/yearly data (you would fill this with actual data)
  const monthlyData = [
    { name: 'January', Math: 20, Science: 10 },
    { name: 'Febuary', Math: 2, Science: 30 },
    { name: 'March', Math: 5,Science: 65 },
    { name: 'April', Math: 50, Science: 85 },
    { name: 'June', Math: 40, Science: 55 },
    { name: 'July', Math: 7, Science: 8 },
    { name: 'Auguest', Math: 40, Science: 5 },
    { name: 'September', Math: 50, Science: 6 },
    { name: 'October', Math: 30, Science: 4 },
    { name: 'November', Math: 4, Science: 8 },
    { name: 'December', Math: 60, Science: 75 },
  ];
  const weeklyData = [
    { name: 'Week 1', Math: 30, Science: 10 },
    { name: 'Week 2', Math: 60, Science: 40 },
    { name: 'Week 3', Math: 75, Science: 65 },
    { name: 'Week 4', Math: 40, Science: 85 },
  ];

  function DashboardGraph() {
    const [data, setData] = useState(DailyData);
  
    const handleSort = (sortType) => {
      // Toggle sort type between weekly, monthly, and yearly
      if (sortType === 'daily') {
        setData(DailyData); // switch to monthly data
      } else if (sortType === 'month') {
        setData(monthlyData); // switch to yearly data
      } else {
        setData(weeklyData); // back to weekly data
      }
    };
  
    return (
      <div className="graph-container">
        <Row type="horizontal" justify="space-between">
          <Heading as="heading1">Learning Progress Rate</Heading>
          <dic className="col-3">
                  <select
                    onChange={(e) => handleSort(e.target.value)}
                    style={{cursor:'pointer', background: 'var(--color-grey-0)', border: 'none' }}
                  >
                    <option value="daily">Sort by Daily</option>
                    <option value="weekly">Sort by Weekly</option>
                    <option value="month">Sort by Monthly</option>
                  </select>
                </dic>
        </Row>
  
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
                top: 5, right: 30, left: -20, bottom: 0, // Adjust the left margin here
              }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-grey-0)', 
              color: '--color-grey-900' 
            }}
          />
            <Legend />
            <Line type="monotone" dataKey="Math" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Science" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default DashboardGraph;