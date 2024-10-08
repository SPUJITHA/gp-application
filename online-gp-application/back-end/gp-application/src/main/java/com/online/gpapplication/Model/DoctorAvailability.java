package com.online.gpapplication.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "doctor_availability")
public class DoctorAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="availability_id")
    private Integer availabilityId;

    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "available_day")
    private LocalDate availableDay;

    @Column(name = "available_start_time")
    private LocalTime availableStartTime;

    @Column(name = "available_end_time")
    private LocalTime availableEndTime;

	public Integer getAvailabilityId() {
		return availabilityId;
	}

	public void setAvailabilityId(Integer availabilityId) {
		this.availabilityId = availabilityId;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
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

    // Standard getters and setters
    
    
}
