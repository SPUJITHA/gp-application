package com.online.gpapplication.Model;

import java.util.Date;

import com.online.gpapplication.Model.TechnicalRequest.RequestStatus;

public class AdminSupportList {

	private Long id;
	private String patientEmailId;
	 
	 private String firstName;
	 
	 private String lastName;
    private String issueDescription;


 private String issueType;

 private TechnicalRequest.RequestStatus status;

 private Date createdAt;

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getPatientEmailId() {
	return patientEmailId;
}

public void setPatientEmailId(String patientEmailId) {
	this.patientEmailId = patientEmailId;
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

public TechnicalRequest.RequestStatus getStatus() {
	return status;
}

public void setStatus(TechnicalRequest.RequestStatus status) {
	this.status = status;
}

public Date getCreatedAt() {
	return createdAt;
}

public void setCreatedAt(Date createdAt) {
	this.createdAt = createdAt;
}

public AdminSupportList(Long id, String patientEmailId, String firstName, String lastName, String issueDescription,
		String issueType, RequestStatus status, Date createdAt) {
	super();
	this.id = id;
	this.patientEmailId = patientEmailId;
	this.firstName = firstName;
	this.lastName = lastName;
	this.issueDescription = issueDescription;
	this.issueType = issueType;
	this.status = status;
	this.createdAt = createdAt;
}

 
 
}
