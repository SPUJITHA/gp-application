import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/AdminHomePage.css'; // Your CSS file path here
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import AppointmentTrendsChart from '../components/AppointmentsTrendsChart.jsx';
import DoctorRatingsChart from '../components/DoctorRatingsChart.jsx';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userEmail = user?.emailId;
  console.log("User Email", userEmail);
  const navigateToSupportRequests = () =>
  {
    navigate('/admin-technical-request' , { state: { emailId: userEmail } });
  }
  return (
    <div className="adminhomepage">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
         
            <div className="welcome-message">
              <p>Welcome Admin!</p> 
            </div>
        
            <div className="nav-links">
            <button onClick={() => navigate('/admin-dashboard')}>Home</button>
            {/* <button onClick={() => navigate('/admin-doctor-holiday-list')}>Holiday List</button> */}
            <button onClick={() => navigate('/admin-appointment-list')}>Appointments</button>
            <button  onClick={() => navigate('/admin-patient-details')}>
                 Patient Details
            </button> 
            <button  onClick={navigateToSupportRequests}>
                Support Requests
            </button> 
           
            <Link to="/doctor-profile">Doctor Profile</Link>
            <Link to="/user-login">Logout</Link>
          </div>
        </nav>
      </header>
      <main className="admin-main-content">
        <section className="hero">
          <h1>Health Care For Your Family</h1>
          <p>In the healthcare sector, service excellence is the facility of the hospital as healthcare service provider to consistently.</p>
          <button className="services-btn">Check Our Services</button>
        </section>
        <div className="chart-container">
          <AppointmentTrendsChart />
          <DoctorRatingsChart />
        </div>
      
        {/* More sections as needed */}
      </main>
      {/* Footer */}
    </div>
  );
};

export default AdminDashboard;
