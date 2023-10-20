import db from "../../Database";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFileExport, faCog, faFilter } from '@fortawesome/free-solid-svg-icons';
import "./index.css";

function Grades() {
    const { courseId } = useParams();
    const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);
    return (
        <div>
            <div className="grades-buttons">
                <button className="button">
                    <FontAwesomeIcon icon={faFileImport} className="button-icon" />
                    Import
                </button>
                <button className="button">
                    <FontAwesomeIcon icon={faFileExport} className="button-icon" />
                    Export
                </button>
                <button className="button">
                    <FontAwesomeIcon icon={faCog} className="button-icon" />
                </button>
            </div>
            <br />
            <br />
            <div className="grades-search">
                <div className="search-box">
                    <h3>Student Names</h3>
                    <input type="text" className="search-bar" placeholder="Search..." />
                </div>
                <div className="search-box">
                    <h3>Assignment Names</h3>
                    <input type="text" className="search-bar" placeholder="Search..." />
                </div>
            </div>
            <div className="filter-button">
                Apply Filter
                <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            </div>
            <br />
            <br />
            <h1>Grades</h1>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            {assignments.map((assignment) => (
                                <th key={assignment._id}>{assignment.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment) => {
                            const user = db.users.find((user) => user._id === enrollment.user);
                            return (
                                <tr key={enrollment._id}>
                                    <td>{user.firstName} {user.lastName}</td>
                                    {assignments.map((assignment) => {
                                        const grade = db.grades.find(
                                            (grade) => grade.student === enrollment.user && grade.assignment === assignment._id
                                        );
                                        return (
                                            <td key={assignment._id}>{grade?.grade || ""}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}</tbody></table>
            </div></div>);
}
export default Grades;