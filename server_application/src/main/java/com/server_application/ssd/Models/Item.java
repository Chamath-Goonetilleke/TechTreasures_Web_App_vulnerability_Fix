package com.server_application.ssd.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.util.List;

@Entity
@Table(name="items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Item {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String price;
    private String description;
    private int quantity;

    @ElementCollection
    @Column(name = "imageUrls", columnDefinition = "LONGTEXT")
    private List<String> imageUrls;

}

