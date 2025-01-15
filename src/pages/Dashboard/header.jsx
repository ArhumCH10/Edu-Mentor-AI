import { IoIosNotifications } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { useLogout } from "../TeacherSignUpProcess/useLogout";
import { useAuth } from "../../AuthContext";
import toast from "react-hot-toast";
import { useUser } from "../../UserContext";

const Header = () => {
  const userData = useUser();
  const { mutate: logoutMutate } = useLogout();
  const { logoutFrontend } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [fullUsername, setFullUsername] = useState("");

  useEffect(() => {
    if (userData?.userData?.userData) {
      const { firstName, lastName } = userData.userData.userData;
      const username = `${firstName} ${lastName}`;
      setFullUsername(username);
    }
  }, [userData?.userData?.userData]);

  const level = 0;
  const money = 0;

  const handleLogout = async () => {
    try {
      logoutMutate();
      logoutFrontend();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div
      className={`header ${
        isScrolled ? "scrolled" : ""
      } flex justify-between items-center p-4 shadow-md`}
      style={{
        background: isScrolled ? "white" : "transparent",
        transition: "background 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Left Section: Welcome and Level */}
      <div className="flex items-center">
        <h4 className="mr-4">Welcome, {fullUsername}</h4>
        <div className="btn font-bold bg-green-400 hover:bg-green-600 text-white px-6 py-2 rounded-md w-28 text-center transition duration-300 ease-in-out">
          LEVEL {level}
        </div>
      </div>

      {/* Right Section: Icons and Money */}
      <div className="flex items-center space-x-4">
        <IoIosNotifications className="text-3xl" />
        <div className="btn font-bold bg-green-400 hover:bg-green-600 text-white px-4 py-2 w-28 rounded-md">
          US $ {money}
        </div>
        <VscSignOut
          className="text-3xl cursor-pointer logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
