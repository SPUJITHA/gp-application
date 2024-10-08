package com.online.gpapplication.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.online.gpapplication.Model.Appointment.AppointmentStatus;

// Assuming this class is meant to match the query's result
public class AppointmentListDTO {

    private Long appointmentId;
    private String doctorName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private Appointment.AppointmentStatus status;
    private String symptoms;
    private String speciality;
    private String doctorEmailId;

    // Default constructor
    public AppointmentListDTO() {
    }

    // Constructor matching the query result
    public AppointmentListDTO(Long appointmentId, String doctorName, LocalDate appointmentDate,
                              LocalTime appointmentTime, Appointment.AppointmentStatus status, 
                              String symptoms, String speciality,String doctorEmailId) {
        this.appointmentId = appointmentId;
        this.doctorName = doctorName;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.symptoms = symptoms;
        this.speciality = speciality;
        this.doctorEmailId = doctorEmailId;
    }

    // Getters and setters
    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
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

    public Appointment.AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(Appointment.AppointmentStatus status) {
        this.status = status;
    }
    
    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getDoctorEmailId() {
		return doctorEmailId;
	}

	public void setDoctorEmailId(String doctorEmailId) {
		this.doctorEmailId = doctorEmailId;
	}
	
	
}
