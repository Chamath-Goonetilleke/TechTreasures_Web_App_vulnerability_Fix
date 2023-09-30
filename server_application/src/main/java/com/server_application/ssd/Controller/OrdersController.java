package com.server_application.ssd.Controller;

import com.server_application.ssd.DTO.OrderDTO;
import com.server_application.ssd.Models.Order;
import com.server_application.ssd.Service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
public class OrdersController {

    private final OrderService orderService;

    public OrdersController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/createOrder")
    public ResponseEntity<String > createNewOrder(@RequestBody Order order){
        orderService.createNewOrder(order);
        return new ResponseEntity<>("Successfully Created", HttpStatus.OK);
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<List<OrderDTO>> getAllOrders(){
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }

    @GetMapping("/getOrder/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable int orderId){
        OrderDTO order = orderService.getOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping("/completeOrder/{orderId}")
    public ResponseEntity<String> completeOrder(@PathVariable int orderId){
        orderService.completeOrder(orderId);
        return new ResponseEntity<>("Successfully Completed", HttpStatus.OK);
    }

    @DeleteMapping("/deleteOrder/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable int orderId){
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>("Successfully Deleted", HttpStatus.OK);
    }
}
