package com.example.app.user;

import java.time.LocalDate;

public class User {
    private int id;
    private String email;
    private String name;
    private String password;
    private LocalDate created_at;

    public User() {

    }

    public User(int id, String email, String name, String password, LocalDate created_at) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.created_at = created_at;
    }

    public User(String email, String name, String password, LocalDate created_at) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.created_at = created_at;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
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

    public LocalDate getCreatedAt() {
        return this.created_at;
    }

    public void setCreatedAt(LocalDate created_at) {
        this.created_at = created_at;
    }

    @Override
    public String toString() {
        return this.id + " " + this.email + " " + this.name + " " + this.password + " " + this.created_at;
    }
}
