import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/DoctorHomePage.css'; // Your CSS file path here
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';

import AppointmentTrendsChart from '../components/AppointmentsTrendsChart.jsx';
import DoctorRatingsChart from '../components/DoctorRatingsChart.jsx';
const DoctorHomePage = () => {
  
  const navigate = useNavigate();
  
  const location = useLocation();
  const {doctorHomeEmailId} = location.state || {};
  const { doctorEmailId } = location.state || {}; 
  return (
    <div className="doctorhomepage">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {(doctorEmailId || doctorHomeEmailId) && (
            <div className="welcome-message">
              <p>Welcome, {doctorEmailId}!</p> 
            </div>
          )}
          <div className="nav-links">
           
             <button onClick={() => navigate('/doctor-availability', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
              Your Availability
            </button> 
            <button  onClick={() => navigate('/doctor-appointment', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
               Appointments
            </button>
            <button onClick={() => navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
              Holiday List
            </button> 
           
            <button  onClick={() => navigate('/patient-details', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
            Patient Details
            </button> 

{/* <Link to={{ pathname: "/doctor-availability", state: { doctorEmailId: doctorEmailId } }}> Your Availability </Link> */}
            {/* <Link to="/doctor-profile">Profile</Link> */}
            <button  onClick={() => navigate('/user-login') }>Logout</button> 
          </div>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero">
          <h1>Health Care For Your Family</h1>
          <p>In the healthcare sector, service excellence is the facility of the hospital as healthcare service provider to consistently.</p>
          <button className="services-btn">Check Our Services</button>
        </section>
        {/* More sections as needed */}
        <div className="chart-container">
          <AppointmentTrendsChart />
          <DoctorRatingsChart />
        </div>
      
      </main>
      {/* Footer */}
    </div>
  );
};

export default DoctorHomePage;
