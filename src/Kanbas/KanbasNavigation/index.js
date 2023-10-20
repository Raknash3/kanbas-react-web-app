import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTachometerAlt, faBook, faCalendar, faInbox, faHistory, faChalkboard, faComments, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './index.css'; // Import the CSS file

function KanbasNavigation() {
    const links = [
        { label: "Account", icon: faUser },
        { label: "Dashboard", icon: faTachometerAlt },
        { label: "Courses", icon: faBook },
        { label: "Calendar", icon: faCalendar },
        { label: "Inbox", icon: faInbox },
        { label: "History", icon: faHistory },
        { label: "Studio", icon: faChalkboard },
        { label: "Comments", icon: faComments },
        { label: "Help", icon: faQuestionCircle }
    ];

    const { pathname } = useLocation();

    return (
        <div className="sidebar">
            <img src="../../images/seal.jpg" alt="College Emblem" className="college-emblem" />
            <ul className="navigation-list">
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link.label) ? 'active' : ''}>
                        <FontAwesomeIcon icon={link.icon} size="2x" style={{ color: 'red' }} />
                        <Link to={`/Kanbas/${link.label}`} style={{ color: 'white' }}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KanbasNavigation;
