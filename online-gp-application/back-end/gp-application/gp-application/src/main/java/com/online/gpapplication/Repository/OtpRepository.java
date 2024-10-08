package com.online.gpapplication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.online.gpapplication.Model.OtpEntry;

@Repository
public interface OtpRepository  extends JpaRepository<OtpEntry, Long> {
	
	OtpEntry findByEmailAndOtp(String email, String otp);
	
	OtpEntry findByOtp(String otp);

}
