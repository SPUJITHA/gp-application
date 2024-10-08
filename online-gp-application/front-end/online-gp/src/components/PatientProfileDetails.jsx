import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import '../css/PatientProfile.css'; 
import UserContext from '../components/UserContext.jsx';
import logoImage from '../assets/logoimage.jpg';
import DoctorFilter from '../components/DoctorFilter.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
const PatientProfileDetails = () => {

  const { user } = useContext(UserContext);
  
  // Now, you can safely use `user`
  const userEmail = user?.emailId ?? null;
  const emailId = user?.emailId;
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personalDetails');
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  console.log("User email ID",emailId);
  const location = useLocation();
  const patientEmailId = location.state?.emailId;
  console.log(patientEmailId);
  const [formData , setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '', // Make sure this is formatted as required by your backend (e.g., 'YYYY-MM-DD')
    gender: '',
    phoneNumber: '',
    email:'',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    medicalHistory: '',
    allergies: '',
    currentMedication: '',
    emailId : emailId
    // user: {}, // This would be an object representing the User entity related to this patient
  });
  
  const savePatientDetails = async () => {
    // Construct the payload including the email ID
    const payload = {
      ...formData,
      dateOfBirth: formatDateForBackend(date),
      emailId: user.emailId // or however you get the email ID
    };
    console.log("Payload being sent:", payload);
    try {
      const response = await axios.post('http://localhost:8083/api/patient-details', payload);
      console.log('Patient details saved:', response.data);
      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        alert('Details are being saved');
    }
      // Handle successful saving, such as redirecting to a profile page or showing a success message
    } catch (error) {
      console.error('Failed to save patient details:', error.response.data);

      // Handle errors, possibly by showing a message to the user
    }
  };
  
  const changeSection = (section) => {
    setActiveSection(section);
  };
  
  const handlePatientFormSubmit = async (event) => {
    event.preventDefault();
    // Ensure that dateOfBirth has a valid value before submitting
    if (!formData.dateOfBirth) {
      setErrors({ ...errors, dateOfBirth: 'Date of Birth is required.' });
      return;
    }
    if (activeSection === 'medicalDetails') {
      // Make the API call to save patient details
      savePatientDetails();
    }
  };

  const navigateToAppointments = () => {
    if (user?.emailId) {
      console.log("Home Page email id", user.emailId);
      navigate('/appointment-list', { state: { emailId: user.emailId } });
    } else {
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
   
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
  const goToPersonalDetails = () => {
    setActiveSection('personalDetails');
  };

  const validatePersonalDetails = () => {
    let tempErrors = {};
    tempErrors.firstName = formData.firstName ? "" : "First Name is required.";
    tempErrors.lastName = formData.lastName ? "" : "Last Name is required.";
    tempErrors.gender = formData.gender ? "" : "Gender is required.";
    tempErrors.dateOfBirth = formData.dateOfBirth ? "" : "Date Of Birth is required.";
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = "Phone Number is required.";
    } else if (formData.phoneNumber.length !== 10 || !/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone Number must be 10 digits.";
    }
    tempErrors.email = formData.email ? "" : "Email is required.";
    tempErrors.addressLine1 = formData.addressLine1 ? "" : "Address Line 1 is required.";
    tempErrors.city = formData.city ? "" : "City is required.";
    tempErrors.state = formData.state ? "" : "State is required.";
    tempErrors.zipCode = formData.zipCode ? "" : "Zip Code is required.";
    tempErrors.country = formData.country ? "" : "Country is required.";
  
    setErrors({ ...tempErrors });
  
    return Object.values(tempErrors).every(x => x === "");
  };

  const goToMedicalDetails = () => {
    console.log("Validating personal details...");
  
    if (validatePersonalDetails()) {
      console.log("All validations passed, navigating to medical details...");
      setActiveSection('medicalDetails');
    } else {
      console.log("Validation failed, staying on personal details...");
    }
  };

  const handleDateChange = (e) => {
    if (!isDateOfBirthSet) {  // Allow change only if date of birth is not set
      // setFormData({ ...formData, dateOfBirth: e.target.value });
      handleChange(e);
    }
  };

  // Ensure this function is used to format your date correctly
  const formatDateForBackend = (date) => {
    return [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + date.getDate()).slice(-2)
    ].join('-');
  };

  useEffect(() => {
  // Function to fetch existing patient details
  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/patient-details/${emailId}`);
      
      // Check if the user already has patient details
      if (response && response.data) {
        // Populate form with existing patient details
        setFormData({
          ...formData,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          dateOfBirth: response.data.dateOfBirth ? new Date(response.data.dateOfBirth).toISOString().split('T')[0] : '',
          gender: response.data.gender,
          email : response.data.email,
          phoneNumber: response.data.phoneNumber,
          addressLine1: response.data.addressLine1,
          addressLine2: response.data.addressLine2,
          city: response.data.city,
          state: response.data.state,
          zipCode: response.data.zipCode,
          country: response.data.country,
          medicalHistory: response.data.medicalHistory,
          allergies: response.data.allergies,
          currentMedication: response.data.currentMedication,
          // ... populate other fields as necessary
        });
        setIsDateOfBirthSet(!!response.data.dateOfBirth);  // Set the flag if date of birth is present
      }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // No existing details, can ignore or log appropriately
            console.log('No existing patient details');
          } else {
            // Handle other errors
            console.error('Error fetching patient details:', error);
          }
        }
      };
      
      if (user && user.emailId) {
        fetchPatientDetails();
      }
    }, [user]);
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
    
  
    const [isDateOfBirthSet, setIsDateOfBirthSet] = useState(false);
return (

     <div className="patient-profile-container">
      
          <header className="header">
          <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {user && (
            <div className="welcome-message">
              <p>Welcome, {user.emailId}!</p> 
            </div>
          )}
          <div className="nav-links">
            <Link to="/home">Home</Link>
            { userEmail && <Link to="/prescription-services">Prescription Services</Link> }
          
            {/* <button className="appointment-btn" onClick={handleMakeAppointment}>
              Make an Appointment
            </button>
             */}
             { userEmail && <Link to="/appointment">Book an Appointment</Link>}
            {/* <Link to={{ pathname: "/appointment-list", state: { emailId: user?.emailId }}}> Your Bookings </Link> */}
            { userEmail && <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>}
            { userEmail && <Link to="/technical-request" onClick={navigateToTechnicalRequest}>Raise Support Request</Link>}
            { userEmail && <Link to="/technical-request-list" onClick={navigateToPatientSupportRequests}>Your Support Requests</Link>}
          
            {/* { userEmail && <Link to="/patient-profile-details" onClick ={navigateToPatientProfile}>Profile</Link>} */}
            { userEmail && <Link to="/wellness-information-hub" onClick = {navigateToInformationHub}> Information Hub</Link>}
            { !userEmail && <Link to="/user-login">Login</Link> }
            { userEmail && <Link to="/user-login">Logout</Link> }
          </div>
        </nav>  </header>
          

          <div className="patient-profile-container">
           
          <div className="sidebar">
        <div
          className={`sidebar-item ${activeSection === 'personalDetails' ? 'active' : ''}`}
          onClick={() => changeSection('personalDetails')}
        >
          Personal Details
        </div>
        <div
          className={`sidebar-item ${activeSection === 'medicalDetails' ? 'active' : ''}`}
          onClick={() => changeSection('medicalDetails')}
        >
          Medical Details
        </div>
      </div>
      
      <div className="patient-main-content">
      <h1 style={{ textAlign: 'center' }}>Patient Profile Details</h1>
        <form onSubmit={handlePatientFormSubmit} className="patient-form">
          {/* Conditionally render sections based on user selection */}
          {activeSection === 'personalDetails' && (
          <div className="personal-details">
          <div className="row">
            <div className="detail form-group">
              <label htmlFor="first-name">First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            <div className="detail form-group">
              <label htmlFor="last-name">Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
            <div className="detail form-group">
              <label htmlFor="gender">Gender:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="error-message">{errors.gender}</div>}
            </div>
          </div>
          <div className="row">
              <div className="detail form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleDateChange}
            disabled={isDateOfBirthSet}
          />
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
              </div>
              </div>
              <div className="row">
          <div className="detail form-group">
        <label htmlFor="phoneNumber">Phone Number :</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required/>
        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
        </div>

        <div className="detail form-group">
        <label htmlFor="email">Email :</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>
        {errors.email && <div className="error-message">{errors.email}</div>}
        </div>


        <div className="detail form-group">
        <label htmlFor="addressLine1">Address Line 1 :</label>
          <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" required/>
          {errors.addressLine1 && <div className="error-message">{errors.addressLine1}</div>}
        </div>
        <div className="detail form-group">
        <label htmlFor="addressLine2">Address Line 2 :</label>
          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
          {errors.addressLine2 && <div className="error-message">{errors.addressLine2}</div>}
        </div>
        </div>
        <div className="row">
        <div className="detail form-group">
        <label htmlFor="city">City :</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required/>
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>
        <div className="detail form-group">
        <label htmlFor="state">County :</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="County" required/>
          {errors.state && <div className="error-message">{errors.state}</div>}
        </div>
        <div className="detail form-group">
        <label htmlFor="zipCode">Postal Code :</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Postal Code" required/>
          {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
        </div>
        <div className="detail form-group">
        <label htmlFor="country">Country :</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />  
        {errors.country && <div className="error-message">{errors.country}</div>}
           </div>
           <div className="row">
           <button type="button" className="next-button" onClick={goToMedicalDetails}>Next</button>
           </div>
           </div>
           </div>
          )}
           {activeSection === 'medicalDetails' && (
          <div className="medical-details">
          <div className="row">
          <div className="detail form-group">
          <label htmlFor="medicalHistory">Medical History :</label>
          <textarea name="medicalHistory" rows ="5" value={formData.medicalHistory} onChange={handleChange} placeholder="Medical History" ></textarea>
          </div>
          </div>
          <div className="row">
          <div className="detail form-group">
          <label htmlFor="allergies">Allergies :</label>
          <textarea name="allergies" rows = "5" value={formData.allergies} onChange={handleChange} placeholder="Allergies"></textarea>
          </div>
          </div>
          <div className="row">
          <div className="detail form-group">
          <label htmlFor="currentMedication">Current Medication :</label>
          <textarea name="currentMedication" rows = "5" value={formData.currentMedication} onChange={handleChange} placeholder="Current Medication" ></textarea>
          </div>
          
          <div className="form-navigation-buttons">
                <button type="button" className="prev-button" onClick={goToPersonalDetails}>
                  Previous
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
          </div>

          </div>
           )}
          

        </form>
      </div>
    </div>
    </div>
  );
};

export default PatientProfileDetails;