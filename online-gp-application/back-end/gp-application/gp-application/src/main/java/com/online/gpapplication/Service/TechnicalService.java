package com.online.gpapplication.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.AdminSupportList;
import com.online.gpapplication.Model.SupportRequestDTO;
import com.online.gpapplication.Model.SupportRequestList;
import com.online.gpapplication.Model.TechnicalRequest;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.TechnicalRequestRepository;
import com.online.gpapplication.Repository.UserRepository;

@Service
public class TechnicalService {
	
	@Autowired
	TechnicalRequestRepository technicalRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public TechnicalRequest saveSupportRequest (SupportRequestDTO supportRequest)
	{
		System.out.println("SupportRequest "+ supportRequest.getIssueDescription());
		TechnicalRequest technicalRequest = new TechnicalRequest();
		User  user = userRepository.findByEmailId(supportRequest.getPatientEmailId());
		technicalRequest.setCreatedAt(new Date());
		technicalRequest.setStatus(TechnicalRequest.RequestStatus.Created);
		technicalRequest.setIssueDescription(supportRequest.getIssueDescription());
		technicalRequest.setIssueType(supportRequest.getIssueType());
		technicalRequest.setPatientId(user);
		TechnicalRequest savedRequest = technicalRepository.save(technicalRequest);
		return savedRequest;
	}
	
	public Page<SupportRequestList> getTechnicalRequestsByEmail(String email, Pageable pageable) {
		
        Page<SupportRequestList> supportRequestList = technicalRepository.findByEmailId(email , pageable);
        System.out.println("Support Request List :"+ supportRequestList);
        return supportRequestList;
    }
	
	
public Page<AdminSupportList> getAllTechnicalRequests( Pageable pageable) {
		
        Page<AdminSupportList> supportRequestList = technicalRepository.findAllRequests( pageable);
        System.out.println("Support Request List :"+ supportRequestList);
        return supportRequestList;
    }
	
public Optional<TechnicalRequest> getTechnicalRequestByEmailId (Long requestId)
{
	return technicalRepository.findById(requestId);
}

public TechnicalRequest getRequestById(Long requestId) {
    return technicalRepository.findById(requestId).orElse(null);
}

public TechnicalRequest saveRequest(TechnicalRequest request) {
    return technicalRepository.save(request);
}

}
