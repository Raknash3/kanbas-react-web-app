import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus, faEllipsisV, faBookReader, faCheck } from '@fortawesome/free-solid-svg-icons';

import "./index.css";

function Assignments() {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState(db.assignments);
    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === courseId);

    const handleDelete = (assignmentId) => {
        setAssignments(assignments.filter(assignment => assignment._id !== assignmentId));
    };

    return (
        <div>
            <h2>Assignments for course {courseId}</h2>
            <div className="button-group">
                <input type="text" className="search-bar" placeholder="Search..." />
                <button className="button"><FontAwesomeIcon icon={faUsers} className="button-icon" /> Group</button>
                <button className="button"><FontAwesomeIcon icon={faPlus} className="button-icon" /> Assignment</button>
                <button className="button options-button"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>
            <div className="list-group">
                <div className="title-box">
                    <h2 className="assignment-list-title">Assignments</h2>
                    <div className="right-items">
                        <div className="percentage-capsule">
                            40% of total
                        </div>
                        <FontAwesomeIcon icon={faPlus} className="item-icon" />
                        <FontAwesomeIcon icon={faEllipsisV} className="item-icon" />
                    </div>
                </div>
                {courseAssignments.map((assignment) => (
                    <div key={assignment._id} className="list-group-item">
                        <div className="item-left">
                            <FontAwesomeIcon icon={faBookReader} className="item-icon" />
                            {assignment.title}
                        </div>
                        <div className="item-right">
                            <FontAwesomeIcon icon={faCheck} className="item-icon" />
                            <button onClick={() => handleDelete(assignment._id)} className="delete-button">
                                Delete
                            </button>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Assignments;
