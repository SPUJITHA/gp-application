package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.online.gpapplication.Model.Appointment.AppointmentStatus;


public class DoctorAppointmentList {
	
	 private Long appointmentId;
	    private String patientEmailId;
	    private String firstName;
	    private String lastName;
	    private LocalDate appointmentDate;
	    private LocalTime appointmentTime;
	    private AppointmentStatus status;
	    private String symptoms;
	    private boolean prescriptionExists;
		public boolean isPrescriptionExists() {
			return prescriptionExists;
		}
		public void setPrescriptionExists(boolean prescriptionExists) {
			this.prescriptionExists = prescriptionExists;
		}
		public Long getAppointmentId() {
			return appointmentId;
		}
		public void setAppointmentId(Long appointmentId) {
			this.appointmentId = appointmentId;
		}
		public String getPatientEmailId() {
			return patientEmailId;
		}
		public void setPatientEmailId(String patientEmailId) {
			this.patientEmailId = patientEmailId;
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
		public String getSymptoms() {
			return symptoms;
		}
		public void setSymptoms(String symptoms) {
			this.symptoms = symptoms;
		}
		
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		
		public AppointmentStatus getStatus() {
			return status;
		}
		public void setStatus(AppointmentStatus status) {
			this.status = status;
		}
		public DoctorAppointmentList(Long appointmentId, String patientEmailId, String firstName,
				String lastName,LocalDate appointmentDate, LocalTime appointmentTime, AppointmentStatus status, String symptoms,
				 boolean prescriptionExists) {
			
			this.appointmentId = appointmentId;
			this.patientEmailId = patientEmailId;
			this.firstName = firstName;
			this.lastName = lastName;
			this.appointmentDate = appointmentDate;
			this.appointmentTime = appointmentTime;
			this.status = status;
			this.symptoms = symptoms;
			 this.prescriptionExists = prescriptionExists;
		}
	    
	    


}
