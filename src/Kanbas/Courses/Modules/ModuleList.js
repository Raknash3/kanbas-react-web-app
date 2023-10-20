import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import './ModuleList.css'; // Import the CSS file

// Import FontAwesome icons
import { faCheck, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModuleList() {
    const { courseId } = useParams();
    const modules = db.modules;

    return (
        <div>
            <div className="module-buttons-container">
                <button className="module-button">Collapse All</button>
                <button className="module-button">View All</button>
                <button className="module-button">Publish All</button>
                <button className="module-button module-red-button">Module</button>
                <button className="module-button options-button"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>
            <hr className="divider-line" />
            <ul className="list-group">
                {modules
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index} className="module-item">
                            <h3>{module.name}</h3>
                            <p>{module.description}</p>
                            <div className="buttons-container">
                                <button className="button checkmark-button"><FontAwesomeIcon icon={faCheck} /></button>
                                <button className="button plus-button"><FontAwesomeIcon icon={faPlus} /></button>
                                <button className="button options-button"><FontAwesomeIcon icon={faEllipsisV} /></button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ModuleList;
