package com.online.gpapplication.Model;

import java.util.List;

public class PrescriptionDTO {

	    private Long appointmentId;
	    private String patientEmailId;
	    private String doctorEmailId;
	   
	    private String status; // Enum represented as String for simplicity
	    
	    private List<PrescriptionItemDTO> items;
	    
		
	    public Long getAppointmentId() {
			return appointmentId;
		}
		public void setAppointmentId(Long appointmentId) {
			this.appointmentId = appointmentId;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public List<PrescriptionItemDTO> getItems() {
			return items;
		}
		public void setItems(List<PrescriptionItemDTO> items) {
			this.items = items;
		}
		public String getPatientEmailId() {
			return patientEmailId;
		}
		public void setPatientEmailId(String patientEmailId) {
			this.patientEmailId = patientEmailId;
		}
		public String getDoctorEmailId() {
			return doctorEmailId;
		}
		public void setDoctorEmailId(String doctorEmailId) {
			this.doctorEmailId = doctorEmailId;
		}
		
	    
	    

}
