package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class DoctorAvailabilityDTO {

    private Integer doctorEmailId;
    private LocalDate availableDay;
    private LocalTime availableStartTime;
    private LocalTime availableEndTime;
	public Integer getDoctorEmailId() {
		return doctorEmailId;
	}
	public void setDoctorEmailId(Integer doctorEmailId) {
		this.doctorEmailId = doctorEmailId;
	}
	public LocalDate getAvailableDay() {
		return availableDay;
	}
	public void setAvailableDay(LocalDate availableDay) {
		this.availableDay = availableDay;
	}
	public LocalTime getAvailableStartTime() {
		return availableStartTime;
	}
	public void setAvailableStartTime(LocalTime availableStartTime) {
		this.availableStartTime = availableStartTime;
	}
	public LocalTime getAvailableEndTime() {
		return availableEndTime;
	}
	public void setAvailableEndTime(LocalTime availableEndTime) {
		this.availableEndTime = availableEndTime;
	}
	public DoctorAvailabilityDTO(Integer doctorEmailId, LocalDate availableDay, LocalTime availableStartTime,
			LocalTime availableEndTime) {
		super();
		this.doctorEmailId = doctorEmailId;
		this.availableDay = availableDay;
		this.availableStartTime = availableStartTime;
		this.availableEndTime = availableEndTime;
	}
    
    

}
