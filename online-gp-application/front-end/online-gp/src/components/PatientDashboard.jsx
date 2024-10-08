import React from 'react';
import '../css/PatientDashboard.css';
import { Link, useNavigate } from 'react-router-dom'; 

function PatientDashboard({emailId}) {
    const navigate = useNavigate();
  const handleLogout = () => {
    // Implement logout functionality
    console.log('User logged out');
    // Redirect to home page or login page after logout if necessary
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">DoctorOnCall</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/home" className="navbar-item">Home</Link>
        <Link to="/appointment" className="navbar-item">Book An Appointment</Link>
        {/* Include other navigation items here if needed */}
        <button onClick={handleLogout} className="navbar-item logout-button">Logout</button>
      </div>
    </nav>
  );
}

export default PatientDashboard;
