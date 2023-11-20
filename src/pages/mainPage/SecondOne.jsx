import { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tooltip } from "@mui/material";

const useStyles = makeStyles(() => ({
  tabs: {
    backgroundColor: "white",
  },
  tab: {
    marginTop: "1em",
    borderBottom: "2px solid transparent",
    fontWeight: "bold",
    color: "black",
    "&.Mui-selected": {
      borderBottomColor: "green",
    },
  },
  content: {
    padding: "20px",
  },
  customButton: {
    borderRadius: "10em",
    marginTop: "2em",
    background: "#00FF0A",
    fontWeight: "bold",
    padding: "1em 1em",
    cursor: "pointer",
    color: "black",
    textAlign: 'center'
  },
}));

const SecondOne = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["Web Development", "Mathematics", "Science", "Quran"];

  const cardDataByTab = {
    "Web Development": [
      {
        title: "Web Development Course",
        teacher: "Jonas Schemedtmann",
        rating: "4.7",
        rate: "30$",
        imageUrl:
          "https://img.freepik.com/free-vector/teaching-students-online-internet-learning-computer-programming-online-it-courses-best-online-it-training-online-certification-courses-concept_335657-194.jpg?w=996&t=st=1698566613~exp=1698567213~hmac=fb80a2e09c21170d634700ac54d1dde717dea0b31ba004b2e4bb6ca65f060983",
      },
      {
        title: "Web Development Course",
        teacher: "Jonas Schemedtmann",
        rating: "4.7",
        rate: "30$",
        imageUrl:
          "https://img.freepik.com/free-vector/teaching-students-online-internet-learning-computer-programming-online-it-courses-best-online-it-training-online-certification-courses-concept_335657-194.jpg?w=996&t=st=1698566613~exp=1698567213~hmac=fb80a2e09c21170d634700ac54d1dde717dea0b31ba004b2e4bb6ca65f060983",
      },
      {
        title: "Web Development Course",
        teacher: "Jonas Schemedtmann",
        rating: "4.7",
        rate: "30$",
        imageUrl:
          "https://img.freepik.com/free-vector/teaching-students-online-internet-learning-computer-programming-online-it-courses-best-online-it-training-online-certification-courses-concept_335657-194.jpg?w=996&t=st=1698566613~exp=1698567213~hmac=fb80a2e09c21170d634700ac54d1dde717dea0b31ba004b2e4bb6ca65f060983",
      },
      {
        title: "Web Development Course",
        teacher: "Jonas Schemedtmann",
        rating: "4.7",
        rate: "30$",
        imageUrl:
          "https://img.freepik.com/free-vector/teaching-students-online-internet-learning-computer-programming-online-it-courses-best-online-it-training-online-certification-courses-concept_335657-194.jpg?w=996&t=st=1698566613~exp=1698567213~hmac=fb80a2e09c21170d634700ac54d1dde717dea0b31ba004b2e4bb6ca65f060983",
      },

      // Add more cards for Web Development
    ],
    Mathematics: [
      {
        title: "Mathematics Course",
        teacher: "Math Teacher",
        rating: "4.8",
        rate: "35$",
        imageUrl:
          "https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-6490.jpg?w=740&t=st=1698566204~exp=1698566804~hmac=3f5005a359e2305c050c189ef0bfac207d9fd044e13bdb4485219a393d9f1779",
      },
      {
        title: "Mathematics Course",
        teacher: "Math Teacher",
        rating: "4.8",
        rate: "35$",
        imageUrl:
          "https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-6490.jpg?w=740&t=st=1698566204~exp=1698566804~hmac=3f5005a359e2305c050c189ef0bfac207d9fd044e13bdb4485219a393d9f1779",
      },
      {
        title: "Mathematics Course",
        teacher: "Math Teacher",
        rating: "4.8",
        rate: "35$",
        imageUrl:
          "https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-6490.jpg?w=740&t=st=1698566204~exp=1698566804~hmac=3f5005a359e2305c050c189ef0bfac207d9fd044e13bdb4485219a393d9f1779",
      },
      {
        title: "Mathematics Course",
        teacher: "Math Teacher",
        rating: "4.8",
        rate: "35$",
        imageUrl:
          "https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-6490.jpg?w=740&t=st=1698566204~exp=1698566804~hmac=3f5005a359e2305c050c189ef0bfac207d9fd044e13bdb4485219a393d9f1779",
      },
      // Add more cards for Mathematics
    ],
    Science: [
      {
        title: "Science Course",
        teacher: "Science Teacher",
        rating: "4.9",
        rate: "40$",
        imageUrl:
          "https://img.freepik.com/free-vector/professor-concept-illustration_114360-3270.jpg?w=740&t=st=1698566266~exp=1698566866~hmac=1c373234d0b9290b07b5de585de1724c155b0619a12e9346698cdce3a1fdf55e",
      },
      {
        title: "Science Course",
        teacher: "Science Teacher",
        rating: "4.9",
        rate: "40$",
        imageUrl:
          "https://img.freepik.com/free-vector/professor-concept-illustration_114360-3270.jpg?w=740&t=st=1698566266~exp=1698566866~hmac=1c373234d0b9290b07b5de585de1724c155b0619a12e9346698cdce3a1fdf55e",
      },
      {
        title: "Science Course",
        teacher: "Science Teacher",
        rating: "4.9",
        rate: "40$",
        imageUrl:
          "https://img.freepik.com/free-vector/professor-concept-illustration_114360-3270.jpg?w=740&t=st=1698566266~exp=1698566866~hmac=1c373234d0b9290b07b5de585de1724c155b0619a12e9346698cdce3a1fdf55e",
      },
      {
        title: "Science Course",
        teacher: "Science Teacher",
        rating: "4.9",
        rate: "40$",
        imageUrl:
          "https://img.freepik.com/free-vector/professor-concept-illustration_114360-3270.jpg?w=740&t=st=1698566266~exp=1698566866~hmac=1c373234d0b9290b07b5de585de1724c155b0619a12e9346698cdce3a1fdf55e",
      },
      // Add more cards for Science
    ],
    Quran: [
      {
        title: "Quran Course",
        teacher: "Quran Teacher",
        rating: "4.5",
        rate: "25$",
        imageUrl:
          "https://img.freepik.com/free-vector/muslim-family-traditional-clothes-reading-holy-book-quran-tiny-people-five-pillars-islam-islamic-calendar-islamic-culture-concept-pinkish-coral-bluevector-isolated-illustration_335657-1493.jpg?w=996&t=st=1698566336~exp=1698566936~hmac=5d1d6919ca8887fb0f0f48916c14911ebdd8b56bfc3fcc94d9229be020c32d26",
      },
      {
        title: "Quran Course",
        teacher: "Quran Teacher",
        rating: "4.5",
        rate: "25$",
        imageUrl:
          "https://img.freepik.com/free-vector/muslim-family-traditional-clothes-reading-holy-book-quran-tiny-people-five-pillars-islam-islamic-calendar-islamic-culture-concept-pinkish-coral-bluevector-isolated-illustration_335657-1493.jpg?w=996&t=st=1698566336~exp=1698566936~hmac=5d1d6919ca8887fb0f0f48916c14911ebdd8b56bfc3fcc94d9229be020c32d26",
      },
      {
        title: "Quran Course",
        teacher: "Quran Teacher",
        rating: "4.5",
        rate: "25$",
        imageUrl:
          "https://img.freepik.com/free-vector/muslim-family-traditional-clothes-reading-holy-book-quran-tiny-people-five-pillars-islam-islamic-calendar-islamic-culture-concept-pinkish-coral-bluevector-isolated-illustration_335657-1493.jpg?w=996&t=st=1698566336~exp=1698566936~hmac=5d1d6919ca8887fb0f0f48916c14911ebdd8b56bfc3fcc94d9229be020c32d26",
      },
      {
        title: "Quran Course",
        teacher: "Quran Teacher",
        rating: "4.5",
        rate: "25$",
        imageUrl:
          "https://img.freepik.com/free-vector/muslim-family-traditional-clothes-reading-holy-book-quran-tiny-people-five-pillars-islam-islamic-calendar-islamic-culture-concept-pinkish-coral-bluevector-isolated-illustration_335657-1493.jpg?w=996&t=st=1698566336~exp=1698566936~hmac=5d1d6919ca8887fb0f0f48916c14911ebdd8b56bfc3fcc94d9229be020c32d26",
      },
      // Add more cards for Quran
    ],
  };

  const currentCardData = cardDataByTab[tabs[value]];

  const tabText = {
    "Web Development": {
      title: "Our Popular Web Mentors",
      description:
        "Your trusted online source for expert web development courses and personalized mentorship, equipping you with essential skills and knowledge for a successful career in tech",
    },
    Mathematics: {
      title: "Mathematics Courses",
      description:
        "Explore a world of mathematical knowledge and learning with our expert instructors. Get started on your journey to master mathematics.",
    },
    Science: {
      title: "Science Courses",
      description:
        "Discover the wonders of science through our comprehensive courses. Learn from top educators and ignite your passion for science.",
    },
    Quran: {
      title: "Quranic Studies",
      description:
        "Embark on a spiritual journey with our Quranic studies courses. Delve into the teachings and wisdom of the Quran with our dedicated instructors.",
    },
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} className={classes.tabs}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} className={classes.tab} />
          ))}
        </Tabs>
      </AppBar>
      <div className={classes.content}>
        <Grid container>
          <Grid item xs={6} style={{ padding: "3em" }}>
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              {tabText[tabs[value]].title}
            </Typography>
            <Typography variant="h6" style={{ marginTop: "1em" }}>
              {tabText[tabs[value]].description}
            </Typography>
            <div
              className={classes.customButton}
              onClick={() => {
                // Handle button click
              }}
            >
              Start Your Beautiful Journey Now
            </div>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="center">
              {currentCardData.map((card, index) => (
                <Tooltip
                  key={index}
                  style={{ padding: "5em" }}
                  title={
                    <div>
                      <Typography variant="h6">{card.title}</Typography>
                      <Typography variant="subtitle1">
                        Tutor: {card.teacher}
                      </Typography>
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ color: "white", backgroundColor: "#00BFFF" }}
                      >
                        Explore This Course
                      </Button>
                    </div>
                  }
                  placement={index % 2 === 0 ? "left" : "right"} // Set placement based on the index
                >
                  <Card
                    style={{
                      width: "250px",
                      margin: "16px",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={card.imageUrl}
                      alt={card.title}
                    />
                    <CardContent>
                      <h3> {card.title}</h3>
                      <p style={{ marginTop: "1em" }}>Tutor: {card.teacher}</p>
                      <p>Rating: {card.rating}</p>
                      <p>Starts from {card.rate} per hour</p>
                    </CardContent>
                  </Card>
                </Tooltip>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SecondOne;