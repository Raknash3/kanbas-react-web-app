//import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import './index.css';
import db from "./Database";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";


function Kanbas() {
    const [courses, setCourses] = useState([]);
    const URL = "https://kanbas-node-server-app-5e87.onrender.com/api/courses";
    const findAllCourses = async () => {
        const response = await axios.get(URL);
        setCourses(response.data);
    };
    useEffect(() => {
        findAllCourses();
    }, []);

    const [course, setCourse] = useState({
        name: "New Course Name",
        number: "New Course Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
    });

    const addNewCourse = async () => {
        try {
            // Make a POST request to add the new course to the server
            const response = await axios.post(URL, course);

            // Update the courses state by adding the new course at the beginning
            setCourses([response.data, ...courses]);

            // Reset the course state to default values
            setCourse({
                name: "New Course Name",
                number: "New Course Number",
                startDate: "2023-09-10",
                endDate: "2023-12-15",
            });
        } catch (error) {
            console.error("Error adding new course:", error);
            // Handle error if necessary
        }
    };

   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value,
        });
    };

    const deleteCourse = async (courseId) => {
        try {
            // Make a DELETE request to remove the course from the server
            await axios.delete(`${URL}/${courseId}`);

            // Update the courses state by filtering out the deleted course
            setCourses(courses.filter((c) => c._id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
            // Handle error if necessary
        }
    };

    const editCourse = (courseId) => {
        const selectedCourse = courses.find((course) => course._id === courseId);
        setCourse(selectedCourse);
    };

    const updateCourse = async () => {
        try {
            // Make a PUT request to update the course on the server
            await axios.put(`${URL}/${course._id}`, course);

            // Update the courses state by replacing the old course with the updated one
            setCourses(courses.map((c) => (c._id === course._id ? course : c)));

            // Reset the course state to default values
            setCourse({
                name: "New Course Name",
                number: "New Course Number",
                startDate: "2023-09-10",
                endDate: "2023-12-15",
            });
        } catch (error) {
            console.error("Error updating course:", error);
            // Handle error if necessary
        }
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
