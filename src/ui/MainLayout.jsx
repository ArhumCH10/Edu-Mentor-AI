import FifthOne from "../pages/mainPage/FifthOne";
import FirstOne from "../pages/mainPage/FirstOne";
import FourthOne from "../pages/mainPage/FourthOne";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import SecondOne from "../pages/mainPage/SecondOne";
import ThirdOne from "../pages/mainPage/ThirdOne";
import EightOne from "../pages/mainPage/EightOne";
import SeventhOne from "../pages/mainPage/SeventhOne";
import SixthOne from "../pages/mainPage/SixthOne";

const images = [
  "/firstpagepicturesStudents.png",
  "/firstpagepicturesStudents4.png",
  "/firstpagepicturesStudents6.png",
  "/firstpagepicturesStudents3.png",
];
const totalImages = images.length;

export default function MainLayout() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
