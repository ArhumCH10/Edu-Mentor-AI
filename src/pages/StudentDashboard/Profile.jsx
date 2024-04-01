import { useState, useRef } from "react";
import Heading from "../../ui/Heading";
import axios from 'axios';
import toast from "react-hot-toast";
import styles from "../Dashboard/Cancelled.module.css";
import Row from "../../ui/Row";
import Modal from '../../ui/Modal';
import Form from '../../ui/Form';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import Spinner from '../TeacherSignUpProcess/startSpinner';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useStudent } from "../../services/useStudent";
import FormRow from "../../ui/FormRow";
import StyledFormRow from "../../ui/StyledFormRow";
import Input from "../../ui/Input";

const StyledProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 1rem;
`;

const ProfileCard = styled.div`
  position: relative;
  background: var(
    --color-grey-0
  ); /* Replace with actual color variable or value */
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AdditionalCard = styled.div`
  position: relative;
  background: var(
    --color-grey-0
  ); /* Replace with actual color variable or value */
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
    width: 100px; 
    height: 100px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: 50%; /* Match the border-radius with the image */
  overflow: hidden;
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

const InfoLabel = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const InfoValue = styled.span`
  font-weight: bold;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 1.5rem;
`;

const LevelBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  right: -2rem; 
  background-color: #00b22d; 
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 2.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2; 
`;


const EditIcon = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  /* You can use a real edit icon here */
  &:after {
    content: "✏️";
  }
`;

const AboutSection = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-primary); /* Replace with your primary color */
`;

const SectionContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: var(--color-text); /* Replace with your text color */
`;

const ReviewsSection = styled.div`
  margin-top: 1rem;
`;

const ReviewCard = styled.div`
  background: var(--color-grey-0);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReviewBody = styled.div`
  margin-top: 1rem;
`;

function Profile() {
  const { data, isLoading, isError,  refetchUser } = useStudent();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {}; // Using const and default empty object
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [showForm, setShowForm] = useState(false);
  const [otherForm, setOtherForm] = useState(false);
  const [addLanguage, setAddLanguage] = useState(false);
  const [addEducation, setAddEducation] = useState(false);

  const handleAddEducation = () => {
    setAddEducation(true);
  }

  const handleAddLanguage = () => {
    setAddLanguage(true);
  }

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleOtherModal = () => {
    setOtherForm(false);
  };

  const handleImageSrc = (imagePath) => {
    if (!imagePath) {
        console.log("Image path is undefined or null.");
        return '/path/to/default/image.png'; 
    }

    if (imagePath.startsWith('http')) {
        return imagePath;
    } else {
        const baseUrl = "http://localhost:8080/uploads/"; 
        console.log(baseUrl);
        return baseUrl + imagePath.replace(/\\/g, '/'); 
    }
}; 

  const reviews = [
    {
      reviewerName: "Arhum Naveed",
      countryFlag: "/public/pakistan.png",
      reviewerCountry: "Pakistan",
      rating: "4.1",
      text: "Delivered and made revisions without a hinch to make my code working perfect",
      date: "1 month ago",
    },
    {
      reviewerName: "Arhum Naveed",
      countryFlag: "/public/pakistan.png",
      reviewerCountry: "Pakistan",
      rating: "4.1",
      text: "Delivered and made revisions without a hinch to make my code working perfect",
      date: "1 month ago",
    },
  ];
  
  const fileInputRef = useRef();

  const Name = data?.user?.name;
  const Country = data?.user?.country;
  const Grade = data?.user?.grade;
  const Photo = data?.user?.profilePhoto;
  const Description = data?.user?.description;
  const Language = data?.user?.language;
  const Education = data?.user?.education;
  const Language1 = data?.user?.language1;
  const Education1 = data?.user?.education1;

  const languages = [Language, Language1].filter(Boolean);
  const educations = [Education, Education1].filter(Boolean);

  const handleImageUpload = async (event) => {
    const userData = JSON.parse(localStorage.getItem("user")); 
    const email = userData && userData.email;
  
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('email', email);

      try {
        await axios.post('http://localhost:8080/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });       
        await refetchUser(); 
        toast.success("Data Saved Successfully");
      } catch (error) {
        console.error('Error uploading photo:', error.message);
      }
    }
  };

  const profileData = async (data) => {
   const { name, country, grade } = data;
  const userData = JSON.parse(localStorage.getItem("user"));
  const email = userData && userData.email;

  if (data) {
       await axios.post('http://localhost:8080/student/profile', {
        email: email,
        name: name,
        country: country,
        grade: grade
      });
    await refetchUser();
    toast.success("Data Saved Successfully");
  }
};
  

const otherData = async (data) => {
  const { description, language, language1, education, education1 } = data;
 const userData = JSON.parse(localStorage.getItem("user"));
 const email = userData && userData.email;

 if (data) {
      await axios.post('http://localhost:8080/student/other', {
       email: email,
       description: description,
       language: language,
       language1: language1,
       education: education,
       education1: education1
     });
   await refetchUser();
   toast.success("Data Saved Successfully");
 }
};
  function onSubmit(data) {
    profileData(data).then(() => {
      handleCloseModal(); 
  }).catch((error) => {
      console.error("Error submitting the form: ", error);
      toast.error("Error saving data.");
  });
  }

  function onOtherSubmit(data) {
    otherData(data).then(() => {
      handleOtherModal(); 
  }).catch((error) => {
      console.error("Error submitting the form: ", error);
      toast.error("Error saving data.");
  });
  }

  if (isLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">My Profile</Heading>
      </Row>

      <StyledProfileLayout>
        <ProfileCard>
          <EditIcon  onClick={() => setShowForm((show) => !show)} />
          <div style={{ textAlign: "center" }}>
          <ImageContainer onClick={() => fileInputRef.current.click()}>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            {Photo ? <img src={handleImageSrc(Photo)} /> : 
             <img src={"/public/default-user.jpg"}/> }
            <LevelBadge>New Student</LevelBadge>
            </ImageContainer>
            {/* Profile Name */}
            <h2>{Name}</h2>
            {/* Username */}
            <p>@{storedUser.username}</p>
            {/* Rating */}
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>{index < 4.6 ? "★" : "☆"}</span>
              ))}
              <span>
                4.6 (26 reviews)
              </span>
            </div>
          </div>
          <div style={{ textAlign: "start", marginTop: "10px" }}>
            <InfoItem>
              <InfoLabel>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                From:
              </InfoLabel>
              <InfoValue>
                {" "}
                {Country ? (
                  <p style={{ fontSize: "14px", paddingLeft: "15px" }}>
                    {Country}
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "14px",
                      paddingLeft: "15px",
                      color: "grey",
                    }}
                  >
                    Choose Country
                  </p>
                )}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>
                <FontAwesomeIcon icon={faCalendarAlt} />
                Member since:
              </InfoLabel>
              <InfoValue>2020</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>
                <FontAwesomeIcon icon={faClock} />
                Grade
              </InfoLabel>
              <InfoValue>{Grade}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>
                <FontAwesomeIcon icon={faArrowUp} />
                Total Lessons:
              </InfoLabel>
              <InfoValue>
                {storedUser.totalLessons ? (
                  <p style={{ fontSize: "14px", paddingLeft: "15px" }}>
                    {storedUser.totalLessons}
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "14px",
                      paddingLeft: "15px",
                      color: "black",
                    }}
                  >
                    0
                  </p>
                )}
              </InfoValue>
            </InfoItem>
          </div>
        </ProfileCard>

           {showForm && <Modal onClose={handleCloseModal}>
           
      <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow labelName='Enter Name' error={errors?.name?.message}>
      <Input
          type="text"
          id="name"
          defaultValue={Name}
          {...register("name", {
            required: "This Field is Required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow labelName='Enter Country' error={errors?.country?.message}>
      <Input
          type="text"
          id="country"
          defaultValue={Country}
          {...register("country", {
            required: "This Field is Required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow labelName='Enter Grade' error={errors?.grade?.message}>
      <Input
          type="number"
          id="grade"
          defaultValue={Grade}
          {...register("grade", {
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

        <AdditionalCard>
          <h3 style={{ paddingLeft: "15px", paddingTop: "15px" }}>About me</h3>
          <EditIcon onClick={() => setOtherForm((show) => !show)} />
          {Description ? (
            <p style={{ fontSize: "14px", paddingLeft: "15px" }}>
              {Description}
            </p>
          ) : (
            <p style={{ fontSize: "14px", paddingLeft: "15px", color: "grey" }}>
              Add Description
            </p>
          )}
         <InfoItem>
        <InfoLabel>
          <span style={{ marginLeft: "10px" }}>🎓</span>
          Languages you speak:
        </InfoLabel>
        <InfoValue>
          {languages.length > 0 ? (
            languages.map((language, index) => (
              <p key={index} style={{  display: 'inline-block', marginRight: '0.5rem', fontSize: "14px" }}>
                {language},
              </p>
            ))
          ) : (
            <p
              style={{
                fontSize: "14px",
                paddingLeft: "15px",
                color: "grey",
              }}
            >
              Add languages
            </p>
          )}
        </InfoValue>
      </InfoItem>
      <AboutSection>
        <SectionTitle>
          <span style={{ marginLeft: "10px" }}>🎓</span>Education
        </SectionTitle>
        <SectionContent style={{ marginLeft: "10px" }}>
          {educations.length > 0 ? (
            educations.map((education, index) => (
              <p key={index} style={{ fontSize: "14px", paddingLeft: "15px" }}>
                {education}
              </p>
            ))
          ) : (
            <p
              style={{
                fontSize: "14px",
                paddingLeft: "15px",
                color: "grey",
              }}
            >
              Add Education
            </p>
          )}
        </SectionContent>
      </AboutSection>
        </AdditionalCard>
      </StyledProfileLayout>

      {otherForm && <Modal onClose={handleOtherModal}>
           
           <Form onSubmit={handleSubmit(onOtherSubmit)}>
           <StyledFormRow labelName='Introduce Yourself' error={errors?.description?.message}>
           <Textarea
               type="text"
               id="description"
               defaultValue={Description}
               {...register("description", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
     
           <StyledFormRow labelName='Add First Language' error={errors?.language?.message}>
           <Input
               type="text"
               id="language"
               defaultValue={Language}
               {...register("language", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>
           {
            !addLanguage &&
           <Button onClick={handleAddLanguage} variation="danger">Add Another</Button>
           }
           {
            addLanguage &&
            <StyledFormRow labelName='Add Another Language' error={errors?.language1?.message}>
            <Input
                type="text"
                id="language1"
                defaultValue={Language1}
                {...register("language1", {
                  required: "This Field is Required",
                })}
              />
            </StyledFormRow>
           }

           <StyledFormRow labelName='Enter your Education' error={errors?.education?.message}>
           <Textarea
               type="number"
               id="education"
               defaultValue={Education}
               {...register("education", {
                 required: "This Field is Required",
               })}
             />
           </StyledFormRow>

           {
            !addEducation &&
           <Button onClick={handleAddEducation} variation="danger">Add Another</Button>
           }
           {
            addEducation &&
            <StyledFormRow labelName='Enter Another Education' error={errors?.education1?.message}>
            <Textarea
                type="number"
                id="education1"
                defaultValue={Education1}
                {...register("education1", {
                  required: "This Field is Required",
                })}
              />
            </StyledFormRow>
           }
     
           <FormRow>
             <Button onClick={handleOtherModal} variation="secondary" type="reset">
               Cancel
             </Button>
             <Button>Submit</Button>
             </FormRow>
           </Form>
       </Modal>}

      <ReviewsSection>
        <Row type="horizontal">
          <Heading as="heading1">Reviews</Heading>
        </Row>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <ReviewHeader>
              <div>
                <img
                  src="/public/default-user.jpg"
                  alt={review.reviewerName}
                  className={styles.buyerAvatar}
                />
                <strong>{review.reviewerName}</strong>
                <img
                  src={review.countryFlag}
                  alt={review.reviewerCountry}
                  className={styles.buyerAvatar}
                />
              </div>
              <div>
                {/* Star rating for the review */}
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                ))}
                <span>{review.rating}</span>
              </div>
            </ReviewHeader>
            <ReviewBody>
              {/* Review text */}
              <p>{review.text}</p>
              <small>{review.date}</small>
            </ReviewBody>
          </ReviewCard>
        ))}
      </ReviewsSection>
    </>
  );
}

export default Profile;
