package com.example.app.user;

import org.springframework.stereotype.Service;

@Service    
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void signUp(User req) {
        
    }
}
