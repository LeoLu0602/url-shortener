package com.example.app.user;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service    
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void signUp(SignUpRequest req) {
        String email = req.getEmail();
        String name = req.getName();
        String password = req.getPassword();

        if (userRepository.findByEmail(email).isEmpty()) {
            String hashedPassword = hashPassword(password);

            if (hashedPassword.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The server encountered an internal error.");
            }

            userRepository.save(new User(email, name, this.hashPassword(hashedPassword)));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account already exists.");
        }
    }

    public String hashPassword(String password) {
        try {
            String salt = generateSalt(password);
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest((password + salt).getBytes());
    
            return salt + ":" + Base64.getEncoder().encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            return "";
        }
    }

    public static String generateSalt(String password) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[16];

        secureRandom.nextBytes(salt);

        return Base64.getEncoder().encodeToString(salt);
    }
}
