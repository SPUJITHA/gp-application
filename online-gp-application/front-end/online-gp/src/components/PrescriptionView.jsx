import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import '../css/PrescriptionView.css';

const PrescriptionView = ({ appointmentId }) => {
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentDetails = location.state?.appointment; // Use optional chaining
  const doctorEmailId = location.state?.doctorEmailId;
  console.log("DoctorEmailId : ",doctorEmailId);
  console.log("Doctor Email ID :", doctorEmailId);
  console.log("Appointment Details", appointmentDetails);
  
  useEffect(() => {
    const fetchPrescriptionItems = async () => {
      try {
        const  response = await axios.get(`http://localhost:8083/prescription/${appointmentDetails.appointmentId}`);
        
        setPrescriptionItems(response.data);
        
        console.log("View Prescription Items", response.data);
        console.log("Prescription Items :", prescriptionItems);
      } catch (error) {
        console.error('Error fetching prescription items', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (appointmentDetails.appointmentId) {
      fetchPrescriptionItems();
    }
  }, [appointmentId]);

  const printPrescription = () => {
    window.print();
  };

  if (isLoading) {
    return <div>Loading prescription items...</div>;
  }

  if (error) {
    return <div>Error fetching prescription items: {error.message}</div>;
  }
   // Cancel button event handler
   const handleCancel = () => {
    navigate(-1);
};


  return (
    <div className="prescription-form-container">
    <header className="header">
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logoImage} alt="Docmed Logo" className="logo-img" />
      </Link>
      {doctorEmailId  && (
        <div className="welcome-message">
          <p>Welcome, {doctorEmailId}!</p>
        </div>
      )}
     <div className="nav-links">
   <button onClick = {() => navigate('/doctor-homepage', {state : {  doctorEmailId: doctorEmailId } })}> Home </button>
   <button onClick={() => navigate('/doctor-availability', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
    Your Availability
  </button> 
  <button  onClick={() => navigate('/patient-details', { state: { doctorEmailId: doctorEmailId || doctorHomeEmailId } })}>
  Patient Details
  </button> 

{/* <Link to={{ pathname: "/doctor-availability", state: { doctorEmailId: doctorEmailId } }}> Your Availability </Link> */}
  <Link to="/doctor-profile">Profile</Link>
  <button  onClick={() => navigate('/login') }>Logout</button> 
</div>
    </nav>
  </header>

  <div className="prescription-form-container">
<div className="main-content">
<h1>View Prescription Details</h1>
{appointmentDetails && (
                <div className="appointment-details">
                    <p><strong>Patient First Name:</strong> {appointmentDetails.firstName}</p>
                    <p><strong>Patient Last Name:</strong> {appointmentDetails.lastName}</p>
                    {/* <p><strong>Patient Email:</strong> {appointmentDetails.patientEmailId}</p> */}
                    <p><strong>Appointment ID:</strong> {appointmentDetails.appointmentId}</p>
                    <p><strong>Appointment Date:</strong> {appointmentDetails.appointmentDate}</p>
                    <p><strong>Appointment Time:</strong> {appointmentDetails.appointmentTime}</p>
                    <p><strong>Patient Symptoms:</strong> {appointmentDetails.symptoms}</p>
                    {/* Add other appointment details you want to display */}
                </div>
            )}
     {prescriptionItems?.length > 0 && (
        <div className="prescription-details">
          {/* <p><strong>Prescription ID:</strong> {prescriptionItems[0].prescriptionId}</p> */}
          <p><strong>Prescription Date Issued:</strong> {prescriptionItems[0].dateIssued}</p>
          <p><strong>Prescription Status:</strong> {prescriptionItems[0].status}</p>
          <p><strong>Prescription Payment Status:</strong> {prescriptionItems[0].paymentStatus}</p>
          {/* <p><strong>Prescription Transaction ID:</strong> {prescriptionItems[0].transactionId}</p>
          <p><strong>Prescription Tracking Number:</strong> {prescriptionItems[0].trackingNumber}</p> */}
        </div>
      )}
      
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Refill</th>
            <th>Refill (After Months) </th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
       
        {prescriptionItems && prescriptionItems.length > 0 ? (
            prescriptionItems.map((item, index) => (
        <tr key={index}>
            <td>{item.medicineName}</td>
            <td>{item.frequency}</td>
            <td>{item.duration} days</td>
            <td>{item.refill ? 'Yes' : 'No'}</td>
            <td>{item.refillMonths}</td>
            <td>{item.totalCost}</td>
        </tr>
        ))
  ) : (
    <tr><td colSpan="5">No prescription items found.</td></tr>
  )}
</tbody>

      </table>
      <button className="print-prescription" onClick={printPrescription}>Print Prescription</button>
      <button type="button"  className="cancel-prescription" onClick={handleCancel} >Back to Appointments</button>
    </div>
    </div>
    </div>
    
  );
};

export default PrescriptionView;
