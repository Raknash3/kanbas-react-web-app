import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import db from "../../Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus, faEllipsisV, faBookReader, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
    deleteAssignment,
    addAssignment,
    selectAssignment,
    updateAssignment,
    setAssignments, // Add this import
} from "./assignmentsReducer";
import "./index.css"
import * as client from "./client";

function Assignments() {

    const { courseId } = useParams();

    
    
    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state) => state.assignmentsReducer.assignment);
    const dispatch = useDispatch();

    const handleDeleteAssignments = (assignmentId) => {
        client.deleteAssignment(assignmentId).then((status) => {
            dispatch(deleteAssignment(assignmentId));
        });
    };

    const handleUpdateAssignments = async () => {
        const status = await client.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };

    const handleAddAssignments = () => {
        client.createAssignment(courseId, assignment).then((assignment) => {
            dispatch(addAssignment(assignment));
        });
    };


    return (
        <div>
            <div>
                <input type="text" className="search-bar" placeholder="Search for assignments..." />
                <button style={{ float: "right" }} type="button" class="btn btn-light">Group</button>
                {/* <button style={{ float: "right" }} type="button" class="btn btn-success">Assignment +</button> */}
                <Link
                    key={assignment._id}
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                    className="no-underline">
                    <button style={{ float: "right" }} type="button" class="btn btn-success" onClick={handleAddAssignments}>Assignment +</button>
                </Link>
                <select style={{ float: "right" }} class="btn">
                    <option selected value="EAD">
                        Edit Assignment dates</option>
                </select>
            </div>
            <br /><br />

            <hr /><hr />

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

                {
                    assignments
                        .filter((assignment1) => assignment1.course === courseId)
                        .map((assign, index) => (

                            <li key={index} className="list-group-item">
                                <div>

                                    <h4><FontAwesomeIcon icon={faBookReader} className="item-icon" /> {assign.title}</h4>
                                    <h5>{assign.course}</h5>
                                </div>
                                <Link
                                    key={assign._id}
                                    to={`/Kanbas/Courses/${courseId}/Assignments/${assign._id}`}
                                    className="no-underline">

                                    <button
                                        type="button"
                                        class="btn btn-warning float-right"
                                        onClick={() => dispatch(selectAssignment(assign))}>
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    type="button"
                                    class="btn btn-danger float-right margin-right"
                                    onClick={() => handleDeleteAssignments(assign._id)}>
                                    Delete
                                </button>

                            </li>

                        ))
                }
            </div>
        </div >
    );
}
export default Assignments; 