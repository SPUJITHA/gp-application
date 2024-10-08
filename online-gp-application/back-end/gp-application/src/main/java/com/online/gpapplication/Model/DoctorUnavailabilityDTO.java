package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class DoctorUnavailabilityDTO {

    private String doctorEmailId;
    private LocalDate unavailableStartDay;
    private LocalDate unavailableEndDay;
    private String unavailableReason;
	public String getDoctorEmailId() {
		return doctorEmailId;
	}
	public void setDoctorEmailId(String doctorEmailId) {
		this.doctorEmailId = doctorEmailId;
	}
	public LocalDate getUnavailableStartDay() {
		return unavailableStartDay;
	}
	public void setUnavailableStartDay(LocalDate unavailableStartDay) {
		this.unavailableStartDay = unavailableStartDay;
	}
	public LocalDate getUnavailableEndDay() {
		return unavailableEndDay;
	}
	public void setUnavailableEndDay(LocalDate unavailableEndDay) {
		this.unavailableEndDay = unavailableEndDay;
	}
	public String getUnavailableReason() {
		return unavailableReason;
	}
	public void setUnavailableReason(String unavailableReason) {
		this.unavailableReason = unavailableReason;
	}
	public DoctorUnavailabilityDTO(String doctorEmailId, LocalDate unavailableStartDay, LocalDate unavailableEndDay,
			String unavailableReason) {
		super();
		this.doctorEmailId = doctorEmailId;
		this.unavailableStartDay = unavailableStartDay;
		this.unavailableEndDay = unavailableEndDay;
		this.unavailableReason = unavailableReason;
	}
    
      

}
