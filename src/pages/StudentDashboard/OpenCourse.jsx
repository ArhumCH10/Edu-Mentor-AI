import AppBar from "@material-ui/core/AppBar";
import { useState } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { IoReturnUpBackOutline } from "react-icons/io5";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Table } from "react-bootstrap"; import { IoCloudDownloadSharp } from "react-icons/io5";

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
    }; const courseMaterials = [
        { id: 1, title: "Lecture 1a-Course Intro.ppt", link: " " },
        { id: 2, title: "Lecture 1b.1-Characteristics of Machine Learning.ppt", link: " " },
        { id: 3, title: "Lecture 1b.2-Characteristics of Machine Learning.ppt", link: " " },
        { id: 4, title: "Lecture 2-Machine Learning Storage (HDFS).ppt", link: " " },
        { id: 5, title: "Lecture 3-Machine Learning-MapReduce.ppt", link: " " }
    ]; const submissions = [
        { id: 1, title: "Mini-Assignment # 1 (Practical No.2)", description: "Online submission only", date: "2024-01-04 15:00", dueDate: "2024-04-04 14:00", link: "/student/class/submission/download/14941" }
        , { id: 2, title: "Mini-Assignment # 1 (Practical No.2)", description: "Online submission only", date: "2024-01-04 15:00", dueDate: "2024-04-04 14:00", link: "/student/class/submission/download/14941" }
    ]; const attendanceData = {
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

            </div>{value === 0 && (
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
            )}  {value === 1 && (
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
            )} {value === 3 && (
                <div   >
                    <div className="row ">
                        <div className="col-3 " style={{border:"2px solid"}}>
                            <div className="row">
                                <b>Course :</b>
                                <span>{attendanceData.course}</span>

                            </div>
                            <div className="row">
                                <b>Course Code :</b>
                                <span>{attendanceData.courseCode}</span>

                            </div>
                        </div>
                        <div className="Col-3"  style={{border:"2px solid"}}>
                            <div className="row">
                                <b>Number of classes Conducted :</b>
                                <span>{attendanceData.classesConducted}</span>

                            </div>
                            <div className="row">
                                <b>Number of classes Attended :</b>
                                <span>{attendanceData.classesAttended}</span>

                            </div>
                        </div>
                        <div className="col-3"  style={{border:"2px solid"}}>
                            <div className="row">
                                <b>Academic Term :</b>
                                <span>{attendanceData.academicTerm}</span>

                            </div>
                            <div className="row">
                                <b>Attendance Percentage:</b>
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