package com.example.user;

import java.util.List;

public interface UserService {
    User getUserByEmail(String email);
    List<User> getAllUsers();
    User createUser(User user);
    void deleteUser(String email);
}
