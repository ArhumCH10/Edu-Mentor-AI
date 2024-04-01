import Header from './header';
import { useState, useEffect, useRef } from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import ReactPlayer from 'react-player';
import { useUser } from '../../UserContext';
import { useGetVideo } from './useGetVideo';
import { Backend_URI } from '../../Config/Constant';
import styled from "styled-components";
import { usePhoto } from '../TeacherSignUpProcess/usePhoto';
import { useGetPhoto } from '../TeacherSignUpProcess/useGetphoto';
import Modal from '../../ui/TeacherModal';
import Form from '../../ui/TeacherForm';
import { useForm } from 'react-hook-form';
import Button from '../../ui/TeacherButton';
import FormRow from "../../ui/FormRow";
import StyledFormRow from "../../ui/TeacherStyledFormRow";
import Input from "../../ui/TeacherInput";
import { useAbout } from '../TeacherSignUpProcess/useAbout';
import FileInput from '../../ui/FileInput';
import { useVideo } from '../TeacherSignUpProcess/useVideo';

// const LevelBadge = styled.div`
//   position: absolute;
//   bottom: 1rem;
//   right: -2rem; 
//   background-color: #00b22d; 
//   color: white;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   border-radius: 2.5rem;
//   font-size: 0.8rem;
//   font-weight: bold;
//   text-transform: uppercase;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
//   z-index: 2; 
// `;

const ImageContainer = styled.div`
  width: 100px; 
  height: 100px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover::after {
    content: '📷';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    border-radius: 50%;
  }
`;

const EditIcon = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
  /* You can use a real edit icon here */
  &:after {
    content: "✏️";
  }
`;

export default function Profile() {
  const userData = useUser();
  const photoUrl = useGetPhoto(); 
  const [photo, setPhoto] = useState(""); 
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [showForm, setShowForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoData = useGetVideo();
  const [fullUsername, setFullUsername] = useState('');
  const [aboutMeParagraph, setAboutMeParagraph] = useState('');
  const [teachLesson, setTeachLesson] = useState('');
  const [educations, setEducations] = useState([]);
  const [teachingExperience, setTeachingExperience] = useState('');
  const [certificates, setCertificates] = useState([]);
  //const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideo, setIsVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const { mutate } = usePhoto(setLoading);
  const { mutate: aboutMutation } = useAbout(setLoading);
  const { mutate: videoMutation } = useVideo(setLoading);
  const [isThubmnail, setIsThumbnail] = useState('');
  const fileInputRef = useRef();
  //const [speciality, setSpeciality] = useState('');

 // const videoRef = useRef(null);


  // const handleVideoClick = () => {
  //   if (videoRef.current) {
  //     setIsVideoPlaying(!isVideoPlaying);

  //     if (!isVideoPlaying) {
  //       videoRef.current.play().catch((error) => {
  //         console.error('Error playing video:', error);
  //       });
  //     } else {
  //       videoRef.current.pause();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (videoRef.current) {
  //     // Add event listener for video loadedmetadata
  //     videoRef.current.addEventListener('loadedmetadata', () => {
  //       // Video has loaded, you can do additional checks or operations here
  //       console.log('Video loaded');
  //     });

  //     // Cleanup event listener on component unmount
  //     return () => {
  //       videoRef.current.removeEventListener('loadedmetadata', () => {
  //         console.log('Removing event listener');
  //       });
  //     };
  //   }
  // }, [videoRef]);

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleVideoModal = () => {
    setShowVideo(false);
  };

  function onSubmit(data) {
    const { firstName, lastName, subject } = data;
    const username = `${firstName} ${lastName}`;
    setFullUsername(username);
    const Discription = `Teaches ${subject} lesson`;
    setTeachLesson(Discription);
    try {
      aboutMutation({
        firstName: firstName,
        lastName: lastName,
        subject: subject,
      });
      handleCloseModal(); 
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  }

  function onVideoSubmit(data) {
    const { video, thumbnail } = data;
    const videoFile = video.target.files[0];
    console.log("video: ", videoFile);

    const thumbnailFile = thumbnail.target.files[0];
    try {
      videoMutation({
        data: videoFile,
        thumbnail: thumbnailFile
      });
      handleVideoModal(); 
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setLoading(false);
    console.log("loading:", loading);
    setPhoto(URL.createObjectURL(file));
    try {
      mutate({
        fileStore: file,
      });
    setLoading(false);
    } catch (error) {
      console.error("Mutation failed:", error);
      setLoading(false);
    }
    setLoading(false);
  };  

  useEffect(() => {
    setPhoto(photoUrl);
  }, [photoUrl]);

  useEffect(() => {
    console.log(isVideo,isThubmnail);
    if (videoData?.videoData) {
      setIsVideo(videoData.videoData.data);
      setIsThumbnail(videoData.videoData.thumbnail);
      //console.log(videoData.videoData.data);
    }
  }, [videoData?.videoData])

  useEffect(() => {
    if (userData?.userData?.userData) {
      const { firstName, lastName } = userData.userData.userData;
      const username = `${firstName} ${lastName}`;
      setFullUsername(username);
      const { introduceYourself, teachingExperience, motivateStudents, catchyHeadline } = userData.userData.userData.profileDescription;
      const about_me = `${introduceYourself}${motivateStudents}${catchyHeadline}`;
      setAboutMeParagraph(about_me);
      setTeachingExperience(teachingExperience);
      const { subjectsTaught } = userData.userData.userData;
      const Discription = `Teaches ${subjectsTaught} lesson`;
      setTeachLesson(Discription);
      const { educations } = userData.userData.userData;
      setEducations(educations);
      const { certifications } = userData.userData.userData;
      setCertificates(certifications);

    }
  }, [userData?.userData?.userData]);

  const ratings = 0;
  const TotalReviws = 0;
  const MemberDate = '25 Jan';
  const LastLessonTought = '0';
  const TotalLesson = 0;
  const LessonTime = 60;
  const MonthEarn = 0;
  const currentDate = new Date();
  const CurrentMonth = currentDate.toLocaleString('default', { month: 'long' });

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
          <div className='Resume-content' >
            {educations.map((edu, index) => {
              return (
                <div key={index} className="row">
                  <div className="col-2">
                    {`${edu.yearsOfStudyFrom} - ${edu.yearsOfStudyTo || '2023'}`}
                  </div>
                  <div className="col-10">
                    <div className="row">{edu.university}</div>
                    <div className="row" style={{ marginLeft: '-22px' }}><small>{`${edu.degree} in ${edu.degreeType}`}</small></div>
                    {edu.educationPhoto ?
                      (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'green' }}><RiVerifiedBadgeFill style={{ marginTop: '-5px' }} /> Education Verified</small></div>) :
                      (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'red' }}><TiDelete style={{ marginLeft: '-5px', marginTop: '-5px', fontSize: '1.1rem' }} /> Education Not Verified</small></div>)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      case 'WorkExperience':
        return (
          <div className='Resume-content'>
            {teachingExperience ? (<div>{teachingExperience}</div>) : (<div>N/A</div>)}
          </div>
        );
      case 'Certifications':
        return (
          <div className='Resume-content'>
            {certificates.map((cert, index) => {
              return (
                <div key={index} className="row">
                  <div className="col-2">
                    {`${cert.yearsOfStudyFrom} - ${cert.yearsOfStudyTo || '2023'}`}
                  </div>
                  <div className="col-10">
                    <div className="row">{cert.subject}</div>
                    <div className="row" style={{ marginLeft: '-22px' }}><small>{`${cert.certificate} By ${cert.issuedBy}`}</small></div>
                    {cert.certificationPhoto ?
                      (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'green' }}><RiVerifiedBadgeFill style={{ marginTop: '-5px' }} /> Certificate Verified</small></div>) :
                      (<div className="row" style={{ marginLeft: '-22px', color: 'green' }}><small style={{ color: 'red' }}><TiDelete style={{ marginLeft: '-5px', marginTop: '-5px', fontSize: '1.1rem' }} /> Certificate Not Verified</small></div>)}
                  </div>
                </div>
              );
            })}
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

  const countFiveStarReviews = 0;
  const countFourStarReviews = 0;
  const countThreeStarReviews = 0;
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
      <div className="Profile-container ">
        <div className="Profile ">
          <div className="Profile-Top">
          <EditIcon onClick={() => setShowForm((show) => !show)} />
         <ImageContainer onClick={() => fileInputRef.current.click()}>
          <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageUpload}
              /> 
            {photo || photoUrl ? <img src={photo} /> : 
             <img src={"/public/default-user.jpg"}/> }
            {/* <LevelBadge>New Student</LevelBadge> */}
            </ImageContainer>
            <div ><strong>{fullUsername}</strong> </div>
            <div className="mx-3"><small> {teachLesson} </small> </div>
            <div> <span style={{ color: 'gold' }}> {generateStars(ratings)} </span><strong>{ratings} ({TotalReviws} reviews)</strong>  </div>
        </div>

        {showForm && <Modal onClose={handleCloseModal}>
           
           <Form onSubmit={handleSubmit(onSubmit)}>
           <StyledFormRow labelName='Enter First Name' error={errors?.firstName?.message}>
           <Input
               type="text"
               id="firstName"
              //  defaultValue={Name}
               {...register("firstName", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>

           <StyledFormRow labelName='Enter Last Name' error={errors?.lastName?.message}>
           <Input
               type="text"
               id="lastName"
              //  defaultValue={Name}
               {...register("lastName", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
     
           <StyledFormRow labelName='Enter Subject you teach' error={errors?.subject?.message}>
           <Input
               type="text"
               id="subject"
              //  defaultValue={Country}
               {...register("subject", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
     
           <FormRow>
             <Button onClick={handleCloseModal} variation="secondary" type="reset">
               Cancel
             </Button>
             <Button>Submit</Button>
             </FormRow>
           </Form>
       </Modal>}

          <div className='Profile-Bottom '>
            <div className='row' style={{ marginTop: 3 }}>
              <strong className='col-9'>Member Since </strong>
              <strong className='col-3'> {MemberDate} </strong>
            </div>

            <div className='row' style={{ marginTop: 3 }}>
              <strong className='col-9'>Last Lesson Tought </strong>
              <strong className='col-3'>   {LastLessonTought}</strong>
            </div>
            <div className='row' style={{ marginTop: 3 }}>
              <strong className='col-9'>Total Lesson Tought </strong>
              <strong className='col-3'> {TotalLesson}</strong>
            </div>
            <div className='row' style={{ marginTop: 3 }}>
              <strong className='col-6'>Lesson on Time</strong>
              <div className="col-3">
                <div className="progress" style={{ marginTop: 10, height: 10 }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${LessonTime}%` }}
                    aria-valuenow={LessonTime}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <strong className='col-3'> {LessonTime}%</strong>
            </div>
            <div className='row' style={{ marginTop: 3 }}>
              <strong className='col-9'>Earned in {CurrentMonth} </strong>
              <strong className='col-3'>  ${MonthEarn}</strong></div>

          </div>
        </div>
        <div className="Portfolio-video" >
        <EditIcon onClick={() => setShowVideo((show) => !show)} />
          <h4 style={{ marginLeft: 10 }}>Portfolio Video</h4>
          <ReactPlayer
          url={`${Backend_URI}/${isVideo}`}  // Replace 'isVideo' with your video URL
          controls
          height={230}
          width={350}
        />
           {showVideo && <Modal onClose={handleVideoModal}>
           <Form onSubmit={handleSubmit(onVideoSubmit)}>
           <FormRow>
            <StyledFormRow labelName='Upload your video' error={errors?.video?.message}>
             <FileInput id="video" type="file" accept="video/*" 
            {...register("video", {
               required: "This Field is Required",
            })}
               />
              </StyledFormRow>
           </FormRow>

           <FormRow>
            <StyledFormRow labelName='Upload Thumbnail' error={errors?.thumbnail?.message}>
             <FileInput id="thumbnail" type="file" accept="image/*" 
            {...register("thumbnail", {
               required: "This Field is Required",
            })}
               />
              </StyledFormRow>
           </FormRow>

           <FormRow>
             <Button onClick={handleVideoModal} variation="secondary" type="reset">
               Cancel
             </Button>
             <Button>Submit</Button>
             </FormRow>
           </Form>
       </Modal>}
          
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
            <div >
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
                <div className="col-md-2 mx-3" style={{ padding: '1rem' }}>
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
                    <div className="col-md-1" style={{ marginTop: 10 }} >
                      <span className="rating-number">5</span>
                    </div>
                    <div className="col-md-10 " style={{ marginTop: 16, marginLeft: '-40px' }}>
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
                    <div className="col-md-1 " style={{ marginTop: 10 }}  >
                      <span >({countFiveStarReviews})</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-1">
                      <span className="rating-number">4</span>
                    </div>
                    <div className="col-md-10" style={{ marginTop: 5, marginLeft: '-40px' }}>
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
                    <div className="col-md-10" style={{ marginTop: 5, marginLeft: '-40px' }}>
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
                    <div className="col-md-10" style={{ marginTop: 5, marginLeft: '-40px' }}>
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
                    <div className="col-md-10" style={{ marginTop: 5, marginLeft: '-40px' }}>
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