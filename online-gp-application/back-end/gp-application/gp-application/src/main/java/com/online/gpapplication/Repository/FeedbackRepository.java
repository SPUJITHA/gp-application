package com.online.gpapplication.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.DoctorTrendsDTO;
import com.online.gpapplication.Model.Feedback;


@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	
	@Query("SELECT new com.online.gpapplication.Model.DoctorTrendsDTO(f.appointment.doctor.doctorName as doctorName, AVG(f.rating) as rating) FROM Feedback f GROUP BY f.appointment.doctor.doctorId")
	List<DoctorTrendsDTO> findDoctorRatings();
}