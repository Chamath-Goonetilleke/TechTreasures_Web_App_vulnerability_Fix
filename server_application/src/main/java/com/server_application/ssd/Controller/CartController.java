package com.server_application.ssd.Controller;

import com.server_application.ssd.Models.Cart;
import com.server_application.ssd.Models.Item;
import com.server_application.ssd.Service.CartService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    @Autowired
    public CartService cartService;

    @GetMapping("/getCart/{userId}")
    public ResponseEntity<List<Item>> getCartById(@PathVariable int userId) {
        return new ResponseEntity<>(cartService.getCartById(userId), HttpStatus.OK);
    }
    @PostMapping("/insertCart")
    public ResponseEntity<String> insertItem(@RequestBody Cart cart) {
        cartService.createNewCart(cart);
        return new ResponseEntity<>("Successfully insert", HttpStatus.OK);
    }
}
