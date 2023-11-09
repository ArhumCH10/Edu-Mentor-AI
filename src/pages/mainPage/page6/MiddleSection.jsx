
function MiddleSection() {
  return (
    <div className="row line">
      <h1 className="mt-2 lining" style={{ fontSize: '58px', marginLeft: '80px' }}>
        Want to become Mentor With us
      </h1>
      <div className="col-lg-3">
        <div className="sparow"></div>
        <div className="bottom-left"></div>
      </div>
      <div className="col-lg-9 color-bg px-3">
        <p style={{ width: '80%' }}>
          Earn money sharing your expert knowledge with students. Sign up to start Mentoring online with mentor AI
        </p>
        <div className="row mt-3">
          <div className="col-lg-4">
            <img className="student" src="searchingpicture.png" alt="" />
            <h1>Search Students</h1>
          </div>
          <div className="col-lg-4">
            <img className="student" src="businesspicture.png" alt="" />
            <h1>Grow Business</h1>
          </div>
          <div className="col-lg-4">
            <img className="student" src="earningpicture.png" alt="" />
            <h1>Paid Securely</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <button type="submit" className="badge badge-pill p-2 mt-2">Become a Tutor</button>
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
