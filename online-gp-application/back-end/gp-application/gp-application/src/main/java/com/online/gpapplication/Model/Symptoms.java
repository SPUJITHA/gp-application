package com.online.gpapplication.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "symptoms")

public class Symptoms {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "symptom_id")
    private Integer symptomId;

	 @Column(name = "symptom_name")
	    private String symptomName;

	    @Column(name = "speciality")
	    private String speciality;

		public Integer getSymptomId() {
			return symptomId;
		}

		public void setSymptomId(Integer symptomId) {
			this.symptomId = symptomId;
		}

		
		public String getSymptomName() {
			return symptomName;
		}

		public void setSymptomName(String symptomName) {
			this.symptomName = symptomName;
		}

		public String getSpeciality() {
			return speciality;
		}

		public void setSpeciality(String speciality) {
			this.speciality = speciality;
		}



}
