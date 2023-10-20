import ModuleList from "../Modules/ModuleList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faExternalLinkAlt, faStream, faBullhorn, faChartBar, faBell } from '@fortawesome/free-solid-svg-icons';
import  "./index.css";

function Home() {
    return (
        <div className="home-container">
            <div className="module-list-container">
                <h2>Home</h2>
                <ModuleList />
                <h2>Status</h2>
            </div>
            <div className="button-column">
                <button className="home-button">
                    <FontAwesomeIcon icon={faFileImport} className="button-icon" />
                    Import Existing Content
                </button>
                <button className="home-button">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="button-icon" />
                    Import from Commons
                </button>
                <button className="home-button">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="button-icon" />
                    Choose Home Page
                </button>
                <button className="home-button">
                    <FontAwesomeIcon icon={faStream} className="button-icon" />
                    View Course Stream
                </button>
                <button className="home-button">
                    <FontAwesomeIcon icon={faBullhorn} className="button-icon" />
                    New Announcements
                </button>
                <button className="home-button">
                    <FontAwesomeIcon icon={faChartBar} className="button-icon" />
                    New Analytics
                </button>
                <button className="home-button">
                    <FontAwesomeIcon icon={faBell} className="button-icon" />
                    View Course Notifications
                </button>
                <br />
                <h2 className="to-do-header">To Do</h2>
                <div className="to-do-item">
                    <div className="to-do-content">
                        <h6 className="to-do-title">GRADE A1 - ENV+HTML</h6>
                        <p>100 Points, Sept 23: 11:59</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
