	package com.online.gpapplication.Model;



	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.EnumType;
	import jakarta.persistence.Enumerated;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;
	import jakarta.persistence.Table;

	import java.time.LocalDate;
	import java.time.LocalTime;
import java.util.Optional;




	@Entity
	@Table(name = "appointments")
	public class Appointment {

		public enum AppointmentStatus {
		    Booked, Cancelled, Completed, Rescheduled
		}


		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "appointment_id")
	    private Long appointmentId;

	    @Column(name = "patient_id")
	    private Long patientId;
	    
	    @ManyToOne
	    @JoinColumn(name = "doctor_id", referencedColumnName = "doctor_id")
	    private Doctor doctor;
	    
	    @ManyToOne
	    @JoinColumn(name = "patient_details_id", referencedColumnName = "patient_id")  // This line links the patient_details_id in the Appointment table to the patient_id in the PatientDetails table.
	    private PatientDetails patientDetails;

	    
	    
	    @Column(name = "appointment_date")
	    private LocalDate appointmentDate;

	    @Column(name = "appointment_time")
	    private LocalTime appointmentTime;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "status")
	    private AppointmentStatus status;
	    
	    @Column(name="symptoms")
	    private String symptoms;

	    // Standard getters and setters

	    public Long getAppointmentId() {
	        return appointmentId;
	    }

	    public void setAppointmentId(Long appointmentId) {
	        this.appointmentId = appointmentId;
	    }

	    public Long getPatientId() {
	        return patientId;
	    }

	    public void setPatientId(Long patientId) {
	        this.patientId = patientId;
	    }

	    
	    public LocalDate getAppointmentDate() {
	        return appointmentDate;
	    }

	    public void setAppointmentDate(LocalDate appointmentDate) {
	        this.appointmentDate = appointmentDate;
	    }

	    public LocalTime getAppointmentTime() {
	        return appointmentTime;
	    }

	    public void setAppointmentTime(LocalTime appointmentTime) {
	        this.appointmentTime = appointmentTime;
	    }

	    public AppointmentStatus getStatus() {
	        return status;
	    }

	    public void setStatus(AppointmentStatus status) {
	        this.status = status;
	    }

		public String getSymptoms() {
			return symptoms;
		}

		public void setSymptoms(String symptoms) {
			this.symptoms = symptoms;
		}
	    
		  public Doctor getDoctor() {
		        return doctor;
		    }

		    public void setDoctor(Doctor doctor) {
		        this.doctor = doctor;
		    }

			public PatientDetails getPatientDetails() {
				return patientDetails;
			}

			public void setPatientDetails(PatientDetails patientDetails) {
				this.patientDetails = patientDetails;
			}

			
			
		
	



}
