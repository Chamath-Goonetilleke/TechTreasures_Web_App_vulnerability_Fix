package com.server_application.ssd.Models;

import jakarta.persistence.*;

@Entity
@Table(name="cards")
public class Card {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private String cardNo;
    private String holderName;
    private String expireDate;
    private int cvc;

    public Card() {
    }

    public Card(int id, int userId, String cardNo, String holderName, String expireDate, int cvc) {
        this.id = id;
        this.userId = userId;
        this.cardNo = cardNo;
        this.holderName = holderName;
        this.expireDate = expireDate;
        this.cvc = cvc;
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
}
