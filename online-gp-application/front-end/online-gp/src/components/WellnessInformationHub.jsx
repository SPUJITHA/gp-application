import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../components/UserContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom'; // import useNavigate if you need to redirect
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoimage.jpg';
import '../css/WellnessInformationHub.css';
import { Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DietPieChart from '../components/DietPieChart'; // Adjust the path as necessary
import HealthTips from '../components/HealthTips';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dietImage from '../assets/diet.jpeg';
import exerciseImage from '../assets/exercise.jpeg';
import lifestyleImage from '../assets/lifestyle.jpeg';
import employeeWellnessImage from '../assets/employeewellness.webp';
import nutritionImage from '../assets/nutrition.jpeg';
import dietQualityImage from '../assets/dietquality.png';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const WellnessInformationHub = () => {

   // Settings for the carousel
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // if you are using react-router v6
  const userEmail = user?.emailId ?? null;
  const emailId = user?.emailId;
  const state = useLocation();
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [tips, setTips] = useState('');
  
  const wellnessTips = {
    KidneyFunction: {
    tips: 'Focus on low potassium foods, and avoid salt and high protein intake.',
    diet: 'Increased water intake, cranberries, apples, cabbage, and bell peppers.',
  },
  SkinInfection: {
    tips: 'Keep the skin clean and dry. Use mild soaps and avoid irritating the skin with tight clothing.',
    diet: 'Eat foods rich in antioxidants and vitamins A and E, such as nuts, seeds, carrots, and spinach.',
  },
  Headache: {
    tips: 'Stay hydrated, avoid loud noises, and get plenty of sleep.',
    diet: 'Include magnesium-rich foods like almonds, spinach, and bananas in your diet.',
  },
  Cancer: {
    tips: 'Consult with a nutritionist to support immune function and maintain healthy body weight.',
    diet: 'Focus on plant-based foods, minimize sugar and processed meats.',
  },
  Arthritis: {
    tips: 'Engage in regular physical activity to maintain joint function and reduce stiffness.',
    diet: 'Consume anti-inflammatory foods like fatty fish, nuts, and green leafy vegetables.',
  },
  Diabetes: {
    tips: 'Monitor blood sugar levels regularly and maintain physical activity.',
    diet: 'Focus on a balanced diet with low glycemic index foods like whole grains and pulses.',
  },
  AllergicReactions: {
    tips: 'Avoid triggers and carry antihistamines or epinephrine as prescribed.',
    diet: 'Eat a well-balanced diet excluding allergen-specific foods.'
  },
  Fever: {
    tips: 'Stay hydrated and rest as much as possible.',
    diet: 'Eat light meals and drink plenty of fluids, especially water and herbal teas.',
  },
  DepressionAndAnxiety: {
    tips: 'Engage in stress-relief activities such as yoga, meditation, or therapy.',
    diet: 'Incorporate omega-3 fatty acids, magnesium, and vitamins B and D into your diet.'
  },
  Nausea: {
    tips: 'Eat small, frequent meals instead of three large meals.',
    diet: 'Focus on bland foods like toast, crackers, and rice; avoid greasy or spicy foods.',
  },
  StomachInfection: {
    tips: 'Maintain good hygiene, wash hands frequently, and avoid contaminated food and water.',
    diet: 'Stick to bland, easy-to-digest foods such as bananas, rice, applesauce, and toast (BRAT diet).',
  },
  SkinMelasma: {
    tips: 'Protect your skin from the sun using a high-SPF sunscreen and wear protective clothing.',
    diet: 'Include foods rich in antioxidants and Vitamin C, like citrus fruits and berries.'
  }
    };
  const patientEmailId = location.state?.patientEmailId;
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
  
    const [symptom, setSymptom] = useState('');
    const [response, setResponse] = useState(null);
   
    const handleInputChange = (event) => {
      setSymptom(event.target.value);
    };
    const handleSymptomChange = (symptomValue) => {
      setSymptom(symptomValue.toLowerCase()); // Set state, useEffect handles the rest
    };
    
    useEffect(() => {
      console.log("Symptom", symptom);
      const tipDetails = wellnessTips[symptom] || { tips: "No specific tips available for this condition." };
      console.log("Tips Details", tipDetails); // Now logs correctly when symptom changes
      setTips(tipDetails.tips);
    }, [symptom, wellnessTips]);
  
    const handleSubmit = () => {
      if (symptom in wellnessTips) {
        setResponse(wellnessTips[symptom]);
      } else {
        setResponse({ tips: 'No specific tips available.', diet: 'No specific diet chart available.', chartData: null });
      }
    };
    
   
    
  const handleSymptomSelected = (symptom, dietData) => {
    setSelectedSymptom(symptom);
    setTips(dietData.tips);
  };
  const [tipsDietInfo, setTipsDietInfo] = useState({ tips: '', diet: '' });

  // Callback to handle updated tipsDietInfo
  const handleTipsDietInfoUpdate = (updatedInfo) => {
    setTipsDietInfo(updatedInfo);
  };
  return (
    <div className="wellness-information-hub" style={{paddingTop: '300px'}}>
         <header className="wellness-header">
      <nav className="navbar">
          <Link to="/" className="logo" >
          <img src={logoImage} alt="Docmed Logo" className="logo-img"/>
          </Link>
          {userEmail && (
            <div className="welcome-message">
              <p>Welcome, {userEmail}!</p> 
            </div>
          )}
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/prescription-services">Prescription Services</Link>
            { !userEmail && <Link to="/user-login">Login</Link> }
            <Link to="/appointment">Book an Appointment</Link>
            <Link to="/appointment-list" onClick={navigateToAppointments}>Your Bookings</Link>
            <Link to="/patient-profile-details">Profile</Link>
            { userEmail && <Link to="/user-login">Logout</Link> }
          </div>
        </nav>
      </header>
     {/* <div className="main-content"> */}
     
     <Container maxWidth={false} className="container">
     <Typography variant="h4" gutterBottom>
  Wellness Information Hub
</Typography>
<div className="slider">
<Slider {...settings}>
  <div>
    <img src={dietImage} alt="Diet" />
  </div>
  <div>
    <img src={exerciseImage} alt="Exercise" />
  </div>
  <div>
    <img src={lifestyleImage} alt="Lifestyle" />
  </div>
  {/* <div>
    <img src={employeeWellnessImage} alt="Employee Wellness" />
  </div> */}
  <div>
    <img src={nutritionImage} alt="Nutrition" />
  </div>
  <div>
    <img src={dietQualityImage} alt="Diet Quality" />
  </div>
</Slider>
</div>
 <div style={{ display: 'flex', width : '700px', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'start' }}>
        <DietPieChart onSymptomSelected={handleSymptomSelected} />


        {/* <div>
                <h1>Tips: {tipsDietInfo.tips}</h1>
                <p>Diet: {tipsDietInfo.diet}</p>
            </div> */}
      
          
</div>
      </Container>
    
 </div>
  
);

 
  
}
export default WellnessInformationHub;