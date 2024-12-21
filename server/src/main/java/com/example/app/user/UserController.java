package com.example.app.user;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/api/v1/user/sign-up")
    public void signUp(@RequestBody SignUpRequest req) {
        userService.signUp(req);
    }
    
    @PostMapping("/api/v1/user/login")
    public User logIn(@RequestBody LoginRequest req) {
        return userService.logIn(req);
    }
}
