package com.online.gpapplication.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.Medicine;
import com.online.gpapplication.Model.Prescription;


@Repository
public interface MedicineRepository  extends JpaRepository<Medicine, Long> {
	

	Optional<Medicine> findByMedicineName(String medicineName);

}
