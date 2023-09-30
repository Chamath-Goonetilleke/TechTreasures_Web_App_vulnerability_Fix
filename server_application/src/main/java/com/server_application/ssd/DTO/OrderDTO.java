package com.server_application.ssd.DTO;

import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Integer id;
    private Integer customerId;
    private String totalAmount;
    private List<Map<String, Integer>> orderedItem;
    private String orderedDate;
    private Boolean isComplete;
}
