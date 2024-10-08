package com.online.gpapplication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.online.gpapplication.Model.Prescription;
import com.online.gpapplication.Model.PrescriptionItems;

@Repository
public interface PrescriptionItemsRepository extends JpaRepository<PrescriptionItems, Integer> {

}
