package com.online.gpapplication.Model;

public class DoctorTrendsDTO {

	
	private String doctorName;
	private Double rating;
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public Double getRating() {
		return rating;
	}
	public void setRating(Double rating) {
		this.rating = rating;
	}
	public DoctorTrendsDTO(String doctorName, Double rating) {
		super();
		this.doctorName = doctorName;
		this.rating = rating;
	}
	
	
}
