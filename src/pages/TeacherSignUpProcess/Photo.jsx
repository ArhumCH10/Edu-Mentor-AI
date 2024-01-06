import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { updateUser, selectUser } from "../../../store/userSlice";

const Photo = ({ activePage, setActivePage, setActiveComponent }) => {
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    // Set the image from user.photo

    if (user.photo) {
      setImage(user.photo);
    } else {
      // If user.photo is not available, you can use the stored previewImage in sessionStorage
      //   const storedPreviewImage = sessionStorage.getItem("previewImage");
      //   if (storedPreviewImage) {
      //     setImage(storedPreviewImage);
      //   }
      return;
    }
  }, [user.photo]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      // Update the local state with the new image URL
      setImage(imageUrl);

      // Update the user object in Redux state with the new photo URL
      dispatch(updateUser({ ...user, photo: imageUrl }));

      console.log(user);
      // Update the preview image in sessionStorage
      sessionStorage.setItem("previewImage", imageUrl);

      setZoom(1);
      setRotate(0);
    }
  };
  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(0.1, prevZoom - 0.1));
  };

  const handleRotateLeft = () => {
    setRotate((prevRotate) => prevRotate - 90);
  };

  const handleRotateRight = () => {
    setRotate((prevRotate) => prevRotate + 90);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const nextHandler = () => {
    // Check if an image is uploaded
    if (!image) {
      alert("Please upload a photo before proceeding to the next page");
      return;
    }

    setActivePage((prevPage) => prevPage + 1);
    switch (activePage) {
      case 1:
        setActiveComponent("Certification");
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("Certification");
    }
  };

  const backHandler = () => {
    setActivePage((prevPage) => prevPage - 1);
    switch (activePage) {
      case 1:
        setActiveComponent("About");
        break;
      // Add cases for other pages/components as needed
      default:
        setActiveComponent("About");
    }
  };
  return (
    <div style={{ display: "flex", padding: "0 120px", margin: "0 30px" }}>
      {/* Left Side */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ fontWeight: "bold" }}>Profile Photo</h2>
        <p style={{ fontWeight: "bold" }}>Make a great first impression</p>
        <p>
          Mentors who look friendly and professional get the most students
          during registration.
        </p>
        {!image && (
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
              onClick={handleButtonClick}
            >
              Upload Photo
            </button>
            <p className="mt-3">JPG or PNG format, maximum 5 MB</p>
          </div>
        )}

        <input
          type="file"
          accept=".jpg, .png"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {image && (
          <div
            style={{
              overflow: "hidden",
              width: "50%",
              height: "200px",
              position: "relative",
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {/* Display the image within a container div */}
            <img
              ref={imgRef}
              src={image}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                transform: `scale(${zoom}) rotate(${rotate}deg)`,
                transition: "transform 0.2s ease-out",
              }}
            />
          </div>
        )}

        {image && (
          <div
            className="mt-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <div onClick={handleZoomIn} style={{ cursor: "pointer" }}>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink" // Replace xmlns:xlink with xmlnsXlink
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>zoom-in</title>
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
                        transform="translate(-308.000000, -1139.000000)"
                        fill="#000000"
                      >
                        <path
                          d="M321.46,1163.45 C315.17,1163.45 310.07,1158.44 310.07,1152.25 C310.07,1146.06 315.17,1141.04 321.46,1141.04 C327.75,1141.04 332.85,1146.06 332.85,1152.25 C332.85,1158.44 327.75,1163.45 321.46,1163.45 L321.46,1163.45 Z M339.688,1169.25 L331.429,1161.12 C333.592,1158.77 334.92,1155.67 334.92,1152.25 C334.92,1144.93 328.894,1139 321.46,1139 C314.026,1139 308,1144.93 308,1152.25 C308,1159.56 314.026,1165.49 321.46,1165.49 C324.672,1165.49 327.618,1164.38 329.932,1162.53 L338.225,1170.69 C338.629,1171.09 339.284,1171.09 339.688,1170.69 C340.093,1170.3 340.093,1169.65 339.688,1169.25 L339.688,1169.25 Z M326.519,1151.41 L322.522,1151.41 L322.522,1147.41 C322.522,1146.85 322.075,1146.41 321.523,1146.41 C320.972,1146.41 320.524,1146.85 320.524,1147.41 L320.524,1151.41 L316.529,1151.41 C315.978,1151.41 315.53,1151.59 315.53,1152.14 C315.53,1152.7 315.978,1153.41 316.529,1153.41 L320.524,1153.41 L320.524,1157.41 C320.524,1157.97 320.972,1158.41 321.523,1158.41 C322.075,1158.41 322.522,1157.97 322.522,1157.41 L322.522,1153.41 L326.519,1153.41 C327.07,1153.41 327.518,1152.96 327.518,1152.41 C327.518,1151.86 327.07,1151.41 326.519,1151.41 L326.519,1151.41 Z"
                          id="zoom-in"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div onClick={handleZoomOut} style={{ cursor: "pointer" }}>
                <svg
                  width="20px"
                  height="20px"
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
                    <title>zoom-out</title>
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
                        transform="translate(-360.000000, -1139.000000)"
                        fill="#000000"
                      >
                        <path
                          d="M373.46,1163.45 C367.17,1163.45 362.071,1158.44 362.071,1152.25 C362.071,1146.06 367.17,1141.04 373.46,1141.04 C379.75,1141.04 384.85,1146.06 384.85,1152.25 C384.85,1158.44 379.75,1163.45 373.46,1163.45 L373.46,1163.45 Z M391.688,1169.25 L383.429,1161.12 C385.592,1158.77 386.92,1155.67 386.92,1152.25 C386.92,1144.93 380.894,1139 373.46,1139 C366.026,1139 360,1144.93 360,1152.25 C360,1159.56 366.026,1165.49 373.46,1165.49 C376.672,1165.49 379.618,1164.38 381.932,1162.53 L390.225,1170.69 C390.629,1171.09 391.284,1171.09 391.688,1170.69 C392.093,1170.3 392.093,1169.65 391.688,1169.25 L391.688,1169.25 Z M378.689,1151.41 L368.643,1151.41 C368.102,1151.41 367.663,1151.84 367.663,1152.37 C367.663,1152.9 368.102,1153.33 368.643,1153.33 L378.689,1153.33 C379.23,1153.33 379.669,1152.9 379.669,1152.37 C379.669,1151.84 379.23,1151.41 378.689,1151.41 L378.689,1151.41 Z"
                          id="zoom-out"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div onClick={handleRotateLeft} style={{ cursor: "pointer" }}>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M10 10.55L6 14.55L2 10.55"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.34 18.0801C9.64796 19.3895 11.3695 20.2047 13.2112 20.3872C15.053 20.5697 16.901 20.1081 18.4405 19.0808C19.98 18.0535 21.1157 16.5242 21.654 14.7534C22.1924 12.9827 22.1002 11.0802 21.3931 9.36988C20.686 7.65953 19.4077 6.24713 17.7761 5.37354C16.1445 4.49996 14.2605 4.21912 12.445 4.57887C10.6295 4.93861 8.99496 5.91668 7.81976 7.34645C6.64457 8.77621 6.00146 10.5692 6 12.4199V14.1499"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <div onClick={handleRotateRight} style={{ cursor: "pointer" }}>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M14 10.55L18 14.55L22 10.55"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M15.65 18.08C14.3398 19.387 12.6171 20.1993 10.7752 20.3786C8.93336 20.558 7.0863 20.0931 5.54864 19.0634C4.01099 18.0337 2.87786 16.5028 2.34232 14.7314C1.80677 12.96 1.90192 11.0577 2.61154 9.34859C3.32116 7.63947 4.60135 6.22926 6.23407 5.35811C7.86679 4.48697 9.75103 4.20879 11.5658 4.571C13.3806 4.93321 15.0137 5.91327 16.1869 7.34444C17.3601 8.77561 18.0009 10.5693 18 12.4199V14.1499"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Tips for an Amazing Photo</h2>

        <div style={{ display: "flex" }}>
          {/* You can replace the src URLs with your own images */}
          <img src="pics.png" alt="Tip 1" style={{ width: "40%" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center" }} className="mt-4">
          <svg
            style={{ color: "green", width: "25px", marginTop: "-15px" }}
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
          <p style={{ marginLeft: "3px" }}>Smile and look at the camera</p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            style={{ color: "green", width: "25px", marginTop: "-15px" }}
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
          <p style={{ marginLeft: "3px" }}>Frame your head and shoulders</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            style={{ color: "green", width: "25px", marginTop: "-15px" }}
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
          <p style={{ marginLeft: "3px" }}>
            Your photo is centered and upright
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            style={{ color: "green", width: "25px", marginTop: "-15px" }}
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
          <p style={{ marginLeft: "3px" }}>
            Use neutral lighting and background
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            style={{ color: "green", width: "25px", marginTop: "-15px" }}
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
          <p style={{ marginLeft: "3px" }}>
            Your face and eyes are fully visible
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            style={{ color: "green", width: "25px", marginTop: "-15px" }}
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
          <p style={{ marginLeft: "3px" }}>
            Avoid logos or contact information
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            style={{ color: "green", width: "25px", marginTop: "-15px" }}
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
          <p style={{ marginLeft: "3px" }}>
            You are the only person in the photo
          </p>
        </div>

        {/* Add your other SVG and Text combinations here */}

        {/* Back and Next buttons */}
        <div style={{ marginTop: "5px" }}>
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
          <button
            className="btn btn-primary mb-4 mt-4"
            style={{
              background: "#7CFC00",
              color: "black",
              fontWeight: "bold",
              border: 0,
            }}
            onClick={nextHandler}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

Photo.propTypes = {
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
};

export default Photo;
