package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;

public class DoctorAvailabilityResponseDTO {
	
	
	private Integer availabilityId;
    private LocalDate availableDay;

    
    private LocalTime availableStartTime;

    
    private LocalTime availableEndTime;


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


	public Integer getAvailabilityId() {
		return availabilityId;
	}


	public void setAvailabilityId(Integer availabilityId) {
		this.availabilityId = availabilityId;
	}


	public DoctorAvailabilityResponseDTO(Integer availabilityId, LocalDate availableDay, LocalTime availableStartTime, LocalTime availableEndTime) {
		this.availabilityId = availabilityId;
	    this.availableDay = availableDay;
	    this.availableStartTime = availableStartTime;
	    this.availableEndTime = availableEndTime;
	}


}
