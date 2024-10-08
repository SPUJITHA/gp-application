package com.online.gpapplication.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.online.gpapplication.Model.AppointmentTrendsDTO;
import com.online.gpapplication.Model.DoctorTrendsDTO;
import com.online.gpapplication.Repository.AppointmentRepository;
import com.online.gpapplication.Repository.FeedbackRepository;

@Service
public class AnalyticsService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<AppointmentTrendsDTO> getAppointmentsTrends() {
        List<AppointmentTrendsDTO> objectList = appointmentRepository.findAppointmentTrends();
        System.out.println("getAppointmentsTrends :"+ objectList.size());
        System.out.println("getAppointmentsTrends :"+ objectList.get(0).getAppointmentDate());
        System.out.println("getAppointmentsTrends :"+ objectList.get(0).getCount());
        return objectList;
    }

    public List<DoctorTrendsDTO> getDoctorRatings() {
        return feedbackRepository.findDoctorRatings();
    }
}