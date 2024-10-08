package com.online.gpapplication.Model;

import java.time.LocalDate;

public class AppointmentTrendsDTO {
	
	 private LocalDate appointmentDate;
	 private Long count;
	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}
	public void setAppointmentDate(LocalDate appointmentDate) {
		this.appointmentDate = appointmentDate;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	public AppointmentTrendsDTO(LocalDate appointmentDate, Long count) {
		super();
		this.appointmentDate = appointmentDate;
		this.count = count;
	}
	 
	 

}
