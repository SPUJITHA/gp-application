package com.online.gpapplication.Model;



import java.time.LocalDate;
import java.time.LocalTime;

public class AdminAppointmentList {

    private Long appointmentId;
    private String firstName;
    private String lastName;
    private String patientEmailId;
    private String doctorName;
    private String doctorSpeciality;
    private LocalDate date;
    private LocalTime time;
    private Appointment.AppointmentStatus status;

    // Constructors, Getters, and Setters

   
	public Long getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPatientEmailId() {
		return patientEmailId;
	}

	public void setPatientEmailId(String patientEmailId) {
		this.patientEmailId = patientEmailId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getDoctorSpeciality() {
		return doctorSpeciality;
	}

	public void setDoctorSpeciality(String doctorSpeciality) {
		this.doctorSpeciality = doctorSpeciality;
	}

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

	public Appointment.AppointmentStatus getStatus() {
		return status;
	}

	public void setStatus(Appointment.AppointmentStatus status) {
		this.status = status;
	}

	public AdminAppointmentList(Long appointmentId, String firstName, String lastName, String patientEmailId,
			String doctorName, String doctorSpeciality, LocalDate date, LocalTime time, Appointment.AppointmentStatus status) {
		super();
		this.appointmentId = appointmentId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.patientEmailId = patientEmailId;
		this.doctorName = doctorName;
		this.doctorSpeciality = doctorSpeciality;
		this.date = date;
		this.time = time;
		this.status = status;
	}

    // Getters and Setters
    
    
}
