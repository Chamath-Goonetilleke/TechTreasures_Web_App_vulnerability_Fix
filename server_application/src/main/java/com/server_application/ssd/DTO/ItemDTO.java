package com.server_application.ssd.DTO;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {
    private int id;
    private String name;
    private String price;
    private String description;
    private int quantity;
    private List<String> imageUrls;
}
