package com.online.gpapplication.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.Date;
import com.online.gpapplication.Model.User;

@Entity
@Table(name = "technical_requests")
public class TechnicalRequest {
	
	public enum RequestStatus {
	   Created, Working, Resolved
	}


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "user_id")
    private User patientId;

    @Column(name = "issue_description")
    private String issueDescription;

    @Column(name = "issue_type")
    private String issueType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RequestStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt = new Date();

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

  
    public User getPatientId() {
		return patientId;
	}

	public void setPatientId(User patientId) {
		this.patientId = patientId;
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

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

	public TechnicalRequest(Long id, User patientId, String issueDescription, String issueType, RequestStatus status,
			Date createdAt) {
		super();
		this.id = id;
		this.patientId = patientId;
		this.issueDescription = issueDescription;
		this.issueType = issueType;
		this.status = status;
		this.createdAt = createdAt;
	}
    
	public TechnicalRequest ()
	{
		
	}
    
}
