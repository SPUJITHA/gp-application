import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import '../css/PrescriptionView.css';
import ReactToPrint from 'react-to-print'; 

const ViewPrescriptionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appointmentDetails = location.state?.appointment; // Use optional chaining
    const patientEmailId = location.state?.patientEmailId;
    const [prescriptionItems, setPrescriptionItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const prescriptionRef = useRef(null);
    const paymentAppointmentId = appointmentDetails.appointmentId;
    const refreshPrescriptions = location.state?.refreshPrescriptions;
    console.log("Patient Email ID :", patientEmailId);
    console.log("Appointment Details", appointmentDetails);
    // State to manage a list of prescriptions
    const navigateToPayment = () => {
      const amount = prescriptionItems.length * 9 ; // 999 cents for one medicine
      navigate('/payment', { state: { amount : totalCost, appointment : appointmentDetails, patientEmailId : patientEmailId, prescriptionId :prescriptionItems[0].prescriptionId } });
  };
    const navigateToAppointments = () => {
      if (patientEmailId) {
        console.log("Home Page email id", patientEmailId);
        navigate('/appointment-list', { state: { emailId: patientEmailId } });
      } else {
        // Handle the case when user is not logged in or emailId is not available
        console.log('User is not logged in or email ID is undefined');
        navigate('/user-login');
      }
    };
  
    const navigateToPrescriptions = () => {
      if (patientEmailId) {
        console.log("Home Page email id", patientEmailId);
        navigate('/prescription-services', { state: { emailId: patientEmailId } });
      } else {
        // Handle the case when user is not logged in or emailId is not available
        console.log('User is not logged in or email ID is undefined');
        navigate('/user-login');
      }
    };
  
        const  fetchPrescriptions = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8083/prescription/${appointmentDetails.appointmentId}`
            );
            setPrescriptionItems(response.data);
          } catch (error) {
            setError(error);
          } finally {
            setIsLoading(false);
          }
        };
      
        useEffect(() => {
          fetchPrescriptions(); // Fetch prescriptions initially and when refreshPrescriptions changes
        }, [appointmentDetails.appointmentId, refreshPrescriptions]);
      
    
      
      if (isLoading) {
        return <div>Loading prescription items...</div>;
      }
    
      if (error) {
        return <div>Error fetching prescription items: {error.message}</div>;
      }
    
      

    const printPrescription = () => {
            window.print();
    };

    // Function to calculate the total cost of all prescription items
const calculateTotalCost = (items) => {
  if (!items || items.length === 0) {
    return 0; // If no items are present, return zero
  }

  return items.reduce((total, item) => total + (item.totalCost || 0), 0); // Accumulate the sum
};

  // Calculate the total cost using the helper function
  const totalCost = calculateTotalCost(prescriptionItems);
    const isPaid = prescriptionItems.length > 0 && prescriptionItems[0].status === "Paid";
    const navigateToInformationHub = () => {
      if(user?.emailId)
      {
        console.log("Home Page email id", user.emailId);
        navigate('/wellness-information-hub', {state : {emailId : user.emailId}});
      }
      else {
        // Handle the case when user is not logged in or emailId is not available
        console.log('User is not logged in or email ID is undefined');
        navigate('/user-login');
      }
    };
    
    const navigateToTechnicalRequest = () => {
      if(user?.emailId)
      {
        console.log("Home Page email id", user.emailId);
        navigate('/technical-request', {state : {emailId : user.emailId}});
      }
      else {
        // Handle the case when user is not logged in or emailId is not available
        console.log('User is not logged in or email ID is undefined');
        navigate('/user-login');
      }
    };
    
    const navigateToPatientSupportRequests = () => {
      if(user?.emailId)
      {
        console.log("Home Page email id", user.emailId);
        navigate('/technical-request-list', {state : {emailId : user.emailId}});
      }
      else {
        // Handle the case when user is not logged in or emailId is not available
        console.log('User is not logged in or email ID is undefined');
        navigate('/user-login');
      }
    };

    const navigateToPatientProfile = () => {
      if (user?.emailId) {
        console.log("Home Page email id", user.emailId);
        navigate('/patient-profile-details', { state: { emailId: user.emailId } });
      } else {
        // Handle the case when user is not logged in or emailId is not available
        console.log('User is not logged in or email ID is undefined');
        navigate('/user-login');
      }
    };
  
    
    return (
        <div className="prescription-form-container">
           <header className="header">
      <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {patientEmailId && (
            <div className="welcome-message">
              <p>Welcome, {patientEmailId}!</p> 
            </div>
          )}
           <div className="nav-links">
            <Link to="/home">Home</Link>
            { patientEmailId && <Link to="/prescription-services">Prescription Services</Link> }
          
            {/* <button className="appointment-btn" onClick={handleMakeAppointment}>
              Make an Appointment
            </button>
             */}
             { patientEmailId && <Link to="/appointment">Book an Appointment</Link>}
            {/* <Link to={{ pathname: "/appointment-list", state: { emailId: user?.emailId }}}> Your Bookings </Link> */}
            { patientEmailId && <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>}
            { patientEmailId && <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>}
            { patientEmailId && <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>}
            {/* <button onClick={navigateToAppointments}>Your Bookings</button> */}
            { patientEmailId && <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>}
            { patientEmailId && <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>}
            { !patientEmailId && <Link to="/user-login">Login</Link> }
            { patientEmailId && <Link to="/user-login">Logout</Link> }
          </div>
          
        </nav>
      </header>
     
          <div className="prescription-form-container">
      <div className="main-content">
        <h1>Prescription Details</h1>
        {appointmentDetails && (
                        <div className="appointment-details">
                            <p><strong>Doctor Name:</strong> {appointmentDetails.doctorName}</p>
                            <p><strong>Appointment ID:</strong> {appointmentDetails.appointmentId}</p>
                            <p><strong>Appointment Date:</strong> {appointmentDetails.appointmentDate}</p>
                            <p><strong>Appointment Time:</strong> {appointmentDetails.appointmentTime}</p>
                            <p><strong>Symptoms:</strong> {appointmentDetails.symptoms}</p>
                            <p><strong>Status:</strong> {appointmentDetails.status}</p>
                        </div>
                    )}
       
       {prescriptionItems.length > 0 ? (
                    <div>
                        <div className="prescription-details">
                            <p><strong>Precription ID : </strong> {prescriptionItems[0].prescriptionId}</p>
                            <p><strong>Prescription Date Issued:</strong> {prescriptionItems[0].dateIssued}</p>
                            <p><strong>Prescription Status:</strong> {prescriptionItems[0].status}</p>
                            <p><strong>Prescription Payment Status:</strong> {prescriptionItems[0].paymentStatus}</p>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Medicine Name</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                    <th>Refill</th>
                                    <th>Refill Months</th>
                                    <th>Total Cost (In GBP)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptionItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.medicineName}</td>
                                        <td>{item.frequency}</td>
                                        <td>{item.duration} days</td>
                                        <td>{item.refill ? 'Yes' : 'No'}</td>
                                        <td>{item.refillMonths}</td>
                                        <td>{item.totalCost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="total-cost-summary">
                         <strong>Total Cost of All Prescriptions: </strong>
                          <strong>   {totalCost} GBP {/* Display the calculated total cost */}
                          </strong>
                        </div>
                    </div>
                ) : (
                    <div>No prescription has been added by the doctor for this appointment.</div>
                )}

                
<div className="button-container">

          <button type="button" className="print-prescription" onClick={printPrescription}> Print Prescription</button>
          
          <button type="button" className="cancel-prescription" onClick={navigateToPrescriptions}>
            Back to Prescriptions
          </button>
          <button
                            type="button"
                            className="buy-prescription"
                            onClick={navigateToPayment}
                            disabled={isPaid} >
                            Buy Prescription
                        </button>
          </div>
      </div>
    </div>
    </div>
  );
};

export default ViewPrescriptionForm;