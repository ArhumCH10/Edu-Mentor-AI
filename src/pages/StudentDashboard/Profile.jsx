import React, { useState } from "react";
import Heading from "../../ui/Heading";
import styles from "../Dashboard/Cancelled.module.css";
import Row from "../../ui/Row";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

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
  cursor: pointer;
  position: relative;
  display: inline-block; /* For the sake of positioning the badge and icon */
  &:hover::after {
    content: "📷";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
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
  bottom: 0;
  right: 0;
  transform: translate(50%, -50%);
  background-color: #00b22d; /* Adjust to match the level color */
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 2.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
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
  const storedUser = JSON.parse(localStorage.getItem("user")) || {}; // Using const and default empty object

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Arhum Ch",
    username: "@arhumnafeed392",
    rating: 4.6,
    reviews: 27,
    country: "Pakistan",
    memberSince: "Jun 2020",
    grade: "8",
    lessons: "10",
  });

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

  const handleEditClick = () => {
    setIsEditing(true);
    isEditing;
    setProfile({
      name: "Arhum Naveed",
      username: "@arhumnafeed392",
      rating: 4.6,
      reviews: 27,
      country: "Pakistan",
      memberSince: "Jun 2020",
      grade: "7",
      lessons: "10",
    });
  };

  const fileInputRef = React.useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // This is where you'd handle the uploaded image data
        // For example, setting it in state or uploading to a server
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">My Profile</Heading>
      </Row>

      <StyledProfileLayout>
        <ProfileCard>
          <EditIcon onClick={handleEditClick} />
          <div style={{ textAlign: "center" }}>
            <ImageContainer onClick={() => fileInputRef.current.click()}>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <img
                src={profile.imageUrl || "/public/default-user.jpg"}
                alt={storedUser.name}
              />
              <LevelBadge>New Student</LevelBadge>
            </ImageContainer>
            {/* Profile Name */}
            <h2>{storedUser.name}</h2>
            {/* Username */}
            <p>@{storedUser.username}</p>
            {/* Rating */}
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>{index < profile.rating ? "★" : "☆"}</span>
              ))}
              <span>
                {profile.rating} ({profile.reviews} reviews)
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
                {storedUser.country ? (
                  <p style={{ fontSize: "14px", paddingLeft: "15px" }}>
                    {storedUser.country}
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
              <InfoValue>{profile.memberSince}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>
                <FontAwesomeIcon icon={faClock} />
                Grade
              </InfoLabel>
              <InfoValue>{profile.grade}</InfoValue>
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

        <AdditionalCard>
          <h3 style={{ paddingLeft: "15px", paddingTop: "15px" }}>About me</h3>
          <EditIcon onClick={handleEditClick} />
          {storedUser.description ? (
            <p style={{ fontSize: "14px", paddingLeft: "15px" }}>
              {storedUser.description}
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
              {storedUser.languages ? (
                <p style={{ fontSize: "14px", paddingLeft: "15px" }}>
                  {storedUser.languages}
                </p>
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
              {storedUser.education ? (
                <p style={{ fontSize: "14px", paddingLeft: "15px" }}>
                  {storedUser.education}
                </p>
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
