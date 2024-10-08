package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentDetails {
	
	
	private LocalDate date;
    private LocalTime time;
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
	public AppointmentDetails(LocalDate date, LocalTime time) {
		
		this.date = date;
		this.time = time;
		
	}
   
    
    

}
