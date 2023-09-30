package com.server_application.ssd.Controller;

import com.server_application.ssd.Models.Card;
import com.server_application.ssd.Models.Cart;
import com.server_application.ssd.Models.Item;
import com.server_application.ssd.Service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/item")
public class ItemController {

    @Autowired
    public ItemService itemService;

    @PostMapping("/insertItem")
    public ResponseEntity<String> insertItem(@RequestBody Item item) {
        itemService.createNewItem(item);
        return new ResponseEntity<>("Successfully insert", HttpStatus.OK);
    }

    @GetMapping("/getAllItems")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> itemList = itemService.getAllItems();
        return new ResponseEntity<>(itemList, HttpStatus.OK);
    }

    @GetMapping("/getItem/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable int itemId) {
        Item item = itemService.getItemById(itemId);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PutMapping("/updateItem")
    public ResponseEntity<String> updateItem(@RequestBody Item item) {
        itemService.updateItem(item);
        return new ResponseEntity<>("Updated Successfully", HttpStatus.OK);
    }

    @GetMapping("/deleteItem/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable int itemId) {
        itemService.deleteItem(itemId);
        return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
    }
}
