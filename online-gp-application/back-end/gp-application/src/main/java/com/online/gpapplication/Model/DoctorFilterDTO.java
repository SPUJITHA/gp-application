package com.online.gpapplication.Model;



public class DoctorFilterDTO {
    private Long doctorId;
    private String doctorName;

    // Constructor matching the query result
    public DoctorFilterDTO(Long doctorId, String doctorName) {
        this.doctorId = doctorId;
        this.doctorName = doctorName;
    }

    // Getters and setters
    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
    
   
}
