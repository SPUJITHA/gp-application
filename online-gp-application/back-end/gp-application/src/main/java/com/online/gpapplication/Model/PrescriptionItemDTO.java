package com.online.gpapplication.Model;

public class PrescriptionItemDTO {
	
	private Long itemId;
	private String medicineName;
    private Integer frequency;
    private Integer duration;
    private Boolean refill;
    private Integer refillMonths; 
	public Integer getFrequency() {
		return frequency;
	}
	public void setFrequency(Integer frequency) {
		this.frequency = frequency;
	}
	public Integer getDuration() {
		return duration;
	}
	public void setDuration(Integer duration) {
		this.duration = duration;
	}
	public Boolean getRefill() {
		return refill;
	}
	public void setRefill(Boolean refill) {
		this.refill = refill;
	}
	
	public Long getItemId() {
		return itemId;
	}
	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}
	
	public Integer getRefillMonths() {
		return refillMonths;
	}
	public void setRefillMonths(Integer refillMonths) {
		this.refillMonths = refillMonths;
	}
	public String getMedicineName() {
		return medicineName;
	}
	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}
	public PrescriptionItemDTO(Long itemId, String medicineName, String dosage, Integer frequency, Integer duration,
			Boolean refill, Integer refillMonths) {
		super();
		this.itemId = itemId;
		this.medicineName = medicineName;
		this.frequency = frequency;
		this.duration = duration;
		this.refill = refill;
		this.refillMonths = refillMonths;
	}


}
