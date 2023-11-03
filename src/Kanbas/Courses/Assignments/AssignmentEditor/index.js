import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import db from "../../../Database";

function AssignmentEditor() {
    const { assignmentId } = useParams();
    const { courseId } = useParams();
    const assignment = db.assignments.find(
        (assignment) => assignment._id === assignmentId
    );

    const [formData, setFormData] = useState({
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        availableFromDate: assignment.availableFromDate,
        availableUntilDate: assignment.availableUntilDate,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        // Save formData to your database or perform necessary actions here
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    return (
        <div>
            <h2>Assignment Name</h2>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <h2>Description</h2>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control mb-2"
            ></textarea>
            <h2>Due Date</h2>
            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <h2>Available From Date</h2>
            <input
                type="date"
                name="availableFromDate"
                value={formData.availableFromDate}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <h2>Available Until Date</h2>
            <input
                type="date"
                name="availableUntilDate"
                value={formData.availableUntilDate}
                onChange={handleChange}
                className="form-control mb-2"
            />
            <Link
                to={`/Kanbas/Courses/${courseId}/Assignments`}
                className="btn btn-danger"
            >
                Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-success me-2">
                Save
            </button>
        </div>
    );
}

export default AssignmentEditor;
