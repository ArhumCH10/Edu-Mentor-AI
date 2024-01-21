import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Video = ({ setActivePage, setActiveComponent }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  useEffect(() => {
    // Check if videoFile and thumbnailFile exist in localStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const storedVideoFile = userData.videoFile;
    const storedThumbnailFile = userData.thumbnailFile;
    const storedThumbnailPreview = userData.thumbnailPreview;

    if (storedVideoFile) {
      setVideoFile(storedVideoFile);
    }

    if (storedThumbnailFile) {
      setThumbnailFile(storedThumbnailFile);
      setThumbnailPreview(storedThumbnailPreview);
    }
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    setFile(file);

    // Read the file and set its preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailChange = (e) => {
    if (!videoFile) {
      return alert("First Upload Video File");
    }
    handleFileChange(e, setThumbnailFile, setThumbnailPreview);
  };

  const handleNext = () => {
    // Save video file and thumbnail information in local storage
    console.log(videoFile);
    console.log(thumbnailFile);

    if (videoFile) {
      const videoData = {
        name: videoFile.name,
        size: videoFile.size,
        type: videoFile.type,
        lastModified: videoFile.lastModified,
        // Add other properties you may need
      };

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const updatedUserData = { ...userData, videoFile: videoData };

      if (thumbnailFile) {
        const thumbnailData = {
          name: thumbnailFile.name,
          size: thumbnailFile.size,
          type: thumbnailFile.type,
          lastModified: thumbnailFile.lastModified,
          // Add other properties you may need
        };

        updatedUserData.thumbnailFile = thumbnailData;

        // Generate thumbnail preview and store it directly in localStorage
        const reader = new FileReader();
        reader.onloadend = () => {
          updatedUserData.thumbnailPreview = reader.result;
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        };
        reader.readAsDataURL(thumbnailFile);
      } else {
        // If no thumbnail, ensure to clear the stored thumbnail preview
        updatedUserData.thumbnailPreview = null;
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      }
    }

    // Continue with 'Next' logic
    setActivePage((prevPage) => prevPage + 1);
    setActiveComponent("Availability"); // Replace with the appropriate component
    // Add necessary logic for other pages/components
  };

  const backHandler = () => {
    // Add logic for handling 'Back' button click
    setActivePage((prevPage) => prevPage - 1);
    setActiveComponent("Description"); // Replace with the appropriate component
  };

  return (
    <div className="container mt-4" style={{ padding: "0em 10em" }}>
      {/* Partitions */}
      <div style={{ display: "flex" }}>
        {/* First Partition */}
        <div style={{ flex: 1, marginRight: "20px" }}>
          {/* Heading */}
          <h1 style={{ fontWeight: "bold" }}>Video introduction</h1>

          {/* Bold Paragraph */}
          <p style={{ fontWeight: "bold" }}>
            Add a horizontal video of up to 2 minutes
          </p>

          {/* Simple Paragraph */}
          <p>
            Introduce yourself to the students in the language you will be
            teaching
          </p>

          {/* Video File Input */}
          <input
            className="btn btn-primary mb-4 mt-4"
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, setVideoFile)}
            style={{
              background: "#F0F0F0",
              color: "black",
              fontWeight: "normal",
              border: "2px solid black",
              marginRight: "1em",
            }}
          />

          {/* Thumbnail Heading */}
          <h3 style={{ marginTop: "30px" }}>Add Thumbnail (Optional)</h3>

          {/* Thumbnail File Input */}
          <input
            className="btn btn-primary mb-4 mt-4"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            style={{
              background: "#7CFC00",
              color: "black",
              fontWeight: "bold",
              border: 0,
              marginRight: "1em",
            }}
          />

          {/* Display Thumbnail Preview */}
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        {/* Second Partition */}
        <div style={{ flex: 1, padding: "0px", margin: "0 40px" }}>
          {/* Video Requirements Section (unchanged) */}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={handleNext}
          className="btn btn-primary mb-4 mt-4"
          style={{
            background: "#7CFC00",
            color: "black",
            fontWeight: "bold",
            border: 0,
            float: "right",
          }}
        >
          Next
        </button>
        <button
          className="btn btn-primary mb-4 mt-4"
          style={{
            background: "grey",
            color: "black",
            fontWeight: "bold",
            border: 0,
            marginRight: "1em",
          }}
          onClick={backHandler}
        >
          Back
        </button>
      </div>
    </div>
  );
};

Video.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Video;
