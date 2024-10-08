package com.online.gpapplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.gpapplication.Model.AppointmentTrendsDTO;
import com.online.gpapplication.Model.DoctorTrendsDTO;
import com.online.gpapplication.Service.AnalyticsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/appointment-trends")
    public List<AppointmentTrendsDTO> getAppointmentTrends() {
        List<AppointmentTrendsDTO> objectList = analyticsService.getAppointmentsTrends();
        System.out.println("getAppointmentTrends :"+ objectList.size());
        return objectList;
    }

    @GetMapping("/doctor-ratings")
    public List<DoctorTrendsDTO> getDoctorRatings() {
        List<DoctorTrendsDTO> objectList = analyticsService.getDoctorRatings();
        System.out.println("getDoctorRatings :"+ objectList.size());
        return objectList;
    }
}