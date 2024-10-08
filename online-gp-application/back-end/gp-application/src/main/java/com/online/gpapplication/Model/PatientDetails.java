package com.online.gpapplication.Model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.online.gpapplication.Model.Appointment.AppointmentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@Table(name = "patient_details")
	public class PatientDetails {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "patient_id")
	    private Integer patientId;
	    
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "user_id")
	    private User user;
	    
	    @Column(name = "first_name",  length = 100)
	    private String firstName;

	    @Column(name = "last_name",  length = 100)
	    private String lastName;

	    @Column(name = "date_of_birth")
	    private LocalDate dateOfBirth;


	    @Enumerated(EnumType.STRING)
	    @Column(name = "gender")
	    private Gender gender;
	    
	    @Column(name = "phone_number", length = 15)
	    private String phoneNumber;
	    
	    @Column(name = "email", length = 15)
	    private String email;


	    @Column(name = "address_line1", length = 255)
	    private String addressLine1;

	    @Column(name = "address_line2", length = 255)
	    private String addressLine2;

	    @Column(length = 100)
	    private String city;

	    @Column(length = 100)
	    private String state;

	    @Column(name = "zip_code")
	    private String zipCode;

	    @Column(length = 100)
	    private String country;

	    @Lob
	    @Column(name = "medical_history")
	    private String medicalHistory;

	    @Lob
	    @Column
	    private String allergies;

	    @Lob
	    @Column(name = "current_medication")
	    private String currentMedication;

	    // Constructors, Getters, and Setters are omitted for brevity
	    
	    
	    
	    public enum Gender {
	        Male, Female, Other
	    }

	    
		public Integer getPatientId() {
			return patientId;
		}

		public void setPatientId(Integer patientId) {
			this.patientId = patientId;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
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

		public LocalDate getDateOfBirth() {
			return dateOfBirth;
		}

		public void setDateOfBirth(LocalDate dateOfBirth) {
			this.dateOfBirth = dateOfBirth;
		}

		public Gender getGender() {
			return gender;
		}

		public void setGender(Gender gender) {
			this.gender = gender;
		}

		public String getPhoneNumber() {
			return phoneNumber;
		}

		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}

		public String getAddressLine1() {
			return addressLine1;
		}

		public void setAddressLine1(String addressLine1) {
			this.addressLine1 = addressLine1;
		}

		public String getAddressLine2() {
			return addressLine2;
		}

		public void setAddressLine2(String addressLine2) {
			this.addressLine2 = addressLine2;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		public String getZipCode() {
			return zipCode;
		}

		public void setZipCode(String zipCode) {
			this.zipCode = zipCode;
		}

		public String getCountry() {
			return country;
		}

		public void setCountry(String country) {
			this.country = country;
		}

		public String getMedicalHistory() {
			return medicalHistory;
		}

		public void setMedicalHistory(String medicalHistory) {
			this.medicalHistory = medicalHistory;
		}

		public String getAllergies() {
			return allergies;
		}

		public void setAllergies(String allergies) {
			this.allergies = allergies;
		}

		public String getCurrentMedication() {
			return currentMedication;
		}

		public void setCurrentMedication(String currentMedication) {
			this.currentMedication = currentMedication;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}
	    
	    


}
