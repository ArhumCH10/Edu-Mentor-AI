import Header from './header';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

export default function Profile() {
  const profileName = 'Ghous KinG';
  const Dics = 'Teaches computer science lessons, Data Science lessons, Python lessons, JavaScript lessons';
  const ratings = 4.5;
  const TotalReviws = 25;
  const MemberDate = '25 Jan';
  const LastLessonTought = '2 hrs';
  const TotalLesson = 41;
  const LessonTime = 100;
  const MonthEarn = 100;
  const CurrentMonth = 'January';
  const aboutMeParagraph = `Hi everyone, I've graduated in Software Engineering. I can teach you Computer Science subjects including Introduction to Computing, Programming Fundamentals in C++ / Java / Python / JavaScript / Ruby on Rails, Web Development, Mathematics, Object Oriented Programming, Data Structures, Machine Learning.
  After graduation, I have been working as a Machine Learning Engineer. In these 2 years working as an ML Engineer, I became a Python expert. I was able to understand and visualize data and give training data to Machine Learning models for getting better results.
  I've been teaching Calculus, Programming, & Machine Learning concepts to interns. After giving a brief lecture about the relevant topic, I give them assignments.
  I've been teaching Calculus, Programming, & Machine Learning concepts to interns. After giving a brief lecture about the relevant topic, I give them assignments.
  I've been teaching Calculus, Programming, & Machine Learning concepts to interns. After giving a brief lecture about the relevant topic, I give them assignments.
  I've been teaching Calculus, Programming, & Machine Learning concepts to interns. After giving a brief lecture about the relevant topic, I give them assignments.
`;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoId = 'rEGSx47bg80';

  const videoOpts = {
    height: '230',
    width: '350',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
  };

  const generateStars = (rating) => {
    const stars = [];
    let roundedRating = rating;

    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= 1) {
        stars.push(<span key={i} className="star full-star">&#9733;</span>);
      } else if (roundedRating == 0.5) {
        stars.push(<span key={i} className="star half-star">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star empty-star">&#9734;</span>);
      }
      roundedRating -= 1;
    }

    return stars;
  };

  const [activeTab, setActiveTab] = useState('Education');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderResumeContent = () => {
    switch (activeTab) {
      case 'Education':
        return (
          <div className='Education'>
            Education
          </div>
        );
      case 'WorkExperience':
        return (
          <div className='WorkExperience'>
            WorkExperience
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.

          </div>
        );
      case 'Certifications':
        return (
          <div className='Certifications'>
            Certifications
          </div>
        );
      default:
        return null;
    }
  };

  const [activeSpecialty, setActiveSpecialty] = useState('DataScience');

  const handleSpecialtyClick = (specialty) => {
    setActiveSpecialty(specialty);
  };

  const renderSpecialtyContent = () => {
    switch (activeSpecialty) {
      case 'DataScience':
        return (

          <div>
            Data Science content
          </div>
        );
      case 'Python':
        return (
          <div>
            Python content
          </div>
        );
      case 'JavaScript':
        return (

          <div>
            JavaScript content
          </div>
        );
      case 'ComputerScience':
        return (

          <div>
            Computer Science content
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique cum earum sit impedit, ea mollitia atque beatae corporis nemo eos in provident sapiente expedita nam esse distinctio, neque exercitationem reiciendis.

          </div>
        );
      default:
        return null;
    }
  };

  const countFiveStarReviews = 22;
  const countFourStarReviews = 2;
  const countThreeStarReviews = 1;
  const countTwoStarReviews = 0;
  const countOneStarReviews = 0;

  const [percentageFiveStar, setPercentageFiveStart] = useState(0);
  const [percentageFourStar, setPercentageFourStart] = useState(0);
  const [percentageThreeStar, setPercentageThreeStart] = useState(0);
  const [percentageTwoStar, setPercentageTwoStart] = useState(0);
  const [percentageOneStar, setPercentageOneStart] = useState(0);
  useEffect(() => {
    // Calculate the percentage
    const calculatedPercentageFiveStar = (countFiveStarReviews / TotalReviws) * 100;
    setPercentageFiveStart(calculatedPercentageFiveStar);
    const calculatedPercentageFourStar = (countFourStarReviews / TotalReviws) * 100;
    setPercentageFourStart(calculatedPercentageFourStar);
    const calculatedPercentageThreeStar = (countThreeStarReviews / TotalReviws) * 100;
    setPercentageThreeStart(calculatedPercentageThreeStar);
    const calculatedPercentageTwoStar = (countTwoStarReviews / TotalReviws) * 100;
    setPercentageTwoStart(calculatedPercentageTwoStar);
    const calculatedPercentageOneStar = (countOneStarReviews / TotalReviws) * 100;
    setPercentageOneStart(calculatedPercentageOneStar);

  }, [TotalReviws]);
  return (
    <>
      <Header />
      {/* <h1>Hello this is Profile page</h1> */}
      <div className="Profile-container ">
        <div className="Profile ">
          <div >
            <img src="/king.jpg" alt="ProfilePic" style={{ height: '150px', width: '150px', borderRadius: '50px' }} />
          </div>
          <div ><strong>{profileName}</strong> </div>
          <div className="mx-3"><small> {Dics} </small> </div>
          <div> <span style={{ color: 'gold' }}> {generateStars(ratings)} </span><strong>{ratings} ({TotalReviws} reviews)</strong>  </div>
          <div>
            <div><strong>Member Since {MemberDate}</strong></div>
            <div><strong>Last Lesson Tought {LastLessonTought}</strong></div>
            <div><strong>Total Lesson Tought {TotalLesson}</strong></div>
            <div><strong>Lesson on Time {LessonTime}%</strong></div>
            <div><strong>Earned in {CurrentMonth} ${MonthEarn}</strong></div>
          </div>


        </div>
        <div className="Portfolio-video " >
          <h4 style={{ marginLeft: 10 }}>Portfolio Video</h4>
          {!isVideoPlaying && (
            <>
              <div className="video-thumbnail">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                  alt="Video Thumbnail"
                  className="thumbnail-image"
                  height={230}
                  width={350}
                />
                <div className="play-button-overlay" onClick={handleVideoClick}>
                  ▶
                </div>
              </div>
            </>
          )}
          {isVideoPlaying && (
            <YouTube
              videoId={videoId}
              opts={videoOpts}
              onReady={(event) => event.target.playVideo()}
            />
          )}
        </div>
        <div className="About ">
          <h4 >About</h4>
          <div style={{ whiteSpace: 'pre-line' }}>
            <small>
              {aboutMeParagraph}
            </small>
          </div>
        </div>
        <div className="Resume ">
          <div>
            <h4>Resume</h4>
            <div className="Resume-navbar">
              <div
                className={`Resume-nav-item ${activeTab === 'Education' ? 'Resume-active' : ''}`}
                onClick={() => handleTabClick('Education')}
              >
                Education
              </div>
              <div
                className={`Resume-nav-item ${activeTab === 'WorkExperience' ? 'Resume-active' : ''}`}
                onClick={() => handleTabClick('WorkExperience')}
              >
                Work Experience
              </div>
              <div
                className={`Resume-nav-item ${activeTab === 'Certifications' ? 'Resume-active' : ''}`}
                onClick={() => handleTabClick('Certifications')}
              >
                Certifications
              </div>
            </div>
            <div className="Resume-content">
              {renderResumeContent()}
            </div>
            <div>
              <h4>Specialties</h4>
              <div className="Resume-navbar">
                <div
                  className={`Resume-nav-item ${activeSpecialty === 'DataScience' ? 'Resume-active' : ''}`}
                  onClick={() => handleSpecialtyClick('DataScience')}
                >
                  Data Science
                </div>
                <div
                  className={`Resume-nav-item ${activeSpecialty === 'Python' ? 'Resume-active' : ''}`}
                  onClick={() => handleSpecialtyClick('Python')}
                >
                  Python
                </div>
                <div
                  className={`Resume-nav-item ${activeSpecialty === 'JavaScript' ? 'Resume-active' : ''}`}
                  onClick={() => handleSpecialtyClick('JavaScript')}
                >
                  JavaScript
                </div>
                <div
                  className={`Resume-nav-item ${activeSpecialty === 'ComputerScience' ? 'Resume-active' : ''}`}
                  onClick={() => handleSpecialtyClick('ComputerScience')}
                >
                  Computer Science
                </div>
              </div>
              <div className="Resume-content">{renderSpecialtyContent()}</div>
            </div>
          </div>
        </div>
        <div className="Feedback ">
          <h2>
            What students say
          </h2>
          <div className="row mx-2" >
          <div className="feedback-details" >
            <div className="row " >
              <div className="col-md-2 mx-3" style={{  padding: '1rem' }}>
                <div className="row">
                  <h1 style={{ color: 'black', fontSize: '38px', marginBottom: 0 }}>
                    {ratings}
                  </h1>
                </div>
                <div className="row">
                  <span style={{ color: 'black', fontSize: '32px', marginTop: 0 }}> {generateStars(ratings)} </span>
                </div>
                <div className="row">
                  <span> {TotalReviws} reviews</span>
                </div>
              </div>
              <div className="col-md-9" >
                <div className="row">
                  <div className="col-md-1" style={{marginTop:10}} >
                    <span className="rating-number">5</span>
                  </div>
                  <div className="col-md-10 " style={{ marginTop:16,marginLeft:'-40px' }}>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${percentageFiveStar}%` }}
                        aria-valuenow={percentageFiveStar}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                    <div className="col-md-1 "style={{marginTop:10}}  >
                    <span >({countFiveStarReviews})</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-1">
                    <span className="rating-number">4</span>
                  </div>
                  <div className="col-md-10" style={{ marginTop:5,marginLeft:'-40px' }}>
                    <div className="progress">
                      <div
                        className="progress-bar bg-custom"
                        role="progressbar"
                        style={{ width: `${percentageFourStar}%` }}
                        aria-valuenow={percentageFourStar}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div className="col-md-1" >
                    <span >({countFourStarReviews})</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-1">
                    <span className="rating-number">3</span>
                  </div>
                  <div className="col-md-10" style={{ marginTop:5,marginLeft:'-40px' }}>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${percentageThreeStar}%` }}
                        aria-valuenow={percentageThreeStar}
                        aria-valuemin="0"
                        aria-valuemax="50"
                      ></div>
                    </div>
                  </div>
                  <div className="col-md-1" >
                    <span >({countThreeStarReviews})</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-1">
                    <span className="rating-number">2</span>
                  </div>
                  <div className="col-md-10" style={{ marginTop:5,marginLeft:'-40px' }}>
                    <div className="progress">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: `${percentageTwoStar}%` }}
                        aria-valuenow={percentageTwoStar}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div className="col-md-1" >
                    <span >({countTwoStarReviews})</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-1">
                    <span className="rating-number">1</span>
                  </div>
                  <div className="col-md-10" style={{ marginTop:5,marginLeft:'-40px' }}>
                    <div className="progress">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: `${percentageOneStar}%` }}
                        aria-valuenow={percentageOneStar}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div className="col-md-1" >
                    <span >({countOneStarReviews})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="row mx-2 my-1" >
            <h1>
            Some reviews Display Here
            </h1> 
          </div>

        </div>
        <div className="Review-btn">
        <button type="button" className="btn btn-outline-dark">Show more Review</button>
        </div>
      </div>
    </>
  )
}