package com.online.gpapplication.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.Medicine;
import com.online.gpapplication.Repository.MedicineRepository;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> findAllMedicines() {
        return medicineRepository.findAll();
    }
}