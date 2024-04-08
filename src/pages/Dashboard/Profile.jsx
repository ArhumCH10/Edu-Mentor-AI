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
import TeacherTextarea from '../../ui/TeacherTextarea';
import { useDescription } from '../TeacherSignUpProcess/useDescription';
import { useEducation } from '../TeacherSignUpProcess/useEducation';

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

const EditIconAbout = styled.span`
  position: absolute;
  top: 9rem;
  right: 3rem;
  cursor: pointer;
  /* You can use a real edit icon here */
  &:after {
    content: "✏️";
  }
`;

const EditIconResume = styled.span`
  position: absolute;
  top: 21rem;
  right: 3rem;
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
  const [activeAboutTab, setActiveAboutTab] = useState('IntroduceYourself');
  const [showForm, setShowForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const videoData = useGetVideo();
  const [fullUsername, setFullUsername] = useState('');
  const [teachLesson, setTeachLesson] = useState('');
  const [educations, setEducations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  //const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideo, setIsVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const { mutate } = usePhoto(setLoading);
  const { mutate: aboutMutation } = useAbout(setLoading);
  const { mutate: videoMutation } = useVideo(setLoading);
  const { mutate: educationMutation } = useEducation(setLoading);
  const { mutate: descriptionMutation } = useDescription(setLoading);
  const [isThubmnail, setIsThumbnail] = useState('');
  const fileInputRef = useRef();
  const [introduceYourself, setIntroduceYourself] = useState("");
  const [teaching, setTeaching] = useState("");
  const [motivateStudents, setMotivateStudents] = useState("");
  const [catchyHeadline, setCatchyHeadline] = useState("");

  const handleAboutTabClick = (tabName) => {
    setActiveAboutTab(tabName);
  };

  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    setDegrees(educations);
  }, [educations]);  

  const addDegree = () => {
    setDegrees([...degrees, {
      universityName: "",
      degreeName: "",
      degreeType: "",
      specialization: "",
      yearsOfStudyFrom: "",
      file: null,
    }]);
  };


  const handleChange = (index, field, value) => {
    setDegrees((currentDegrees) => {
      const updatedDegrees = [...currentDegrees];
      updatedDegrees[index][field] = value;
      return updatedDegrees;
    });
  };
  
  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    setDegrees((currentDegrees) => {
      const updatedDegrees = [...currentDegrees];
      updatedDegrees[index].file = selectedFile;
      return updatedDegrees;
    });
  };  

  useEffect(() => {
    if (userData?.userData?.userData) {
      setIntroduceYourself(userData.userData.userData.profileDescription?.introduceYourself || "");
      setTeaching(userData.userData.userData.profileDescription?.teachingExperience || "");
      setMotivateStudents(userData.userData.userData.profileDescription?.motivateStudents || "");
      setCatchyHeadline(userData.userData.userData.profileDescription?.catchyHeadline || "");
    }
  }, [userData]);


  const renderAboutContent = () => {
    switch (activeAboutTab) {
      case 'IntroduceYourself':
        return <div>{introduceYourself|| 'No introduction provided.'}</div>;
      case 'TeachingExperience':
        return <div>{teaching || 'No teaching experience provided.'}</div>;
      case 'MotivateStudents':
        return <div>{motivateStudents || 'No motivational message provided.'}</div>;
      case 'CatchyHeadline':
        return <div>{catchyHeadline || 'No catchy headline provided.'}</div>;
      default:
        return null;
    }
  };

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

  const handleAboutModal = () => {
    setShowAbout(false);
  };

  const handleResumeModal = () => {
    setShowResume(false);
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

  function onAboutSubmit(data) {
    const { introduce,
      teaching,
      headline,
      motivate } = data;

      setIntroduceYourself(introduce);
      setTeaching(teaching);
      setMotivateStudents(motivate);
      setCatchyHeadline(headline);

    try {
      descriptionMutation({
        introduceYourself:  introduce,
        teachingExperience: teaching,
        motivateStudents: motivate,
        catchyHeadline: headline,
      }
      
    );
      handleAboutModal(); 
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  }

  function onEducationSubmit(data) {
    const dataArray = Array.isArray(data) ? data : [data];
    console.log(dataArray);
  
    if (Array.isArray(dataArray) && dataArray.length > 0) {
      // Initialize an empty array to hold the transformed degree data
      const transformedDataArray = [];
  
      // Determine the number of degrees by finding the highest index in the keys
      const numDegrees = Math.max(...Object.keys(dataArray[0])
        .filter(key => key.includes('-')) // Filter keys that include a hyphen (indicating an indexed field)
        .map(key => parseInt(key.split('-')[1], 10)) // Extract the numeric index
      ) + 1; // +1 because indexes are 0-based
  
      // Iterate through each degree index to group the related fields
      for (let i = 0; i < numDegrees; i++) {
        const degreeData = {
          universityName: dataArray[0][`universityName-${i}`],
          degreeName: dataArray[0][`degreeName-${i}`],
          degreeType: dataArray[0][`degreeType-${i}`],
          specialization: dataArray[0][`specialization-${i}`],
          yearsOfStudyFrom: dataArray[0][`yearsOfStudyFrom-${i}`],
          file: dataArray[0][`file-${i}`] ? dataArray[0][`file-${i}`][0] : null,
        };
        transformedDataArray.push(degreeData);
      }
  
      // Now, 'transformedDataArray' should have an entry for each degree
      console.log(transformedDataArray);
      const degreesPayload = transformedDataArray.map((degree) => ({
        ...degree,
        file: degree.file
          ? {
              name: degree.file.name,
              size: degree.file.size,
              type: degree.file.type,
            }
          : null,
      }));
  
      const updatedUserData = {
        ...userData,
        degrees: userData.degrees
          ? [...userData.degrees, ...degreesPayload]
          : degreesPayload,
      };
  
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

    try {
       transformedDataArray.forEach(cert => {
        educationMutation({
          university: cert.universityName,
          degree: cert.degreeName,
          degreeType: cert.degreeType,
          specialization: cert.specialization,
          yearsOfStudyFrom: cert.yearsOfStudyFrom,
          educationPhoto: cert.file,
        });
      });
      handleResumeModal(); 
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  }else {
    console.error("Expected 'data' to be an array, received:", typeof data);
  }
  }

  function onVideoSubmit(data) {
    const video = data.video[0]; 
    const thumbnail = data.thumbnail[0]; 
  
    if (video && thumbnail) {
        try {
            videoMutation({
                data: video,
                thumbnail: thumbnail
            });
            handleVideoModal(); 
        } catch (error) {
            console.error("Mutation failed:", error);
        }
    } else {
        console.error("Video or thumbnail is missing or empty.");
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
            {degrees.map((edu, index) => {
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
            {teaching ? (<div>{teaching}</div>) : (<div>N/A</div>)}
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
              defaultValue={userData.userData.userData.firstName}
               {...register("firstName", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>

           <StyledFormRow labelName='Enter Last Name' error={errors?.lastName?.message}>
           <Input
               type="text"
               id="lastName"
              defaultValue={userData.userData.userData.lastName}
               {...register("lastName", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
     
           <StyledFormRow labelName='Enter Subject you teach' error={errors?.subject?.message}>
           <Input
               type="text"
               id="subject"
              defaultValue={userData.userData.userData.subjectsTaught}
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
          {isVideo && (
    <ReactPlayer
      url={`${Backend_URI}/${isVideo}`}
      light={`${Backend_URI}/${isThubmnail}`} 
      controls
      height={230}
      width={350}
    />
  )}
  {!isVideo && <p>No video uploaded</p>}
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
        <div className="About">
          <div>
  <h4>About</h4>
  <EditIconAbout onClick={() => setShowAbout((show) => !show)} />
  <div className="About-navbar">
    <div
      className={`About-nav-item ${activeAboutTab === 'IntroduceYourself' ? 'About-active' : ''}`}
      onClick={() => handleAboutTabClick('IntroduceYourself')}
    >
      Introduce Yourself
    </div>
    <div
      className={`About-nav-item ${activeAboutTab === 'TeachingExperience' ? 'About-active' : ''}`}
      onClick={() => handleAboutTabClick('TeachingExperience')}
    >
      Teaching Experience
    </div>
    <div
      className={`About-nav-item ${activeAboutTab === 'MotivateStudents' ? 'About-active' : ''}`}
      onClick={() => handleAboutTabClick('MotivateStudents')}
    >
      Motivate Students
    </div>
    <div
      className={`About-nav-item ${activeAboutTab === 'CatchyHeadline' ? 'About-active' : ''}`}
      onClick={() => handleAboutTabClick('CatchyHeadline')}
    >
      Catchy Headline
    </div>
  </div>
  <div className="About-content">
    {renderAboutContent()}
  </div>
  </div>
</div>

{showAbout && <Modal onClose={handleAboutModal}>
           
           <Form onSubmit={handleSubmit(onAboutSubmit)}>
            {activeAboutTab === 'IntroduceYourself' &&
           <StyledFormRow labelName='Introduce Yourself' error={errors?.introduce?.message}>
           <TeacherTextarea
               type="text"
               id="introduce"
              defaultValue={introduceYourself}
               {...register("introduce", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
            }

           {activeAboutTab === 'TeachingExperience' &&
           <StyledFormRow labelName='Enter Teaching Experience' error={errors?.teaching?.message}>
           <TeacherTextarea
               type="text"
               id="teaching"
              defaultValue={teaching}
               {...register("teaching", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
            }
     
        {activeAboutTab === 'CatchyHeadline' &&
           <StyledFormRow labelName='Write a Catchy Headline' error={errors?.headline?.message}>
           <TeacherTextarea
               type="text"
               id="headline"
              defaultValue={catchyHeadline}
               {...register("headline", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
            }

{activeAboutTab === 'MotivateStudents' &&
           <StyledFormRow labelName='Motivate your Students' error={errors?.motivate?.message}>
           <TeacherTextarea
               type="text"
               id="motivate"
              defaultValue={motivateStudents}
               {...register("motivate", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
            }
     
           <FormRow>
             <Button onClick={handleAboutModal} variation="secondary" type="reset">
               Cancel
             </Button>
             <Button>Submit</Button>
             </FormRow>
           </Form>
       </Modal>}
      
        <div className="Resume ">
          <div>
            <h4>Resume</h4>
            <EditIconResume onClick={() => setShowResume((show) => !show)} />
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
        {showResume && <Modal onClose={handleResumeModal}>
           
            {activeTab === 'Education' &&
           <Form onSubmit={handleSubmit(onEducationSubmit)}>         
              {degrees.map((degree, index) => (
                <div key={index}>
                  <StyledFormRow labelName='University Name' error={errors?.[`universityName-${index}`]?.message}>
                  <Input
               type="text"
               id={`universityName-${index}`}
              defaultValue={degree.university || ""}
              onChange={(e) =>
                handleChange(index, "universityName", e.target.value)
              }
               {...register(`universityName-${index}`, {
                 required: "This Field is Required",
               })}
             />
                </StyledFormRow>
  
                  <StyledFormRow labelName='Degree Name' error={errors?.[`degreeName-${index}`]?.message}>
                  <Input
               type="text"
               id={`degreeName-${index}`}
              defaultValue={degree.degree || ""}
              onChange={(e) =>
                handleChange(index, "degreeName", e.target.value)
              }
               {...register(`degreeName-${index}`, {
                 required: "This Field is Required",
               })}
             />
                 </StyledFormRow>
    
                  <StyledFormRow labelName='Degree Type' error={errors?.[`degreeType-${index}`]?.message}>
                  <Input
               type="text"
               id={`degreeType-${index}`}
              defaultValue={degree.degreeType || ""}
              onChange={(e) =>
                handleChange(index, "degreeType", e.target.value)
              }
               {...register(`degreeType-${index}`, {
                 required: "This Field is Required",
               })}
             />
              </StyledFormRow>
    
                  <StyledFormRow labelName='Specialization' error={errors?.[`specialization-${index}`]?.message}>
                  <Input
               type="text"
               id={`specialization-${index}`}
              defaultValue={degree.specialization || ""}
              onChange={(e) =>
                handleChange(index, "specialization", e.target.value)
              }
               {...register(`specialization-${index}`, {
                 required: "This Field is Required",
               })}
             />    
                     </StyledFormRow>
    
                  <StyledFormRow labelName='Years of Study' error={errors?.[`yearsOfStudyFrom-${index}`]?.message}>
                  <Input
               type="text"
               id={`yearsOfStudyFrom-${index}`}
              defaultValue={degree.yearsOfStudyFrom || ""}
              onChange={(e) =>
                handleChange(index, "yearsOfStudyFrom", e.target.value)
              }
               {...register(`yearsOfStudyFrom-${index}`, {
                 required: "This Field is Required",
               })}
             /> 
                     </StyledFormRow>
    
                     <StyledFormRow labelName='Upload Degree Certificate' error={errors?.[`file-${index}`]?.message}>
              <FileInput
             id={`file-${index}`}
    type="file"
    accept="image/*"
    onChange={(event) => handleFileChange(index, event)}
    {...register(`file-${index}`, {
      required: "This field is required",
    })}
  />
</StyledFormRow>

                </div>
              ))}
              <Button variation="different" size="extraSmall"
                onClick={() => addDegree()}
              >
                Add a New Degree
              </Button>

<FormRow>
<Button onClick={handleResumeModal} variation="secondary" type="reset">
  Cancel
</Button>
<Button>Submit</Button>
</FormRow>
</Form>
            }

           {activeAboutTab === 'TeachingExperience' &&
           <StyledFormRow labelName='Enter Teaching Experience' error={errors?.teaching?.message}>
           <TeacherTextarea
               type="text"
               id="teaching"
              defaultValue={teaching}
               {...register("teaching", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
            }
     
        {activeAboutTab === 'CatchyHeadline' &&
           <StyledFormRow labelName='Write a Catchy Headline' error={errors?.headline?.message}>
           <TeacherTextarea
               type="text"
               id="headline"
              defaultValue={catchyHeadline}
               {...register("headline", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
            }
       </Modal>}

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