package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.online.gpapplication.Model.Appointment.AppointmentStatus;
import com.online.gpapplication.Model.PatientDetails.Gender;

public class PatientListDTO {
	
	 private Integer patientId;
	    private String firstName;
	    private String lastName;
	    private LocalDate dateOfBirth;
	    private Gender gender;
	    private String phoneNumber;
	    private String email;
	    private String medicalHistory;
	    private String currentMedication;
	    private String allergies;
	   public Integer getPatientId() {
			return patientId;
		}
		public void setPatientId(Integer patientId) {
			this.patientId = patientId;
		}
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public LocalDate getDateOfBirth() {
			return dateOfBirth;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public void setDateOfBirth(LocalDate dateOfBirth) {
			this.dateOfBirth = dateOfBirth;
		}
		public String getPhoneNumber() {
			return phoneNumber;
		}
		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}
		public String getMedicalHistory() {
			return medicalHistory;
		}
		public void setMedicalHistory(String medicalHistory) {
			this.medicalHistory = medicalHistory;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getCurrentMedication() {
			return currentMedication;
		}
		public void setCurrentMedication(String currentMedication) {
			this.currentMedication = currentMedication;
		}
		public String getAllergies() {
			return allergies;
		}
		public void setAllergies(String allergies) {
			this.allergies = allergies;
		}
		// Default constructor
	    public PatientListDTO() {
	    }


	    public Gender getGender() {
	        return gender;
	    }

	    public void setGender(Gender gender) {
	        this.gender = gender;
	    }

	    // Parameterized constructor
	    public PatientListDTO(Integer patientId, String firstName, String lastName, LocalDate dateOfBirth,
	            Gender gender, String phoneNumber, String email, String medicalHistory, String currentMedication,
	            String allergies) {
	        
	        this.patientId = patientId;
	        this.firstName = firstName;
	        this.lastName = lastName;
	        this.dateOfBirth = dateOfBirth;
	        this.gender = gender;
	        this.phoneNumber = phoneNumber;
	        this.email = email;
	        this.medicalHistory = medicalHistory;
	        this.currentMedication = currentMedication;
	        this.allergies = allergies;
	    }

		
	    


}
