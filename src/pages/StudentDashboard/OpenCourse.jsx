import AppBar from "@material-ui/core/AppBar";
import { useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { IoReturnUpBackOutline } from "react-icons/io5";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Table } from "react-bootstrap"; import { IoCloudDownloadSharp } from "react-icons/io5";
import React from 'react';
const useStyles = makeStyles(() => ({

    tab: {
        marginLeft: '0px',
        marginRight: "0px",
        marginTop: "1em",
        borderBottom: "2px solid transparent",
        fontWeight: "bold",
        width: '20px',
        "&:hover": {
            borderBottomColor: "skyblue",

        },
    },
    AppBar: {

        backgroundColor: "var(--color-grey-50)",
        boxShadow: "none",
        borderBottom: "1px solid #ccc",
    },
}));


const OpenCourse = ({ setOpenCourse }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const courseMaterials = [
        { id: 1, title: "Lecture 1a-Course Intro.ppt", link: " " },
        { id: 2, title: "Lecture 1b.1-Characteristics of Machine Learning.ppt", link: " " },
        { id: 3, title: "Lecture 1b.2-Characteristics of Machine Learning.ppt", link: " " },
        { id: 4, title: "Lecture 2-Machine Learning Storage (HDFS).ppt", link: " " },
        { id: 5, title: "Lecture 3-Machine Learning-MapReduce.ppt", link: " " }
    ];
    const submissions = [
        { id: 1, title: "Mini-Assignment # 1 (Practical No.2)", description: "Online submission only", date: "2024-01-04 15:00", dueDate: "2024-04-04 14:00", link: "/student/class/submission/download/14941" }
        , { id: 2, title: "Mini-Assignment # 1 (Practical No.2)", description: "Online submission only", date: "2024-01-04 15:00", dueDate: "2024-04-04 14:00", link: "/student/class/submission/download/14941" }
    ];
    const attendanceData = {
        course: "Programming for Big Data",
        courseCode: "SECP4073-S24-BS-SE-F20-T9",
        classesConducted: 9,
        classesAttended: 5,
        academicTerm: "Spring 2024",
        attendancePercentage: 55.56,
        attendanceRecords: [
            { id: 1, date: "2024-03-11", status: "Leave" },
            { id: 2, date: "2024-03-14", status: "Leave" },
            { id: 3, date: "2024-03-14", status: "Leave" },
            { id: 4, date: "2024-03-21", status: "Present" },
            { id: 5, date: "2024-03-21", status: "Present" },
            { id: 6, date: "2024-03-25", status: "Present" },
            { id: 7, date: "2024-03-28", status: "Present" },
            { id: 8, date: "2024-03-28", status: "Present" },
            { id: 9, date: "2024-04-01", status: "Leave" },
        ]
    };
    const gradebookData = {
        course: "Programming for Big Data",
        courseCode: "SEGE4963-S24-BS-SE-F20-T9",
        assessments: [
            { type: "Quiz", MaxMarks: 15.0, obtainMarks: 8.0 },
        ]
    };
    const announcement = {
        course: "Programming for Big Data",
        courseCode: "SEGE4963-S24-BS-SE-F20-T9",
        annouce: []
    };

    const courseOutline = {
        course: "Programming for Big Data",
        courseCode: "SEGE4963-S24-BS-SE-F20-T9",
        courseRequirement: "Data Structures and Algorithm is the pre-request of this course. Moreover, basic programming skills will be required for lab practices.",
        courseObjectives: "This course is for those new to data science and interested in understanding why the Big Data Era has come to be. It is for those who want to become conversant with the terminology and the core concepts behind big data problems, applications, and systems. It is for those who want to start thinking about how Big Data might be useful in their business or career. It provides an introduction to one of the most common frameworks, Hadoop, Spark that has made big data analysis easier and more accessible -- increasing the potential for data to transform our world. Now Big Data analytics has been transforming industry and science in various domains for the past few years, making possible the processing of Terabytes of data on a daily basis. This was enabled by the joint evolution of programming models and computing infrastructures.",
        methodology: "As per departmental policy.",
        learningOutcome: `The main objectives of this course are the following: 
        1. You will learn the importance, characteristics, principles, and architecture of big data.
        2. You will be able to design and implement Hadoop map-reduce programs for various large data set processing tasks.
        3. You will be able to use Python and Spark together to analyze Big Data.
        4. You will learn how to use the new Spark 3.0 DataFrame Syntax.
        5. You will be able to use Spark with Random Forests for Classification.
        6. You will be able to use Spark’s MLlib to create Powerful Machine Learning Models.
        7. You will learn about the DataBricks Platform.
        8.. You will be able to use Spark Streaming.`,
        recommendedBooks: [
            {
                title: "Introduction to Big Data",
                author: "John Snow Labs",
                edition: "First Edition",
                publisher: "John Snow Labs",
                year: "2015",
                description: "John Snow Labs"
            },
            {
                title: "Advanced Analytics with Spark",
                author: "Sandy Ryza, Uri Laserson, Josh Wills, Sean Owen",
                edition: "2nd Edition Patterns for Learning from Data at Scale",
                publisher: "",
                year: "2015",
                description: ""
            },
        ],
        recommendedWebResources: [
            // {
            //     url: "https://hackmd.io/@firasj/BkSQJQ8eh#Lab-1---Installing-HDP-Sandbox",
            //     description: "Lab 1 - Installing HDP Sandbox"
            // },
            // {
            //     url: "www.google.com",
            // },
        ],
        assessmentAndEvaluation: [
            {
                assesmentType: 'Quiz',
                Weightage: 15.0,
                considerTop: 0
            },
            {
                assesmentType: 'Assignment',
                Weightage: 15.0,
                considerTop: 0
            },
            {
                assesmentType: 'Project',
                Weightage: 15.0,
                considerTop: 0
            },
            {
                assesmentType: 'Mid-Term Exam',
                Weightage: 20.0,
                considerTop: 0
            },
            {
                assesmentType: 'Final Exam',
                Weightage: 35.0,
                considerTop: 0
            },
        ],
        calendarOfActivities: [
            {
                weekNo: "Week #1",
                weekContents: "Introduction to Course",
                activity: "Class intro and course intro\nCourse outline, discussion on books, Framework of big data\nWhat and Why Big Data?\nWhat is big data What launched the Big Data era?\nApplications: What makes big data valuable\nCase studies on Big Data",
                files: "N/A",
                download: "No File"
            },
            {
                weekNo: "Week #2",
                weekContents: "Big Data: Where Does It Come from?",
                activity: "Machine-Generated Data: People Generated Data, Organization generated data\nCharacteristics of Big Data\nTypes, volume, velocity, variety, veracity, value\nBuilding a Big Data Strategy , Component of big data",
                files: "N/A",
                download: "No File"
            },
            {
                weekNo: "Week #3",
                weekContents: "Data Science:",
                activity: "Getting value out of Big Data\nIntroduction Big Data Storage\nDistributed File System\nDistributed Databases\nGFS and HDFS as Case Study",
                files: "Assignment #1",
                download: "No File"
            },
        ],
        plagiarismAndIntellectualPropertyPolicy:''



    }
    return (
        <div className="row" style={{ marginLeft: "-40px" }}>

            <IoReturnUpBackOutline className='back-btn col-md-1' style={{ marginTop: '0.4em', fontWeight: 'bold', fontSize: '30px', padding: '3px', }}
                onClick={() => {
                    setOpenCourse(false);
                }} />
            <div className="col-11">
                <AppBar position="static" className={classes.AppBar}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="Course Tabs"
                        className={classes.tabs}
                    >
                        <Tab
                            style={{ color: "var(--color-grey-700)", fontWeight: "bold", fontSize: "15px" }}
                            label="Announcement"
                        />
                        <Tab
                            style={{ color: "var(--color-grey-700)", fontWeight: "bold", fontSize: "15px" }}
                            label="Course Outline"
                        />
                        <Tab
                            style={{ color: "var(--color-grey-700)", fontWeight: "bold", fontSize: "15px" }}
                            label="Course Material"
                        />
                        <Tab
                            style={{ color: "var(--color-grey-700)", fontWeight: "bold", fontSize: "15px" }}
                            label="Submission"
                        />
                        <Tab
                            style={{ color: "var(--color-grey-700)", fontWeight: "bold", fontSize: "15px" }}
                            label="Gradebook"
                        />
                        <Tab
                            style={{ color: "var(--color-grey-700)", fontWeight: "bold", fontSize: "15px" }}
                            label="Attendance"
                        />

                    </Tabs>
                </AppBar>

            </div>
            {value === 0 && (
                <div style={{ padding: "20px" }}>
                    <p style={{ marginBottom: "12px" }}>
                        Intro to Machine Learning (SECP4073-S24-BS-SE-F20-T9)
                    </p>
                    <div>
                        <Table striped hover>
                            <thead style={{ backgroundColor: "#112B4F", color: "white" }}>
                                <tr>
                                    <th className="uk-width-1-10">Sr No.</th>
                                    <th className="uk-width-1-10">Subject</th>
                                    <th className="uk-width-7-10">Date</th>
                                    <th className="uk-width-7-10">Description</th>
                                    <th className="uk-width-1-10">Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcement.annouce.length > 0 ? (
                                    announcement.annouce.map((announcement, index) => (
                                        <tr key={index} className="table-child-row">
                                            <td className="uk-width-1-10">{index + 1}</td>
                                            <td className="uk-width-1-10">{announcement.subject}</td>
                                            <td className="uk-width-7-10">{announcement.date}</td>
                                            <td className="uk-width-7-10">{announcement.description}</td>
                                            <td className="uk-width-1-10">{announcement.link ? <a data-uk-tooltip="{pos:'top'}" title="Download" id="downlaod_file" href={announcement.link}>
                                                < IoCloudDownloadSharp style={{ marginLeft: '20px' }} />

                                            </a> : ""}</td>
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td colSpan="7">No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )}
            {value === 1 && (
                <div style={{ padding: "20px" }}>
                    <p style={{ marginBottom: "12px" }}>
                        {courseOutline.course} {(courseOutline.courseCode)}
                    </p>
                    <div>
                        <div>
                            <b>Course Rquirement:</b> <br/>
                            <span style={{ whiteSpace: 'pre-line' }}>{courseOutline.courseRequirement}</span>
                        </div>

                        <div>
                            <b>Course Objectives:</b> <br/>
                            <span style={{ whiteSpace: 'pre-line' }}>{courseOutline.courseObjectives}</span>
                        </div>

                        <div>
                            <b>Methodology:</b> <br/>
                            <span style={{ whiteSpace: 'pre-line' }}>{courseOutline.methodology}</span>
                        </div>

                        <div>
                            <b>Learning Outcomes:</b> <br/>
                            <span style={{ whiteSpace: 'pre-line' }}>{courseOutline.learningOutcome}</span>
                        </div>
                        <div>
                            <h3>Recommended Text Books:</h3>
                            <Table  hover>
                                <thead style={{ backgroundColor: "#112B4F", color: "white" }}>
                                    <tr>
                                        <th className="uk-width-1-10">Sr No.</th>
                                        <th className="uk-width-1-10">Title</th>
                                        <th className="uk-width-7-10">Authors</th>
                                        <th className="uk-width-7-10">Edition</th>
                                        <th className="uk-width-1-10">Publisher</th>
                                        <th className="uk-width-1-10">Year</th>
                                        <th className="uk-width-1-10">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseOutline.recommendedBooks.length > 0 ? (
                                        courseOutline.recommendedBooks.map((book, index) => (
                                            <tr key={index} className="table-child-row">
                                                <td className="uk-width-1-10">{index + 1}</td>
                                                <td className="uk-width-1-10">{book.title}</td>
                                                <td className="uk-width-7-10">{book.author}</td>
                                                <td className="uk-width-7-10">{book.edition}</td>
                                                <td className="uk-width-7-10">{book.publisher}</td>
                                                <td className="uk-width-7-10">{book.year}</td>
                                                <td className="uk-width-7-10">{book.description}</td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="7">No Suggested Book</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <h3>Recommended Web Resources:</h3>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="uk-width-1-10">Sr No.</th>
                                        <th className="uk-width-1-10">URL</th>
                                        <th className="uk-width-7-10">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseOutline.recommendedWebResources.length > 0 ? (
                                        courseOutline.recommendedWebResources.map((url, index) => (
                                            <tr key={index} className="table-child-row">
                                                <td className="uk-width-1-10">{index + 1}</td>
                                                <td className="uk-width-1-10">{url.url}</td>
                                                <td className="uk-width-7-10">{url.description}</td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="7">No Suggested Web Resource</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <h3>Assessment and Evaluation:</h3>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="uk-width-1-10">Assessment Type</th>
                                        <th className="uk-width-1-10">Weightage %</th>
                                        <th className="uk-width-1-10">Consider Top</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseOutline.assessmentAndEvaluation.length > 0 ? (
                                        courseOutline.assessmentAndEvaluation.map((assessment, index) => (
                                            <tr key={index} className="table-child-row">
                                                <td className="uk-width-1-10">{assessment.assesmentType}</td>
                                                <td className="uk-width-1-10">{assessment.Weightage}</td>
                                                <td className="uk-width-1-10">{assessment.considerTop}</td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="7">No decided yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <h3>Calendar of Activities:</h3>
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="uk-width-1-10">Week No</th>
                                        <th className="uk-width-1-10">Week Contents</th>
                                        <th className="uk-width-7-10">Activity</th>
                                        <th className="uk-width-7-10">Files</th>
                                        <th className="uk-width-7-10">Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseOutline.calendarOfActivities.length > 0 ? (
                                        courseOutline.calendarOfActivities.map((activity, index) => (
                                            <tr key={index} className="table-child-row">
                                                <td className="uk-width-1-10">{activity.weekNo}</td>
                                                <td className="uk-width-1-10">{activity.weekContents}</td>
                                                <td className="uk-width-1-10">{activity.activity}</td>
                                                <td className="uk-width-1-10">{activity.files}</td>
                                                <td className="uk-width-1-10">{activity.download? <a data-uk-tooltip="{pos:'top'}" title="Download" id="downlaod_file" href={announcement.link}>
                                                < IoCloudDownloadSharp style={{ marginLeft: '20px' }} />
                                            </a> : ""}</td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="7">No decided yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <h3>Plagiarism and Intellectual Property Policy:</h3>
                            <span style={{ whiteSpace: 'pre-line' }}>{courseOutline.plagiarismAndIntellectualPropertyPolicy}</span>
                        </div>
                    </div>

                </div>

            )}
            {value === 2 && (
                <div style={{ padding: "20px" }}  >
                    <p style={{ marginBottom: "12px" }}>
                        Intro to Machine Learning (SECP4073-S24-BS-SE-F20-T9)
                    </p>
                    <div   >
                        <Table striped hover>
                            <thead style={{ backgroundColor: "#112B4F", color: "white" }}>
                                <tr>
                                    <th className="uk-width-1-10">Sr No.</th>
                                    <th className="uk-width-1-10">Course Material File</th>
                                    <th className="uk-width-7-10">Description</th>
                                    <th className="uk-width-1-10">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseMaterials.map((material, index) => (
                                    <tr key={material.id} className="table-child-row">
                                        <td className="uk-width-1-10">{index + 1}</td>
                                        <td className="uk-width-1-10">{material.title}</td>
                                        <td style={{ whiteSpace: "normal" }} className="uk-width-7-10"></td>
                                        <td className="uk-width-1-10">
                                            <a data-uk-tooltip="{pos:'top'}" title="Download" id="downlaod_file" href={material.link}>
                                                < IoCloudDownloadSharp style={{ marginLeft: '20px' }} />

                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </div>
            )}
            {value === 3 && (
                <div style={{ padding: "20px" }}>
                    <p style={{ marginBottom: "12px" }}>
                        Intro to Machine Learning (SECP4073-S24-BS-SE-F20-T9)
                    </p>
                    <div>
                        <Table striped hover>
                            <thead style={{ backgroundColor: "#112B4F", color: "white" }}>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>Due Date</th>
                                    <th>Attachment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.length > 0 ? (
                                    submissions.map((submission, index) => (
                                        <tr key={submission.id}>
                                            <td>{index + 1}</td>
                                            <td>{submission.title}</td>
                                            <td>{submission.description}</td>
                                            <td>{submission.date}</td>
                                            <td>{submission.dueDate}</td>
                                            <td>
                                                <a href={submission.link}>
                                                    <IoCloudDownloadSharp style={{ marginLeft: '20px' }} />
                                                </a>
                                            </td>
                                            <td>
                                                <button className="btn btn-primary" data-toggle="modal" data-target="#studentSubmission">Upload</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )}
            {value === 4 && (
                <div style={{ padding: "20px" }}>
                    <p style={{ marginBottom: "12px" }}>
                        {gradebookData.course} {(gradebookData.courseCode)}
                    </p>
                    <div>
                        <Table striped hover>
                            <thead style={{ backgroundColor: "#112B4F", color: "white" }}>
                                <tr>
                                    <th>Assessment Type</th>
                                    <th>Obtained Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gradebookData.assessments.length > 0 ? (
                                    gradebookData.assessments.map((grade, index) => (
                                        <React.Fragment key={index}>
                                            <tr data-bs-toggle="collapse" href={`#collapse${index}`}>
                                                <td>{grade.type}</td>
                                                <td>{(grade.obtainMarks / grade.MaxMarks) * 100}</td>
                                            </tr>
                                            <tr>
                                                <Table striped hover className="collapse multi-collapse" id={`collapse${index}`}>
                                                    <thead style={{ backgroundColor: "#112B4F", color: "white" }}>
                                                        <tr>
                                                            <th>Assessment</th>
                                                            <th>Max Marks</th>
                                                            <th>Obtain Marks</th>
                                                            <th>Percentage </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr key={index}>
                                                            <td>{grade.type}</td>
                                                            <td>{grade.MaxMarks}</td>
                                                            <td>{grade.obtainMarks}</td>
                                                            <td>{((grade.obtainMarks / grade.MaxMarks) * 100).toFixed(2)}%</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                {/* <td colSpan="2">
                                                    <div>
                                                        <p>Total Marks: {grade.weightage}</p>
                                                        <p>Obtained Marks: {grade.obtainedMarks}</p>
                                                        <p>Percentage: {((grade.obtainedMarks / grade.weightage) * 100).toFixed(2)}%</p>
                                                    </div>
                                                </td> */}
                                            </tr>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No data found</td>
                                    </tr>
                                )}
                            </tbody>

                        </Table>
                    </div>
                </div>

            )}

            {value === 5 && (
                <div style={{ padding: "20px" }} >
                    <div className="row " style={{ padding: "20px" }}>
                        <div className="col-4" >
                            <div className="row" style={{ display: "inline", alignItems: "center" }}>
                                <b  >Course:</b>
                                <span>{attendanceData.course}</span> <br />
                            </div>
                            <div className="row" style={{ display: "inline", alignItems: "center" }}>
                                <b style={{ marginLeft: "12px", padding: "3px" }}>Course Code:</b>
                                <span  >{attendanceData.courseCode}</span>
                            </div>
                        </div>
                        <div className="col-4" >
                            <div className="row" style={{ display: "inline", alignItems: "center" }}>
                                <b>Number of classes Conducted:</b>
                                <span>{attendanceData.classesConducted}</span> <br />

                            </div>
                            <div className="row" style={{ display: "inline", alignItems: "center" }}>
                                <b style={{ marginLeft: "8px" }}>Number of classes Attended:</b>
                                <span>{attendanceData.classesAttended}</span>

                            </div>
                        </div>
                        <div className="col-4"  >
                            <div className="row" style={{ display: "inline", alignItems: "center" }}>
                                <b >Academic Term:</b>
                                <span>{attendanceData.academicTerm}</span> <br />

                            </div>
                            <div className="row" style={{ display: "inline", alignItems: "center" }}>
                                <b style={{ marginLeft: "8px" }}>Attendance Percentage:</b>
                                <span>{attendanceData.attendancePercentage}</span>

                            </div>
                        </div>
                    </div>
                    <div className="uk-width-large-1-12 uk-margin-small-top"  >
                        <div className="md-card">
                            <Table striped hover>
                                <thead style={{ backgroundColor: "#112B4F", color: "white" }}>
                                    <tr>
                                        <th>Sr. no</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody style={{ color: "black" }}>
                                    {attendanceData.attendanceRecords.map(record => (
                                        <tr key={record.id}>
                                            <td>{record.id}</td>
                                            <td>{record.date}</td>
                                            <td>{record.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default OpenCourse;

OpenCourse.propTypes = {
    setOpenCourse: PropTypes.func.isRequired,
};