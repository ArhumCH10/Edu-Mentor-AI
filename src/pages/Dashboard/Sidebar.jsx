import { NavLink } from 'react-router-dom';
import { FaTh, FaUserAlt, FaRegChartBar,FaDollarSign  } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPlayLesson ,MdMessage  } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";


const Sidebar = () => {
  const menuItem = [
    {
      path: "/dashboardlinks/Dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/dashboardlinks/Profile",
      name: "Profile",
      icon: <FaUserAlt />
    },
    {
      path: "/dashboardlinks/Availability",
      name: "Availability",
      icon: <GrGroup />
    },
    {
      path: "/dashboardlinks/Classroom",
      name: "Classroom",
      icon: <SiGoogleclassroom />
    },
    {
      path: "/dashboardlinks/Lesson",
      name: "My Lesson",
      icon: <MdPlayLesson />
    },
    {
      path: "/dashboardlinks/Message",
      name: "Message",
      icon: <MdMessage   />
    },
    {
      path: "/dashboardlinks/Statistics",
      name: "Statistics",
      icon: <FaRegChartBar />
    },
    {
      path: "/dashboardlinks/Earnings",
      name: "My Earnings",
      icon: <FaDollarSign  />
    },
    {
      path: "/dashboardlinks/Settings",
      name: "Settings",
      icon: <IoIosSettings />
    },
  ];

  return (
    <div className="sidebar">
      <div className="top_section">
        <img src="logo.png" alt="logo" style={{ height: 60, width: 60, marginTop: 0 }} />
        <h1 style={{ display: "inline-block", font: "initial", margin: 'auto' }} >Edu Mentor Ai</h1>
      </div>
      {
        menuItem.map((item, index) => (
          <NavLink exact to={item.path} key={index} className="link" activeClassName="active">
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))
      }
    </div>
  );
};

export default Sidebar;
