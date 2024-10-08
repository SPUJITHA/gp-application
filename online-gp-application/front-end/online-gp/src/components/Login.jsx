import React, { useState, useEffect, useContext } from 'react';
import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../components/Modal.jsx';
import API from '../assets/api.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../components/UserContext.jsx';
import logoImage from '../assets/logoimage.jpg';
axios.defaults.withCredentials = true; 
const LoginPage = () => {
    const [isSigningUp, setIsSigningUp] = useState(true); // Determines if we are showing the sign-up form
    // At the top of your LoginPage function
    const [errors, setErrors] = useState({});
    // States for siagn-in and sign-up form inputs
    const [patientName, setPatientName] = useState('');
    const [emailId, setEmailId] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [doctorPassword, setDoctorPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [doctorEmailId, setDoctorEmailId] = useState('');
    const [patientEmailId, setPatientEmailId] = useState('');
    const[patientPassword, setPatientPassword] = useState('');
    const [adminEmailId, setAdminEmailId] = useState('');
    const[adminPassword, setAdminPassword] = useState('');
    const [gender, setGender] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    // Handler to switch between sign-in and sign-up

    const [isPatientSignUp, setIsPatientSignUp] = useState(true);
    const [isDoctorSignIn, setIsDoctorSignIn] = useState(false);
    const [isPatientSignIn, setIsPatientSignIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [showDoctorModal, setShowDoctorModal] = useState(false);

    // Additional state to track visibility of admin modal
    const [showAdminModal, setShowAdminModal] = useState(false);

    const [formType, setFormType] = useState('patientSignUp'); 
      
     const { setUser } = useContext(UserContext);
    

    // Handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateFields()) {
        if (isSigningUp) {
            // Sign-up logic here
        } else {
            // Sign-in logic here
        }
    }
    };

    const handleButtonClick = (newFormType) => {
        setFormType(newFormType);
    };

      
        const handleDoctorLoginClick = () => {
          setShowDoctorModal(true);
        };
      
        const closeModal = () => {
          setShowDoctorModal(false);
        }
    
        const validateFields = () => {
            let tempErrors = {};
            let formIsValid = true;
        
            // Name validation
            if (!patientName) {
                formIsValid = false;
                tempErrors["patientName"] = "Cannot be empty";
            }
        
            // Email validation
            if (!emailId) {
                formIsValid = false;
                tempErrors["emailId"] = "Cannot be empty";
            } else if (!/\S+@\S+\.\S+/.test(emailId)) {
                formIsValid = false;
                tempErrors["emailId"] = "Email is not valid";
            }
        
            // Password validation
            if (!password) {
                formIsValid = false;
                tempErrors["password"] = "Cannot be empty";
            } else if (password.length < 6) {
                formIsValid = false;
                tempErrors["password"] = "Password must be at least 6 characters";
            }
        
            // Confirm password validation
            if (password !== confirmPassword) {
                formIsValid = false;
                tempErrors["confirmPassword"] = "Passwords do not match";
            }
        
            setErrors(tempErrors);
            return formIsValid;
        };
        
    
        // useEffect(() => {
        //     console.log('The showModal state is now: ', showDoctorModal);
        //   }, [showDoctorModal]);
    
        const [showLoginModal, setShowLoginModal] = useState(false);
        const [loginType, setLoginType] = useState(null);
      
        const handleOpenModal = (type) => {
           setLoginType(type);
          setShowLoginModal(true);
        };
      
        const handleCloseModal = () => {
          setShowLoginModal(false);
        };

        const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen);
        };

        

          // When the login form is submitted
          const onLoginSubmit = (event) => {
            event.preventDefault();
            const credentials = {
              email: inputs.email,
              password: inputs.password,
            };
            handleLogin(credentials);
          };


          
          const handlePatientSubmitEvent = async (event) => {
            event.preventDefault();
        
            // Perform validation checks here
        
            if (formType === 'patientSignUp') {
                const patientData = {
                  userName: patientName,
                  emailId: emailId,
                  password: password,
                  // Include any additional fields required for sign up
                };
                await registerPatient(patientData);
            } else if (formType === 'patientLogin') {
                const credentials = {
                  email: patientEmailId,
                  password: patientPassword,
                };
                await handleLogin(credentials); // This is the call to handle login
            } else {
                // If validation fails, show an alert or error message
                alert('Please check your input and try again.');
            }
        };
  
  const registerPatient = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8083/signup/patient', userData);
      if (response.status === 201) {
        // If the server responds with a Created status, inform the user
        setIsSignedIn(true);
        alert('Registration successful! Please log in.');
        setFormType('patientLogin'); // Switch to login form
  navigate('/user-login');
        
      } else {
        // Handle any other responses by showing the status text
        alert(`Registration failed: ${response.statusText}`);
      }
    } catch (error) {
      // Handle errors from the server side
      const errorMessage = error.response ? error.response.data : 'Please try again later.';
      alert(`Registration failed: ${errorMessage}`);
    }
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8083/login/patient', {
        emailId: patientEmailId,
        password: patientPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Validate OTP API Response", response.status);
      if (response.status === 200) {
        setIsSignedIn(true);
        // Redirect to the PatientDashboard or take necessary actions
        alert('Valid User');
        setUser({ emailId: patientEmailId, name: response.data.userName }); // Store both email and name
        navigate('/home'); 
        //window.location.href = '/booking.html';
      } else {
        alert(`Login failed: ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : 'Please try again later.';
      alert(`Login failed: ${errorMessage}`);
    }
  };
  
useEffect(() => {
    if (isSignedIn) {
        console.log('User is signed in, redirecting to Patient Dashboard', isSignedIn);
        // You can perform any additional actions here if needed
    }
}, [isSignedIn]);

// if (isSignedIn && formType === 'patientLogin') {
//     return <PatientDashboard emailId={patientEmailId} />;
//   }
  
    return (
        <div className="login-page-container">
            <header className="header">
            <nav className="navbar">        
            <Link to="/" className="logo" >
                <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
            </Link>
            <div className="button-container">
            <Link to="/home">Home</Link>
                <button onClick={() => handleOpenModal('doctor')}
                className='active'>
                    Doctor/Nurse Login
                </button>
                <button onClick={() => handleOpenModal('admin')}
                className='active'>
                    Admin  Login</button>
            </div>
            </nav>
            </header>
            <Modal show={showLoginModal} handleClose={handleCloseModal} type={loginType} />
      
            <div className="login-container">
            <div className="toggle-button-container">
                    <button 
                        onClick={() => handleButtonClick('patientSignUp')} 
                        className={formType === 'patientSignUp' ? 'active' : 'inactive'}>
                        Signup as Patient
                    </button>
                    <button 
                        onClick={() => handleButtonClick('patientLogin')} 
                        className={formType === 'patientLogin' ? 'active' : 'inactive'}>
                        Login as Patient
                    </button>
                </div>
                <h2>{
                formType === 'patientSignUp' 
                ? 'Signup to Login' 
                : 'Patient Login'
            }</h2>

            
        <form onSubmit={handlePatientSubmitEvent}>
                {formType === 'patientSignUp' ? (
                            <>
                                <div className="form-input">
                                    <label htmlFor="patient-name">Patient Name</label>
                                    <input
                                        type="text"
                                        id="patient-name"
                                        value={patientName}
                                        onChange={(e) => {
                                            setPatientName(e.target.value);
                                            setErrors({ ...errors, patientName: '' });
                                        }}
                                        
                                        placeholder='Enter Patient Name'
                                        required
                                    />
                                {errors.patientName && <div className="error">{errors.patientName}</div>}
                                </div>
                                <div className="form-input">
                                    <label htmlFor="emailId">Email ID</label>
                                    <input
                                        type="email"
                                        id="emailId"
                                        value={emailId}
                                        onChange={(e) => {
                                            setEmailId(e.target.value);
                                            setErrors({ ...errors, emailId: '' });
                                        }}
                                        
                                        placeholder='Enter Patient Email ID'
                                        required
                                    />
                                {errors.emailId && <div className="error">{errors.emailId}</div>}
                                </div>
                                
                                <div className="form-input">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors({ ...errors, password: '' });
                                        }}
                                        
                                        placeholder='Enter Password'
                                        required
                                    />
                                {errors.password && <div className="error">{errors.password}</div>}
                                </div>
                                <div className="form-input">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        placeholder='Enter Confirm Password'
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setErrors({ ...errors, confirmPassword: '' });
                                        }}
                                        
                                        required
                                    />
                                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                                </div>

                                
                            </>
                        ) : null}

                 {formType == 'patientLogin' ? (
                            <>

                <div className="form-input">
                <label htmlFor="patientEmailId">Patient Email ID</label>
                    <input
                        type="text"
                        id="patientEmailId"
                        value={patientEmailId}
                        placeholder='Enter Patient Email ID'
                        onChange={(e) => {
                            setPatientEmailId(e.target.value);
                            setErrors({ ...errors, patientEmailId: '' });
                        }}
                        required
                    />
                    {errors.patientEmailId && <div className="error">{errors.patientEmailId}</div>}
                </div>
                <div className="form-input">
                <label htmlFor="patientPassword">Patient Password</label>  
                    <input
                        type="password"
                        id="patientPassword"
                        value={patientPassword}
                        placeholder='Enter Patient Password'
                        onChange={(e) => {
                            setPatientPassword(e.target.value);
                            setErrors({ ...errors, patientPassword: '' });
                        }}
                        
                        required
                    />
                    {errors.patientPassword && <div className="error">{errors.patientPassword}</div>}
                </div>

                 </> ) : null }
                
                 <button type="submit" className="submit-button" >
                    {formType === 'patientSignUp' ? 'Signup' : 'Login'}
                </button>
 
                    </form>
                    </div>
                   

</div>
        
    );
}

export default LoginPage;
