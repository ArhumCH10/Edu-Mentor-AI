import PropTypes from "prop-types";

const Video = ({ setActivePage, setActiveComponent }) => {
  const handleNext = () => {
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
            Add horizontal video of upto 2 minutes
          </p>

          {/* Simple Paragraph */}
          <p>
            Introduce yourself to the students in the language you will be
            teaching
          </p>

          {/* YouTube Video Preview */}
          <div>
            {/* YouTube Video Preview */}
            <iframe
              style={{ borderRadius: "8px" }}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="YouTube Video Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Re-record Button */}
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginTop: "10px" }}
          >
            Re-record
          </button>

          {/* Thumbnail Heading */}
          <h3 style={{ marginTop: "30px" }}>Add Thumbnail (Optional)</h3>

          {/* Paragraph */}
          <p>
            Dont worry if you dont have a thumbnail ready, we will use the
            preview above
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="btn btn-primary mb-4 mt-4"
              style={{
                background: "#7CFC00",
                color: "black",
                fontWeight: "bold",
                border: 0,
                marginRight: "1em",
              }}
              //   onClick={handleButtonClick}
            >
              Upload Thumbnail
            </button>
            <p className="mt-3">JPEG or PNG formats only, size of 20Mb max</p>
          </div>
        </div>

        {/* Second Partition */}
        <div style={{ flex: 1, padding: "0px", margin: "0 40px" }}>
          {/* First Div with Light Grey Background */}
          <div
            style={{
              background: "#f2f2f2",
              padding: "30px",
              borderRadius: "8px",
            }}
          >
            {/* Heading */}
            <h2 style={{ fontWeight: "bold" }}>Video Requirements</h2>
            {/* Paragraph */}
            <p>Make sure your video meets the requirements to get approved</p>
          </div>

          {/* Second Div with SVG and Bullets */}
          <div
            style={{
              marginTop: "20px",
              background: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            {/* SVG and Heading */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Replace with your SVG */}
              <svg
                style={{ color: "green", width: "35px", marginTop: "-15px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {/* Heading */}
              <h1 style={{ marginBottom: "20px" }}>Do</h1>
            </div>
            {/* Bullet Points */}
            {/* Bullet Points with Margin */}
            <ul style={{ paddingLeft: "20px", marginTop: "0px" }}>
              <li style={{ marginBottom: "10px" }}>
                Your video should be between 30 seconds and 2 minutes long
              </li>
              <li style={{ marginBottom: "10px" }}>
                Record in horizontal mode and at eye level
              </li>
              <li style={{ marginBottom: "10px" }}>
                Use good lighting and neutral background
              </li>
              <li style={{ marginBottom: "10px" }}>
                Use a stable surface so that your video does not appear that
                shaky
              </li>
              <li style={{ marginBottom: "10px" }}>
                Make sure your face and eyes are visible
              </li>
              <li style={{ marginBottom: "10px" }}>
                Highlight your teaching experience and any relevant teaching
                certifications
              </li>
              <li style={{ marginBottom: "10px" }}>
                Greet your students warmly and invite them to book a lesson
              </li>
            </ul>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Replace with your SVG */}
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>cross-circle</title>
                  <desc>Created with Sketch Beta.</desc>
                  <defs></defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Icon-Set"
                      transform="translate(-570.000000, -1089.000000)"
                      fill="#ff0000"
                    >
                      <path
                        d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z"
                        id="cross-circle"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              {/* Heading */}
              <h1
                style={{
                  marginBottom: "25px",
                  marginTop: "20px",
                }}
              >
                Dont
              </h1>
            </div>
            {/* Bullet Points */}
            {/* Bullet Points with Margin */}
            <ul style={{ paddingLeft: "20px", marginTop: "-10px" }}>
              <li style={{ marginBottom: "10px" }}>
                Include your surname or any contact details
              </li>
              <li style={{ marginBottom: "10px" }}>Include logos or links</li>
              <li style={{ marginBottom: "10px" }}>
                Use slideshows or presentation
              </li>
              <li style={{ marginBottom: "10px" }}>
                Have any other person visible in your video
              </li>
              <li style={{ marginBottom: "10px" }}>
                Make sure your face and eyes are visible
              </li>
              <li style={{ marginBottom: "10px" }}>
                Highlight your teaching experience and any relevant teaching
                certifications
              </li>
              <li style={{ marginBottom: "10px" }}>
                Greet your students warmly and invite them to book a lesson
              </li>
            </ul>
          </div>
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
