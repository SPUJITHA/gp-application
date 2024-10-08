import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/DoctorHomePage.css'; // Your CSS file path here
import UserContext from '../components/UserContext.jsx'; 
import logoImage from '../assets/logoimage.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const DoctorProfile = () => {
  const { user } = useContext(UserContext);
  const userEmail = user?.emailId;
  console.log("User Email", userEmail);
  
    const navigate = useNavigate();
    const navigateToSupportRequests = () =>
    {
      navigate('/admin-technical-request' , { state: { emailId: userEmail } });
    }
    
    const [specialities, setSpecialities] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState({
      doctorName: '',
      speciality: '',
      qualifications: '',
      emailId: '',
      phoneNumber: ''
    });
    const [userDetails, setUserDetails] = useState({
      emailId: '',
      password: '',
      role: 'Doctor'
    });
  
    // Update handles to ensure correct field naming and structuring
const handleChange = (e) => {
    const { name, value } = e.target;
    if (['emailId', 'password', 'role'].includes(name)) {
        setUserDetails(prev => ({ ...prev, [name]: value }));
    } else {
        setDoctorDetails(prev => ({ ...prev, [name]: value }));
    }
};

    const fetchSpecialities = async () => {
      try {
        const response = await axios.get('http://localhost:8083/doctors/speciality-list');
        setSpecialities(response.data);
      } catch (error) {
        console.error('Error fetching specialities:', error);
      }
    };
  
    useEffect(() => {
      fetchSpecialities();
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            user: userDetails,
            doctor: doctorDetails
        };
        try {
            const response = await axios.post('http://localhost:8083/doctors/add', postData);
            alert('Doctor added successfully!');
            navigate('/admin-dashboard');
        } catch (error) {
            console.error('Error adding doctor:', error.response || error);
            alert('Failed to add doctor!');
        }
    };
    
  return (
    <div className="doctorprofile">
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
      <main className="main-content">
        
      <form onSubmit={handleSubmit}>
            <h2>Add Doctor</h2>
            <div className="mb-3">
            <label htmlFor="doctorName" className="form-label">Please enter doctor name:</label>
        <input
          type="text"
          className="form-control"
          id="doctorName"
          name="doctorName"
          placeholder="Enter doctor name"
          onChange={handleChange}
          value={doctorDetails.doctorName}
        />
     
            </div>
            <div className="mb-3">
    <label htmlFor="speciality" className="form-label">Please select speciality:</label>
    <select name="speciality" value={doctorDetails.speciality} onChange={handleChange}>
        <option value="">Select Speciality</option>
        {specialities.length > 0 ? (
            specialities.map((speciality) => (
                <option key={speciality.symptomId} value={speciality.speciality}>{speciality.speciality}</option>
            ))
        ) : (
            <option disabled>Loading specialities...</option>
        )}
    </select>    
</div>

            <div className="mb-3">
            <label htmlFor="qualifications" className="form-label">Please enter qualifications:</label>
        <input
          type="text"
          className="form-control"
          id="qualifications"
          placeholder="Enter qualifications"
          onChange={handleChange}
          value={doctorDetails.qualifications} name="qualifications"
        />
           
            </div>
           
            <div className="mb-3">
            <label htmlFor="emailId" className="form-label">Please enter emailId:</label>
        <input
          type="email"
          className="form-control"
          id="emailId"
          placeholder="Enter Doctor Email Id"
          onChange={handleChange}
          value={userDetails.emailId} name="emailId"
        />
           
            </div>

            <div className="mb-3">
            <label htmlFor="password" className="form-label">Please enter password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={userDetails.password} name="password"
        />
           </div>

           <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Please enter phone Number:</label>
                
                <input type="string" className ="form-control" name="phoneNumber" value={doctorDetails.phoneNumber} onChange={handleChange} />
                
            </div>
            <button type="submit">Add Doctor</button>
        </form>
      </main>
      </div>
    
  );
}

export default DoctorProfile;
