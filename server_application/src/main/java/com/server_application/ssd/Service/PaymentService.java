package com.server_application.ssd.Service;

import com.server_application.ssd.Models.Payment;
import com.server_application.ssd.Models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private final JdbcTemplate jdbcTemplate;

    public PaymentService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createPayment(Payment payment){
        String insertPaymentSql = "INSERT INTO payment (userId, cardNo, holderName, expireDate, cvc, email, address1, address2, country, city, pin, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


        jdbcTemplate.update(
                insertPaymentSql,
                payment.getUserId(),
                payment.getCardNo(),
                payment.getHolderName(),
                payment.getExpireDate(),
                payment.getCvc(),
                payment.getEmail(),
                payment.getAddress1(),
                payment.getAddress2(),
                payment.getCountry(),
                payment.getCity(),
                payment.getPin(),
                payment.getState()
        );
    }

}
