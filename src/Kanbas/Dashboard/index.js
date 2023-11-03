import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    editCourse,
    updateCourse,
    handleInputChange,
}) {
    return (
        <div>
            <h1>Dashboard</h1>
            <div className="header">
                <h2 className="published-courses">Published courses ({courses.length})</h2>
                <button onClick={addNewCourse} className="add-course-button">
                    <span>
                        &#43; Add Course
                    </span>
                </button>
            </div>
            <div className="form-container">
                <h5>New Course</h5>
                <form >
                    <input
                        type="text"
                        name="name"
                        value={course.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="number"
                        value={course.number}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <input
                        type="date"
                        name="startDate"
                        value={course.startDate}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={course.endDate}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <button type="button" onClick={updateCourse}>
                        Update
                    </button>
                </form>
            </div>
            <div className="course-cards">
                {courses.map((item) => (
                    <div key={item._id} className="course-card">
                        <Link to={`/Kanbas/Courses/${item._id}`}>
                            <img src="../../images/course.jpg" alt={item.name} className="course-image" />
                            <h2 className="course-name">{item.name}</h2>
                            <p>Course Number: {item.number}</p>
                            <p>Start Date: {item.startDate}</p>
                            <p>End Date: {item.endDate}</p>
                        </Link>
                        <button
                            onClick={() => deleteCourse(item._id)}
                            className="delete-course-button"
                        >
                            <span>&times;</span> Delete
                        </button>
                        <button
                            onClick={() => editCourse(item._id)}
                            className="edit-course-button"
                        >
                            <span>
                                <i className="fas fa-edit"></i>
                                Edit
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
