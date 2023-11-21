import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./modulesReducer";
import './ModuleList.css'; // Import the CSS file

import { faCheck, faTimes, faEllipsisV, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as client from "./client";

function ModuleList() {

    const dispatch = useDispatch();
    const { courseId } = useParams();

    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);

    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };

    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

    const handleDeleteModule = (moduleId) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };


    return (
        <div>

            <div className="module-buttons-container">
                <button className="module-button">Collapse All</button>
                <button className="module-button">View All</button>
                <button className="module-button">Publish All</button>
                <button className="module-button module-red-button">Module</button>
                <button className="module-button options-button"><FontAwesomeIcon icon={faEllipsisV} /></button>
            </div>

            <div className="module-form">
                <div className="form-group">
                    <label htmlFor="moduleName">New Module</label>
                    <input
                        value={module.name}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, name: e.target.value }))
                        }
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="moduleDescription">New Description</label>
                    <textarea
                        value={module.description}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, description: e.target.value }))
                        }
                        
                    />
                </div>
                <button onClick={handleAddModule} className="button2">
                    <span className="button-icon">+</span>
                    Add Module
                </button>
                <button onClick={handleUpdateModule} className="button2">
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} /> Update
                </button>

             
            </div>

            <hr className="divider-line" />

            <ul className="list-group">

                <li className="module-item module-blue">
                    <h3>Resources</h3>
                    <div className="buttons-container">
                        <button className="button checkmark-button"><FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /></button>
                        <button className="button plus-button"><FontAwesomeIcon icon={faPlus} /></button>
                        <button className="button options-button"><FontAwesomeIcon icon={faEllipsisV} /></button>
                    </div>
                </li>

                <li className="module-item module-green">
                    <h3>Reading Material</h3>
                    <div className="buttons-container">
                        <button className="button checkmark-button"><FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /></button>
                        <button className="button plus-button"><FontAwesomeIcon icon={faPlus} /></button>
                        <button className="button options-button"><FontAwesomeIcon icon={faEllipsisV} /></button>
                    </div>
                </li>
            </ul>

            <ul className="list-group">
                {modules
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index} className="module-item">
                            <h3>{module.name}</h3>
                            <p>{module.description}</p>
                            <div className="buttons-container">
                                <button className="button checkmark-button">
                                    <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                </button>
                                <button onClick={() => handleDeleteModule(module._id)} 
                                    className="delete-button"
                                >
                                    <FontAwesomeIcon icon={faTimes} /> Delete
                                </button>
                                <button onClick={() => dispatch(setModule(module))}
                                    className="edit-button"
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>

                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ModuleList;
