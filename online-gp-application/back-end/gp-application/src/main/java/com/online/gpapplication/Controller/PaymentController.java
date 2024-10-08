package com.online.gpapplication.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.online.gpapplication.StripeClient;
import com.stripe.model.Charge;



@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for React frontend
public class PaymentController {

	 private StripeClient stripeClient;
	 
	    @Autowired
	    PaymentController(StripeClient stripeClient) {
	        this.stripeClient = stripeClient;
	    }
	    
	    @PostMapping("/charge")
	    public ResponseEntity<Map<String, Object>> chargeCard(@RequestBody Map<String, Object> request) throws Exception {
	        String token = (String) request.get("token");
	        double amount = ((Number) request.get("amount")).doubleValue();

	        Charge charge = stripeClient.chargeNewCard(token, amount);

	        Map<String, Object> response = new HashMap<>();
	        response.put("status", charge.getStatus());
	        response.put("transaction_id", stripeClient.generateTransactionId());
	        response.put("tracking_number", stripeClient.generateTrackingNumber());

	        return ResponseEntity.ok(response);
	    }
	    }