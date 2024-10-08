package com.online.gpapplication.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "doctor_unavailability")
public class DoctorUnavailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name="unavailability_id")
    private Long unavailabilityId;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "unavailable_start_day")
    private LocalDate unavailableStartDay;

    @Column(name = "unavailable_end_day")
    private LocalDate unavailableEndDay;

    @Column(name = "unavailable_reason")
    private String unavailableReason;

	public Long getUnavailabilityId() {
		return unavailabilityId;
	}

	public void setUnavailabilityId(Long unavailabilityId) {
		this.unavailabilityId = unavailabilityId;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
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

   
}
