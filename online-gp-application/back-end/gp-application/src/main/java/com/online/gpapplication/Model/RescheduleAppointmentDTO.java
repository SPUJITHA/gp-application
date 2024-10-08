package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

public class RescheduleAppointmentDTO {
	
	private Long appointmentId;
	private String symptoms;
	 private LocalDate appointmentDate;
	 private LocalTime appointmentTime;
	public Long getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}
	public String getSymptoms() {
		return symptoms;
	}
	public void setSymptoms(String symptoms) {
		this.symptoms = symptoms;
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
	public RescheduleAppointmentDTO(Long appointmentId, String symptoms, LocalDate appointmentDate,
			LocalTime appointmentTime) {
		
		this.appointmentId = appointmentId;
		this.symptoms = symptoms;
		this.appointmentDate = appointmentDate;
		this.appointmentTime = appointmentTime;
	}
	
	// Default constructor if needed for other purposes
    public RescheduleAppointmentDTO() {}
	 
	 
	   

}
