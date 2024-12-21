package com.example.app.user;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

        if (!checkEmailFormat(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email format is not valid.");
        }

        if (userRepository.findByEmail(email).isEmpty()) {
            String salt = this.generateSalt(password);
            String hashedPassword = this.hashPassword(password, salt);

            if (hashedPassword.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The server encountered an internal error.");
            }
            
            userRepository.save(new User(email, name, hashedPassword));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account already exists.");
        }
    }

    public LoginResponse logIn(LoginRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();
        List<User> users = userRepository.findByEmail(email);

        if (users.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account does not exist.");
        } else {
            User user = users.get(0);
            String salt = user.getPassword().split(":")[0];
            String hashedPassword = this.hashPassword(password, salt);

            if (hashedPassword.equals(user.getPassword())) {
                return new LoginResponse(user.getId(), user.getEmail(), user.getName(), user.getCreatedAt());
            }

            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password.");
        }
    }

    public Boolean checkEmailFormat(String email) {
        String email_regex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
        Pattern pattern = Pattern.compile(email_regex);
        Matcher matcher = pattern.matcher(email);
    
        return matcher.matches();
    }

    public String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest((password + salt).getBytes());
    
            return salt + ":" + Base64.getEncoder().encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            return "";
        }
    }

    public String generateSalt(String password) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[16];

        secureRandom.nextBytes(salt);

        return Base64.getEncoder().encodeToString(salt);
    }
}
