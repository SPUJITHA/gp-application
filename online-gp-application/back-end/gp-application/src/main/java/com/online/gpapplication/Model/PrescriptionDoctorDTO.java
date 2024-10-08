package com.online.gpapplication.Model;

import java.util.Date;

import com.online.gpapplication.Model.Prescription.PaymentStatus;
import com.online.gpapplication.Model.Prescription.PrescriptionStatus;

public class PrescriptionDoctorDTO {
	
		private Long prescriptionId;
	    private Date dateIssued;
	    private PrescriptionStatus status;
	    private PaymentStatus paymentStatus;
	    private String transactionId;
	    private String trackingNumber;
	    // Fields from PrescriptionItems
	    private String medicineName;
	    
	    private Integer frequency;
	    private Integer duration;
	    private boolean refill;
	    private Integer refillMonths;
	    private Double totalCost;
	    public PrescriptionDoctorDTO(Long prescriptionId, Date dateIssued, PrescriptionStatus status, 
	                                 PaymentStatus paymentStatus, String transactionId, String trackingNumber,
	                                 String medicineName, Integer frequency, 
	                                 Integer duration, boolean refill, Integer refillMonths, Double totalCost ) {
	        this.prescriptionId = prescriptionId;
	        this.dateIssued = dateIssued;
	        this.status = status;
	        this.paymentStatus = paymentStatus;
	        this.transactionId = transactionId;
	        this.trackingNumber = trackingNumber;
	        this.medicineName = medicineName;
	        this.refillMonths = refillMonths;
	        this.frequency = frequency;
	        this.duration = duration;
	        this.refill = refill;
	        this.totalCost = totalCost;
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

		public String getMedicineName() {
			return medicineName;
		}

		public void setMedicineName(String medicineName) {
			this.medicineName = medicineName;
		}

		
		public Integer getFrequency() {
			return frequency;
		}

		public void setFrequency(Integer frequency) {
			this.frequency = frequency;
		}

		public Integer getDuration() {
			return duration;
		}

		public void setDuration(Integer duration) {
			this.duration = duration;
		}

		public boolean isRefill() {
			return refill;
		}

		public void setRefill(boolean refill) {
			this.refill = refill;
		}

		public Integer getRefillMonths() {
			return refillMonths;
		}

		public void setRefillMonths(Integer refillMonths) {
			this.refillMonths = refillMonths;
		}

		public Double getTotalCost() {
			return totalCost;
		}

		public void setTotalCost(Double totalCost) {
			this.totalCost = totalCost;
		}

		
	    // Getters and Setters
	    
	    
	
}
