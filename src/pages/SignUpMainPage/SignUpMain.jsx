import SignUpPage from "../SignUpPage/SignUpPage";

function SignUpMain() {
  return (
    <>
      <SignUpPage />
      <div style={{ background: "white", display: "flex", marginTop: "50px" }}>
        {/* First Row */}
        <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
          <img src="dollar.png" alt="Image 1" style={{ width: "50%" }} />
          <div></div>
          <h2>
            <strong>Set your own rate</strong>
          </h2>
          <p>
            Choose your hourly rate and change it anytime. On average, mentors
            charge $15-25 per hour.
          </p>
        </div>
        <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
          <img src="teacher.png" alt="Image 2" style={{ width: "50%" }} />
          <div></div>
          <h2>
            <strong>Mentor anytime, anywhere</strong>
          </h2>
          <p>
            Decide when and how many hours you want to mentor. No minimum time
            commitment or fixed schedule. Be your own boss!
          </p>
        </div>
        <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
          <img src="money.png" alt="Image 3" style={{ width: "50%" }} />
          <div></div>

          <h2>
            <strong>Grow professionally</strong>
          </h2>
          <p>
            Make your profile and increase you levels and grow as much as you
            can. You’ll get all the help you need from our team to grow.
          </p>
        </div>
      </div>
      {/* Second Row */}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "20px", marginTop: "9em" }}>
          <p style={{ fontSize: "2.9em" }}>
            <strong>Mentor students from over 180 countries</strong>
          </p>
          <p>
            Edu Mentor Ai mentors teach 800,000+ students globally. Join us and
            you’ll have everything you need to mentor successfully.
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            <p style={{ marginLeft: "8px" }}>Steady stream of new students</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            <p style={{ marginLeft: "8px" }}>Smart calendar</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            <p style={{ marginLeft: "8px" }}>Interactive classroom</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            <p style={{ marginLeft: "8px" }}>Convenient payment methods</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
            <p style={{ marginLeft: "8px" }}>Increase your Levels</p>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "2em",
              margin: "auto",
              backgroundColor: "#4DFF00",
              color: "black",
              fontWeight: "bold",
              borderRadius: "1em",
              padding: "0.5em 1em",
              cursor: "pointer",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s",
            }}
          >
            Sign Up to teach
          </button>
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <img src="girl.png" alt="Image 5" style={{ width: "100%" }} />
        </div>
      </div>
      <div style={{ background: "white", padding: "80px" }}>
        <div
          style={{
            background: "black",
            color: "white",
            display: "flex",
            padding: "20px 80px",

          }}
        >
          {/* Left Partitions */}
          <div style={{ flex: 1 }}>
            <img
              src="teaching.png"
              alt="Left Image 1"
              style={{ width: "90%" }}
            />
          </div>

          {/* Right Partition */}
          <div style={{ flex: 1, paddingRight: "10em" }}>
            <h1 style={{ fontSize: "60px" }}>
              <strong>Get paid to mentor online</strong>
            </h1>
            <p>
              Connect with thousands of learners around the world and mentor
              them from your living room
            </p>
            <button
              type="submit"
              style={{
                marginTop: "4em",
                margin: "auto",
                backgroundColor: "#4DFF00",
                color: "black",
                fontWeight: "bold",
                borderRadius: "1em",
                padding: "0.5em 1em",
                cursor: "pointer",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s",
              }}
            >
              Why Waiting Still ?
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#52B9E7",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* First Partition */}
        <div style={{ flex: 1, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="logo.png" alt="Image 1" style={{ width: "25%" }} />
            <h4>
              <strong>Edu Mentor AI</strong>
            </h4>
          </div>
        </div>

        {/* Second Partition */}
        <div style={{ flex: 1, padding: "20px" }}>
          <strong>For Students</strong>
          <p>Find a Mentor</p>
        </div>

        {/* Third Partition */}
        <div style={{ flex: 1, padding: "20px" }}>
          <strong>For Mentors</strong>
          <p>Become a Mentor</p>
        </div>

        {/* Fourth Partition */}
        <div style={{ flex: 1, padding: "20px" }}>
          <strong>Our Contact</strong>
          <p>Edumentorai10@gmail.com </p>
          <p>Lahore, Pakistan</p>
        </div>
      </div>
      <div style={{ background: "black", height: "30px", textAlign: "center" }}>
        <p style={{ color: "white" }}>
          Copyright, Edu Mentor Ai 2030, All rights reserved.
        </p>
      </div>
    </>
  );
}

export default SignUpMain;
