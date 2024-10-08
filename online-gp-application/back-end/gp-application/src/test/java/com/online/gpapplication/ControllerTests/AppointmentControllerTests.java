package com.online.gpapplication.ControllerTests;

import static org.mockito.BDDMockito.given;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.online.gpapplication.Controller.AppointmentController;
import com.online.gpapplication.Model.Appointment;
import com.online.gpapplication.Model.AppointmentDTO;
import com.online.gpapplication.Repository.AppointmentRepository;
import com.online.gpapplication.Repository.UserRepository;
import com.online.gpapplication.Service.AppointmentService;
import com.online.gpapplication.Service.DoctorService;
import com.online.gpapplication.Service.FeedbackService;

@WebMvcTest(AppointmentController.class)
public class AppointmentControllerTests {

    @Autowired
    private MockMvc mockMvc;

   
    @MockBean
    private FeedbackService feedbackService; // Mock the FeedbackService

    @MockBean
    private AppointmentService appointmentService;
    
    @MockBean
    private DoctorService doctorService;
    
    @MockBean
    AppointmentRepository appointmentRepository;
    
    @MockBean
    UserRepository userRepository;


    @Test
    public void testCreateAppointment() throws Exception {
        AppointmentDTO appointmentDTO = new AppointmentDTO(); // Setup your data
        Appointment appointment = new Appointment(); // Expected result
        
        mockMvc.perform(post("/api/appointments/saveAppointment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(appointmentDTO)))
            .andExpect(status().isOk());

        
        mockMvc.perform(post("/api/appointments/saveAppointment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(appointmentDTO)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.someField").value("someValue")); // Adjust the JSON path according to your actual JSON response
    }

    @Test
    public void testCreateAppointmentFail() throws Exception {
        given(appointmentService.saveAppointment(any(AppointmentDTO.class))).willReturn(null);

        mockMvc.perform(post("/api/appointments/saveAppointment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(new AppointmentDTO())))
            .andExpect(status().isBadRequest());
    }
}
