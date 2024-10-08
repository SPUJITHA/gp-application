import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import '../css/PrescriptionForm.css';

const PrescriptionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appointmentDetails = location.state?.appointment; // Use optional chaining
    const doctorEmailId = location.state?.doctorEmailId;
    console.log("DoctorEmailId : ",doctorEmailId);
    console.log("Doctor Email ID :", doctorEmailId);
    console.log("Appointment Details", appointmentDetails);
    // State to manage a list of prescriptions
    const [prescriptionItems, setPrescriptionItems] = useState([
        { medicineName: '',  frequency: '', duration: '', refill: false, refillMonths :'' }
    ]);
    const [medicines, setMedicines] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage form submission status
    // Function to handle changes to each prescription item
    const handlePrescriptionChange = (index, fieldName, value) => {
        const updatedPrescriptions = prescriptionItems.map((prescription, idx) => {
            if (idx === index) {
                return { ...prescription, [fieldName]: value };
            }
            return prescription;
        });
        setPrescriptionItems(updatedPrescriptions);
    };

    // Function to add new medication fields
    const addMedication = () => {
        setPrescriptionItems([...prescriptionItems, { medicineName: '',  frequency: '', duration: '', refill: false, refillMonths:'' }]);
    };

    // Function to remove medication fields
    const removeMedication = (index) => {
      const updatedPrescriptions = prescriptionItems.filter((_, idx) => idx !== index);
      setPrescriptionItems(updatedPrescriptions);
    };

   // Cancel button event handler
    const handleCancel = () => {
        navigate(-1);
    };

    // Function to handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have doctorEmailId and appointmentDetails from the state or context
    setIsSubmitting(true);
    try {
        // Here you will construct the payload and send it to your backend
        const payload = {
            appointmentId: appointmentDetails.appointmentId,
            patientEmailId: appointmentDetails.patientEmailId,
            doctorEmailId: doctorEmailId, // Ensure you have doctorEmailId available in your component's state
            status: 'New', // Set the status or get it from the form if needed
            notes: '', // Fetch notes value from state if it's being input by the user
            items: prescriptionItems.map(item => ({
                medicineName: item.medicineName,
                frequency: item.frequency,
                duration: parseInt(item.duration),
                refill: item.refill || false, // Ensure this is a boolean
                refillMonths : item.refillMonths

            })),
        };
        const response = await axios.post('http://localhost:8083/prescription/save', payload); // Adjust the endpoint as needed
        if (response && response.data) {
      
            alert ('Prescription Form is being added !!!!');
            navigate(-1);
            console.log(response.data);
        }
       
       
        // Handle response and user feedback
    } catch (error) {
        console.error('Error saving the prescription', error);
        // Handle error and user feedback
    }
  finally {
    setIsSubmitting(false); // Reset submission status
}
};

useEffect(() => {
  const fetchMedicines = async () => {
      try {
          const response = await axios.get('http://localhost:8083/api/medicines');
          if (response.status === 200) {
              setMedicines(response.data);
          } else {
              console.error('Failed to fetch medicines');
          }
      } catch (error) {
          console.error('Error fetching medicines:', error);
      }
  };

  fetchMedicines();
}, []);

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
          <button onClick={() => navigate('/holiday-list', { state: { doctorEmailId: doctorEmailId } })}>
              Holiday List
            </button>
            <button onClick={() => navigate('/doctor-appointment', { state: { doctorEmailId: doctorEmailId } })}>
              Appointments
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
    
          <div className="prescription-form-container">
      <div className="main-content">
        <h1>Add Prescription Details</h1>
        {appointmentDetails && (
                        <div className="appointment-details">
                            <p><strong>Patient First Name:</strong> {appointmentDetails.firstName}</p>
                            <p><strong>Patient Last Name:</strong> {appointmentDetails.lastName}</p>
                            <p><strong>Patient Email:</strong> {appointmentDetails.patientEmailId}</p>
                            <p><strong>Appointment ID:</strong> {appointmentDetails.appointmentId}</p>
                            <p><strong>Appointment Date:</strong> {appointmentDetails.appointmentDate}</p>
                            <p><strong>Appointment Time:</strong> {appointmentDetails.appointmentTime}</p>
                            <p><strong>Patient Symptoms:</strong> {appointmentDetails.symptoms}</p>
                            {/* Add other appointment details you want to display */}
                        </div>
                    )}
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <label className="form-label">Medicine Name</label>
          <label className="form-label">Frequency(times a day)</label>
          <label className="form-label">Duration(in days)</label>
          <label className="form-label">Refill </label>
          <label className="form-label">Months(Refill after)</label>
          <label className="form-label">Operations</label>
        </div>

        {prescriptionItems.map((prescription, index) => (
          <div className="form-row" key={index}>
            {/* <input
              className="form-input"
              type="text"
              name="medicineName"
              value={prescription.medicineName}
              onChange={(e) => handlePrescriptionChange(index, 'medicineName', e.target.value)}
            /> */}
          <select
                                    className="form-input"
                                    value={prescription.medicineName}
                                    onChange={(e) => handlePrescriptionChange(index, 'medicineName', e.target.value)}>
                                    <option value="">Select Medicine</option>
                                    {medicines.map(medicine => (
                                        <option key={medicine.medicineId} value={medicine.medicineName}>
                                            {medicine.medicineName}
                                        </option>
                                    ))}
                                </select>
            <input
              className="form-input"
              type="text"
              name="frequency"
              value={prescription.frequency}
              onChange={(e) => handlePrescriptionChange(index, 'frequency', e.target.value)}
            />
            <input
              className="form-input"
              type="text"
              name="duration"
              value={prescription.duration}
              onChange={(e) => handlePrescriptionChange(index, 'duration', e.target.value)}
            />
            
            <input
                type="checkbox"
                checked={prescription.refill}
                onChange={(e) => handlePrescriptionChange(index, 'refill', e.target.checked)}
              />
              
              {prescription.refill && (
                <input
                  type="text"
                  name="refillMonths"
                  value={prescription.refillMonths}
                  onChange={(e) => handlePrescriptionChange(index, 'refillMonths', e.target.value)}
                  placeholder="Enter months for refill"
                />
              )}

            <div className="form-operations">
              {prescriptionItems.length - 1 === index && (
                <button type="button"  onClick={addMedication} className="operation-button">+</button>
              )}
              {prescriptionItems.length > 1 && (
                <button type="button" onClick={() => removeMedication(index)} className="operation-button">-</button>
              )}
            </div>
          </div>
        ))}
       
       
         <div className="form-buttons"> 
          <button type="submit" className="submit-prescription"  disabled={isSubmitting}>Submit Prescription</button>
          <button type="button"  className="cancel-prescription" onClick={handleCancel} >Back to Appointments</button>
        </div>
      </form>
    
        
      </div>
    </div>
    </div>
    
  );
};

export default PrescriptionForm;