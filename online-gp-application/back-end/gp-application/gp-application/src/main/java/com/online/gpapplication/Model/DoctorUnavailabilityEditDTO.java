package com.online.gpapplication.Model;

import java.time.LocalDate;

public class DoctorUnavailabilityEditDTO {

	private LocalDate unavailableStartDate;
    private LocalDate unavailableEndDate;
    private String unavailableReason;
	
	public LocalDate getUnavailableStartDate() {
		return unavailableStartDate;
	}
	public void setUnavailableStartDate(LocalDate unavailableStartDate) {
		this.unavailableStartDate = unavailableStartDate;
	}
	public LocalDate getUnavailableEndDate() {
		return unavailableEndDate;
	}
	public void setUnavailableEndDate(LocalDate unavailableEndDate) {
		this.unavailableEndDate = unavailableEndDate;
	}
	public String getUnavailableReason() {
		return unavailableReason;
	}
	public void setUnavailableReason(String unavailableReason) {
		this.unavailableReason = unavailableReason;
	}
	public DoctorUnavailabilityEditDTO( LocalDate unavailableStartDate,
			LocalDate unavailableEndDate, String unavailableReason) {
		
		
		this.unavailableStartDate = unavailableStartDate;
		this.unavailableEndDate = unavailableEndDate;
		this.unavailableReason = unavailableReason;
	}
	

}
