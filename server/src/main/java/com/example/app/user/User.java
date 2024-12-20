package com.example.app.user;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@DynamicInsert
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID (e.g., auto-increment)
    private Long id;
    private String email;
    private String name;
    private String password;
    private LocalDateTime createdAt;

    protected User() {

    }

    public User(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return 
            "id: " + this.id + ", " + 
            "email: " + this.email + ", " + 
            "name: " + this.name + ", " + 
            "password: " + this.password + ", " + 
            "created_at: " + this.createdAt;
    }
}
