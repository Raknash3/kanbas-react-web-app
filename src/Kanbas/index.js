//import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import './index.css';
import db from "./Database";
import { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";


function Kanbas() {
    const [courses, setCourses] = useState(db.courses);
    const [course, setCourse] = useState({
        name: "New Course Name",
        number: "New Course Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
    });

    const addNewCourse = () => {
        setCourses([...courses, { ...course, _id: new Date().getTime() }]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value,
        });
    };

    const deleteCourse = (courseId) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const editCourse = (courseId) => {
        const selectedCourse = courses.find((course) => course._id === courseId);
        setCourse(selectedCourse);
    };

    const updateCourse = () => {
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
        setCourse({
            name: "New Course Name",
            number: "New Course Number",
            startDate: "2023-09-10",
            endDate: "2023-12-15",
        });
    };

    return (
        <Provider store={store}>

            <div className="d-flex">
                <KanbasNavigation />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="Account" element={<h1>Account</h1>} />
                        <Route path="Dashboard" element={<Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            editCourse={editCourse}
                            updateCourse={updateCourse}
                            handleInputChange={handleInputChange}
                        />} />

                        <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
                        <Route path="Courses/*" element={<h1>Please click on a course from Dashboard</h1>} />
                    </Routes>
                </div>
            </div>
        
        </Provider>
        
    )
}

export default Kanbas;
