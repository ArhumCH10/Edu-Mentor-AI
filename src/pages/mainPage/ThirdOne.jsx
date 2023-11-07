import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

function ThirdOne() {
  const containerStyle = {
    background: "black",
    height: "160cvh",
    position: "relative",
  };

  const image1Style = {
    width: "35em",
    marginLeft: "-11em",
  };

  const image2Style = {
    position: "absolute",
    top: 0,
    right: 0,
    height: "10em",
    width: "15em",
  };

  const typographyWrapperStyle = {
    padding: "3.5em",
  };

  const firstCardDataArray = [
    {
      title: "Experts Mentors",
      content: "Find native speakers and certified private Mentors",
      imageUrl: "/rankpicture.png",
    },
    {
      title: "Verified profiles",
      content: "We carefully check and confirm each mentors profile",
      imageUrl: "/verifypicture.png",
    },
    {
      title: "Learn anytime",
      content: "Take online lessons at the perfect time for your busy schedule",
      imageUrl: "/profilepicture.png",
    },
    {
      title: "Affordable prices",
      content: "Choose your own prices and make a deal",
      imageUrl: "/dollarpicture.png",
    },
  ];

  const secondCardDataArray = [
    {
      title: "AI-driven Content",
      content: "Ai generated quiz and assessment after each lecture delivered",
      imageUrl: "/aipicture.png",
    },
    {
      title: "Student’s Progress",
      content: "Graphs to visually represent students' progress over time",
      imageUrl: "/graphpicture.png",
    },
    {
      title: "Motivated Learning",
      content:
        "Students will rewarded as Level’s to excel more and they became motivated.",
      imageUrl: "/awardpicture.png",
    },
    {
      title: "Personalized Learning",
      content:
        "AI generated insights students will receive tailored learning paths",
      imageUrl: "/learningpicture.png",
    },
  ];

  return (
    <>
      <div style={containerStyle}>
        <div>
          <img src="thirdPageDdesign.png" alt="Image 1" style={image1Style} />
          <img src="thirdPageDdesign2.png" alt="Image 2" style={image2Style} />
        </div>
        <div style={typographyWrapperStyle}>
          <Typography
            variant="h3"
            style={{ fontWeight: "bold", color: "white" }}
          >
            Why Should You Choose Us ?
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-6em",
          }}
        >
          {firstCardDataArray.map((cardData, index) => (
            <Card
              key={index}
              style={{
                width: "200px",
                margin: "50px",
                cursor: "pointer",
                background: "transparent",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={cardData.imageUrl}
                alt="Card Image"
              />
              <CardContent style={{ textAlign: "center" }}>
                <h2 style={{ color: "white" }}>{cardData.title}</h2>
                <p style={{ marginTop: "1em", color: "white" }}>
                  {cardData.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div style={typographyWrapperStyle}>
          <Typography
            variant="h3"
            style={{ fontWeight: "bold", color: "white" }}
          >
            What will you get?
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-6em",
          }}
        >
          {secondCardDataArray.map((cardData, index) => (
            <Card
              key={index}
              style={{
                width: "200px",
                margin: "50px",
                cursor: "pointer",
                background: "transparent",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={cardData.imageUrl}
                alt="Card Image"
              />
              <CardContent style={{ textAlign: "center" }}>
                <h2 style={{ color: "white" }}>{cardData.title}</h2>
                <p style={{ marginTop: "1em", color: "white" }}>
                  {cardData.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default ThirdOne;
