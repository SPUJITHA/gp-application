package com.online.gpapplication.Model;

public class SupportRequestDTO {
	
	private String issueDescription;
	private String issueType;
	private String patientEmailId;
	public String getIssueDescription() {
		return issueDescription;
	}
	public void setIssueDescription(String issueDescription) {
		this.issueDescription = issueDescription;
	}
	public String getIssueType() {
		return issueType;
	}
	public void setIssueType(String issueType) {
		this.issueType = issueType;
	}
	public String getPatientEmailId() {
		return patientEmailId;
	}
	public void setPatientEmailId(String patientEmailId) {
		this.patientEmailId = patientEmailId;
	}
	public SupportRequestDTO(String issueDescription, String issueType, String patientEmailId) {
		
		this.issueDescription = issueDescription;
		this.issueType = issueType;
		this.patientEmailId = patientEmailId;
	}
	
	

}
