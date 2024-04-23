// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // Use additional logic if needed
    navigate(path);
  };

  return (
    <div className = "body-class">
          <div className="dashboard-class">
            <div className="dashboard-heading">Welcome to Home Page</div>
            <div className="dashboard-desc">Here You can See! How we can help you?</div>
            <div className="display-dashboard">
              <div className="dashboard-features">
                <div className="navigate-class" onClick={() => handleNavigation('/addmedicine')}>
                  <div className="imgclass"><img src="/images/medicine.svg" alt="About" /></div>
                  <div className="nav-details">ADD Your Medicine</div>
                </div>

                <div className="navigate-class" onClick={() => handleNavigation('/getmedicine')}>
                  <div className="imgclass"><img src="/images/about.png" alt="About" /></div>
                  <div className="nav-details">Check Your Routine Medicinc List</div>
                </div>

                <div className="navigate-class" onClick={() => handleNavigation('/adddoc')}>
                  <div className="imgclass"><img src="/images/clinic.svg" alt="About" /></div>
                  <div className="nav-details">Add prescription of Your Doctor</div>
                </div>
              </div>

              <div className="dashboard-features">
                <div className="navigate-class" onClick={() => handleNavigation('/addclinic')}>
                  <div className="imgclass"><img src="/images/hero.png" alt="About" /></div>
                  <div className="nav-details">ADD Your Clinic</div>
                </div>

                <div className="navigate-class" onClick={() => handleNavigation('/getclinic')}>
                  <div className="imgclass"><img src="/images/aboutdoctor.webp" alt="About" /></div>
                  <div className="nav-details">See Your Added Clinic List</div>
                </div>

                <div className="navigate-class" onClick={() => handleNavigation('/getreview')}>
                  <div className="imgclass"><img src="/images/network.png" alt="About" /></div>
                  <div className="nav-details">Manage Your Added review</div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Dashboard;
