package com.online.gpapplication.Model;

import java.util.Date;

import com.online.gpapplication.Model.TechnicalRequest.RequestStatus;


public class SupportRequestList {
	
	private Long id;

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

	
	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public TechnicalRequest.RequestStatus getStatus() {
		return status;
	}

	public void setStatus(TechnicalRequest.RequestStatus status) {
		this.status = status;
	}

	public SupportRequestList(Long id, String issueDescription, String issueType, TechnicalRequest.RequestStatus status,
			Date createdAt) {
		super();
		this.id = id;
		this.issueDescription = issueDescription;
		this.issueType = issueType;
		this.status = status;
		this.createdAt = createdAt;
	}

	


}
