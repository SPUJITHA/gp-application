package com.online.gpapplication.Model;


import java.time.LocalDate;
import java.time.LocalTime;
public class AppointmentDTO {

    private LocalDate date;
    private LocalTime time;
    private Long doctorRequestId;
    private String symptoms;
    private String userEmail;
    

    
    // Parameterized constructor
    public AppointmentDTO(LocalDate date, LocalTime time, Long doctorRequestId, String symptoms, String userEmail) {
        this.date = date;
        this.time = time;
        this.doctorRequestId = doctorRequestId;
        this.symptoms = symptoms;
        this.userEmail = userEmail;
    }


	public AppointmentDTO() {
		// TODO Auto-generated constructor stub
	}


	public LocalDate getDate() {
		return date;
	}


	public void setDate(LocalDate date) {
		this.date = date;
	}


	public LocalTime getTime() {
		return time;
	}


	public void setTime(LocalTime time) {
		this.time = time;
	}


	public Long getDoctorRequestId() {
		return doctorRequestId;
	}


	public void setDoctorId(Long doctorRequestId) {
		this.doctorRequestId = doctorRequestId;
	}


	public String getSymptoms() {
		return symptoms;
	}


	public void setSymptoms(String symptoms) {
		this.symptoms = symptoms;
	}


	public String getUserEmail() {
		return userEmail;
	}


	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

}