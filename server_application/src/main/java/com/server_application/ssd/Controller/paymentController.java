package com.server_application.ssd.Controller;

import com.server_application.ssd.Models.Payment;
import com.server_application.ssd.Models.User;
import com.server_application.ssd.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/payment")
public class paymentController {
    @Autowired
    public PaymentService paymentService;

    @PostMapping("/create-payment")
    public ResponseEntity<String> createNewUser(@RequestBody Payment payment){
        paymentService.createPayment(payment);
        return new ResponseEntity<>("payment Created Successfully", HttpStatus.OK);
    }
}
