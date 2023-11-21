import React from 'react';
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "./index.css";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import axios from "axios";


function Courses({ courses }) {
    const { courseId } = useParams();
    const URL = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState({});
    const findCourseById = async (courseId) => {
        const response = await axios.get(
            `${URL}/${courseId}`
        );
        setCourse(response.data);
    };

    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);

    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState("");

    const activeMenuName = location.pathname.split("/").pop();

    return (
        <div>
            <div className="courses-header">
                <FontAwesomeIcon icon={faBars} className="menu-icon" />
                <h3 className="course-title">
                    Course:  <span className="course-name">{course ? course.name : 'Course Title'}</span>
                    {activeMenuName && <span className="active-menu">{' > ' + activeMenuName}</span>}
                </h3>
                <button className="student-view-button">
                    <FontAwesomeIcon icon={faGlasses} className="specs-icon" />
                    Student View
                </button>
            </div>
            <div className="courses-container">
                <div className="navigation-container">
                    <CourseNavigation />
                </div>
                <div className="content-container">
                    <div>
                        <div
                            style={{
                                left: "320px",
                                top: "120px",
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Navigate to="Home" />} />
                                <Route path="Home" element={<Home />} />
                                <Route path="Modules" element={< Modules />} />
                                <Route path="Assignments" element={<Assignments />} />
                                <Route
                                    path="Assignments/:assignmentId"
                                    element={<AssignmentEditor />}
                                />
                                <Route path="Grades" element={<Grades />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;