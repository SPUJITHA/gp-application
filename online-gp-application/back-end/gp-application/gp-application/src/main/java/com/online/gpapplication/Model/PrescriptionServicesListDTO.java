package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import com.online.gpapplication.Model.Appointment.AppointmentStatus;
import com.online.gpapplication.Model.Prescription.PaymentStatus;
import com.online.gpapplication.Model.Prescription.PrescriptionStatus;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class PrescriptionServicesListDTO {
	
	 private Long appointmentId;
	    private String doctorName;
	  private Long prescriptionId;
	    
	    private Date dateIssued;

	    private PrescriptionStatus status;

	    private PaymentStatus paymentStatus;

	   
	    private String transactionId;

	  
	    private String trackingNumber;


		public Long getAppointmentId() {
			return appointmentId;
		}


		public void setAppointmentId(Long appointmentId) {
			this.appointmentId = appointmentId;
		}


		public String getDoctorName() {
			return doctorName;
		}


		public void setDoctorName(String doctorName) {
			this.doctorName = doctorName;
		}


		public Long getPrescriptionId() {
			return prescriptionId;
		}


		public void setPrescriptionId(Long prescriptionId) {
			this.prescriptionId = prescriptionId;
		}


		public Date getDateIssued() {
			return dateIssued;
		}


		public void setDateIssued(Date dateIssued) {
			this.dateIssued = dateIssued;
		}


		public PrescriptionStatus getStatus() {
			return status;
		}


		public void setStatus(PrescriptionStatus status) {
			this.status = status;
		}


		public PaymentStatus getPaymentStatus() {
			return paymentStatus;
		}


		public void setPaymentStatus(PaymentStatus paymentStatus) {
			this.paymentStatus = paymentStatus;
		}


		public String getTransactionId() {
			return transactionId;
		}


		public void setTransactionId(String transactionId) {
			this.transactionId = transactionId;
		}


		public String getTrackingNumber() {
			return trackingNumber;
		}


		public void setTrackingNumber(String trackingNumber) {
			this.trackingNumber = trackingNumber;
		}


		public PrescriptionServicesListDTO( Long prescriptionId, String doctorName,Long appointmentId, Date dateIssued,
				PrescriptionStatus status, PaymentStatus paymentStatus, String transactionId, String trackingNumber) {
			this.prescriptionId = prescriptionId;
			
			this.doctorName = doctorName;
			this.appointmentId = appointmentId;
			this.dateIssued = dateIssued;
			this.status = status;
			this.paymentStatus = paymentStatus;
			this.transactionId = transactionId;
			this.trackingNumber = trackingNumber;
		}
	    
		




}
