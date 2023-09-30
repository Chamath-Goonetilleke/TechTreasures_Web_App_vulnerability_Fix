package com.server_application.ssd.Controller;

import com.server_application.ssd.DTO.AuthUser;
import com.server_application.ssd.Models.User;
import com.server_application.ssd.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authUser(@RequestBody AuthUser authUser){

        return userService.auth(authUser);
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createNewUser(@RequestBody User user){
        userService.createUser(user);
        return new ResponseEntity<>("User Created Successfully", HttpStatus.OK);
    }

    @GetMapping("/getUser/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId){
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @PostMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        userService.updateUser(user);
        return new ResponseEntity<>("User Updated Successfully", HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId){
        userService.deleteUser(userId);
        return new ResponseEntity<>("User Deleted Successfully", HttpStatus.OK);
    }
}
