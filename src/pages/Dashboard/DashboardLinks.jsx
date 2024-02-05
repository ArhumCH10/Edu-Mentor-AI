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
import {PrivateRoute} from '../../AuthDashboardRoutes';


export default function DashboardLinks() {
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route
            path="/Dashboard/"
            element={<PrivateRoute element={<Dashboard />} path="/Dashboard" />}
          />
          <Route
            path="/Profile/"
            element={<PrivateRoute element={<Profile />} path="/Profile" />}
          />
          <Route
            path="/Availability/"
            element={<PrivateRoute element={<Availability />} path="/Availability" />}
          />
          <Route
            path="/Classroom/"
            element={<PrivateRoute element={<Classroom />} path="/Classroom" />}
          />
          <Route
            path="/Lesson/"
            element={<PrivateRoute element={<Lesson />} path="/Lesson" />}
          />
          <Route
            path="/Message/"
            element={<PrivateRoute element={<Message />} path="/Message" />}
          />
          <Route
            path="/Statistics/"
            element={<PrivateRoute element={<Statistics />} path="/Statistics" />}
          />
          <Route
            path="/Earnings/*"
            element={<PrivateRoute element={<Earnings />} path="/Earnings" />}
          />
          <Route
            path="/Settings/"
            element={<PrivateRoute element={<Settings />} path="/Settings" />}
          />
        </Routes>
      </div>
    </div>
  );
}
