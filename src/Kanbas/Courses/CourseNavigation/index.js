import { Link, useParams, useLocation } from "react-router-dom";
import './index.css'; // Import the CSS file

function CourseNavigation() {
    const links = ["Home", "Modules","Piazza", "Zoom Meetings", "Assignments", "Quizzes","Grades","People", "Panopto Video","Discussions","Announcements","Pages","Files"];
    const { courseId } = useParams();
    const { pathname } = useLocation();

    return (
        <div className="course-navigation">
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/Kanbas/Courses/${courseId}/${link}`}
                    className={`navigation-item ${pathname.includes(link) ? 'active' : ''}`}>
                    {link}
                    {pathname.includes(link) && <span className="active-indicator"></span>}
                </Link>
            ))}
        </div>
    );
}

export default CourseNavigation;
