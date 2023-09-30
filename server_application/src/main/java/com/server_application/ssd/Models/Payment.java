package com.server_application.ssd.Models;

import jakarta.persistence.*;

@Entity
@Table(name="payment")
public class Payment {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private String cardNo;
    private String holderName;
    private String expireDate;
    private int cvc;

    private String email;
    private String address1;
    private String address2;
    private String country;
    private String city;
    private String pin;
    private String state;

    public Payment() {
    }

    public Payment(int id, int userId, String cardNo, String holderName, String expireDate, int cvc, String email, String address1, String address2, String country, String city, String pin, String state) {
        this.id = id;
        this.userId = userId;
        this.cardNo = cardNo;
        this.holderName = holderName;
        this.expireDate = expireDate;
        this.cvc = cvc;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.country = country;
        this.city = city;
        this.pin = pin;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getHolderName() {
        return holderName;
    }

    public void setHolderName(String holderName) {
        this.holderName = holderName;
    }

    public String getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }

    public int getCvc() {
        return cvc;
    }

    public void setCvc(int cvc) {
        this.cvc = cvc;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
