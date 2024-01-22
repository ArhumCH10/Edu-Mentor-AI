import FifthOne from "../pages/mainPage/FifthOne";
import FirstOne from "../pages/mainPage/FirstOne";
import FourthOne from "../pages/mainPage/FourthOne";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SecondOne from "../pages/mainPage/SecondOne";
import ThirdOne from "../pages/mainPage/ThirdOne";
import EightOne from "../pages/mainPage/EightOne";
import SeventhOne from "../pages/mainPage/SeventhOne";
import SixthOne from "../pages/mainPage/SixthOne";
import { useNavigate, useLocation } from "react-router-dom";

const images = [
  "/firstpagepicturesStudents.png",
  "/firstpagepicturesStudents4.png",
  "/firstpagepicturesStudents6.png",
  "/firstpagepicturesStudents3.png",
];
const totalImages = images.length;

export default function MainLayout() {

  const location = useLocation();
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isVerified = searchParams.get("isVerified");
    
    // Check if isVerified is true or false
    if (isVerified === "true" && !toastShown) {
      setTimeout(() => {
        console.log("Showing toast");
        toast.success("Email Verified Successfully");
        // Clear the query parameter after showing the toast
        navigate("/", { replace: true });
        setToastShown(true);
      }, 0);
    } else if (isVerified === "false" && !toastShown) {
      setTimeout(() => {
        console.log("Showing error toast");
        toast.error("Email verification pending");
        setToastShown(true);
      }, 0);
    } else {
      console.log("No valid isVerified value found or toast already shown");
    }
  }, [location.search, navigate, toastShown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <NavBar currentImageIndex={currentImageIndex} />
      <FirstOne currentImageIndex={currentImageIndex} images={images} />
      <SecondOne />
      <ThirdOne />
      <FourthOne />
      <FifthOne />
      <SixthOne />
      <SeventhOne />
      <EightOne />

    </>
  );
}
