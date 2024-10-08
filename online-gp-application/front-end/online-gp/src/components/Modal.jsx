import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Modal = ({ show, handleClose, type }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!inputs.email) {
      formIsValid = false;
      tempErrors['email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      formIsValid = false;
      tempErrors['email'] = 'Email is not valid';
    }

    if (!inputs.password) {
      formIsValid = false;
      tempErrors['password'] = 'Password is required';
    } else if (inputs.password.length < 6) {
      formIsValid = false;
      tempErrors['password'] = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log('Form is valid. Submitting...', inputs);
  //     handleClose(); // Close the modal
  //   }
  // };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        const loginEndpoint = type === 'doctor' ? 
            'http://localhost:8083/login/doctor' : 
            'http://localhost:8083/login/admin';

        try {
            const response = await axios.post(loginEndpoint, {
                emailId: inputs.email, // Ensure this matches your API's expected parameters
                password: inputs.password
            });

            // Process login success
            console.log(`${type} login successful`, response.data);
            navigate(type === 'doctor' ? '/doctor-homepage' : '/admin-dashboard', { state: { doctorEmailId: inputs.email } });
            handleClose(); // Close the modal on successful login
            
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(`${type} login error`, error.response.data);
                alert(`Login failed: ${error.response.data}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error(`${type} login error`, error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            // For any case, it's safe to say login failed
            alert('Login failed. Please try again.');
        }
    }
};

  const formContent = type === 'doctor' ? (
    <>
      <div className="form-input">
        <label htmlFor="doctorEmail">Email:</label>
        <input type="email" name="email" value={inputs.email} onChange={handleInputChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-input">
        <label htmlFor="doctorPassword">Password:</label>
        <input type="password" name="password" value={inputs.password} onChange={handleInputChange} />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
    </>
  ) : (
    <>
      <div className="form-input">
        <label htmlFor="adminEmail">Email:</label>
        <input type="email" name="email" value={inputs.email} onChange={handleInputChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-input">
        <label htmlFor="adminPassword">Password:</label>
        <input type="password" name="password" value={inputs.password} onChange={handleInputChange} />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
    </>
  );

  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        <h2>{type === 'doctor' ? 'Doctor / Nurse' : 'Admin'} Login</h2>
        <form onSubmit={handleFormSubmit}>
          {formContent}
          <div className="form-input">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <button type="button" onClick={handleClose} className="btn btn-secondary">
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
