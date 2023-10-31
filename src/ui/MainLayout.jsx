import FifthOne from '../pages/mainPage/FifthOne';
import FirstOne from '../pages/mainPage/FirstOne'
import FourthOne from '../pages/mainPage/FourthOne';
import NavBar from './NavBar'
import { useState, useEffect } from "react";

const images = ["/firstpagepicturesStudents.png", "/firstpagepicturesStudents4.png", "/firstpagepicturesStudents6.png", "/firstpagepicturesStudents3.png"];
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
    <NavBar currentImageIndex={currentImageIndex}/>
    <FirstOne currentImageIndex={currentImageIndex} images={images}/>
    <FourthOne />
    <FifthOne/>
    </>
  )
}
