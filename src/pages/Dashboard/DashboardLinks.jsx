import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Availability from './Availability';
import Classroom from './Classroom';
import Lesson from './Lesson';
import Message from './Message';
import Statistics from './Statistics';
import Earnings from './Earnings';
import Settings from './Settings';
import './Dashboard.css';

export default function DashboardLinks() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Availability" element={<Availability />} />
          <Route path="/Classroom" element={<Classroom />} />
          <Route path="/Lesson" element={<Lesson />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/Earnings" element={<Earnings />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}
