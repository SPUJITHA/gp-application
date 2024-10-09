import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Stripe from "react-stripe-checkout";
import StripeCheckout from 'react-stripe-checkout';
import { Link, useNavigate } from 'react-router-dom';
const stripePromise = loadStripe(''); // Ensure this is your Stripe publishable key

const Paymentform = () => {
    const navigate = useNavigate();
    const stripe = useStripe(); // Stripe instance
    const elements = useElements(); // Stripe elements
    const [clientSecret, setClientSecret] = useState(''); // Client secret for payment intent
    const location = useLocation(); // Access to React Router state
    const paymentAmount = location.state?.amount;
    const appointmentDetails = location.state?.appointment; // Use optional chaining
    const patientEmailId = location.state?.patientEmailId;
    const prescriptionId = location.state?.prescriptionId;
    console.log("Payment Appointment Id", appointmentDetails.appointmentId);
    console.log ("Payment amount", paymentAmount);
    console.log("Prescription Id :", prescriptionId);
    const handlePaymentSuccess = async (prescriptionId) => {
        try {
            console.log("Updating payment status for prescription ID:", prescriptionId); // Debug logging
            const response = await axios.post(
                'http://localhost:8083/prescription/update-payment-status',
                { prescriptionId: prescriptionId }
            );
            navigate('/view-prescription-form', { state: { 
                appointment: appointmentDetails,
                patientEmailId: patientEmailId  } });
            if (response.status === 200) {
                console.log('Payment status updated successfully');
            } else {
                console.error('Failed to update payment status');
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };
    const handleToken = async (token) => {
        const response = await axios.post('http://localhost:8083/api/payments/charge',  {
           
                token: token.id,
                amount: paymentAmount,
            
        });
        if (response.status === 200) {
            alert('Payment Successful');
            handlePaymentSuccess(prescriptionId); // Ensure correct prescription ID
            navigate('/view-prescription-form', {state : {appointment : appointmentDetails, patientEmailId : patientEmailId, refreshPrescriptions: true}});
        } else {
            alert('Payment Failed');
        }
    };

    return (
        <StripeCheckout
            stripeKey="pk_test_51P83qdRueapjU1d1qcAjCsyvd9SCgmKX3YayecEwLN1KMlndC8SHHs1Yz9RJHJHVx7krnu5WWpg3XuFaLBDpNJzo007b8erzPp" // Your publishable key
            token={handleToken}
        />
    );
};

const Payment = () => (
    <Elements stripe={stripePromise}> {/* Ensure Stripe elements are initialized */}
        <Paymentform /> {/* Load the payment form */}
    </Elements>
);

export default Payment;
