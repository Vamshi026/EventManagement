package com.example.EventManagment.Service;

import com.example.EventManagment.Entity.AuthResponse;
import com.example.EventManagment.Entity.Bookings;
import com.example.EventManagment.Entity.User;



import com.example.EventManagment.Exceptions.RoleMismatchException;
import com.example.EventManagment.Exceptions.UserAlreadyExistsException;
import com.example.EventManagment.Repository.BookingsRepository;
import com.example.EventManagment.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private BookingsRepository bookingsRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findByUserId(userId);
    }

    public User saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser =  userRepository.save(user);
        System.out.println("User registered with email: " + savedUser.getEmail());
        return savedUser;
    }

    public void deleteById(Long userId) {
        User userToDelete = userRepository.findByUserId(userId);
        if (userToDelete != null) {
            List<Bookings> bookingsToDelete = bookingsRepository.findByUserId(userId);
            bookingsRepository.deleteAll(bookingsToDelete);
            userRepository.delete(userToDelete);
            System.out.println("User and their bookings deleted successfully.");
        } else {
            System.out.println("User not found.");
        }
    }

    //Saving and retrieving user
    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
//        System.out.println(user.getUserrole());
        try{
            userRepository.save(user);
            return user;
        }catch(DataIntegrityViolationException e){
            throw new UserAlreadyExistsException("User with Email: "+ user.getEmail() + " already exists. Please Login!");
        }

    }


    public AuthResponse verify(User user) {
        try {
            // Try to authenticate the user (checks email and password)
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                User authenticatedUser = userRepository.findByEmail(user.getEmail());

                // Check if the user role matches the expected role
                if (!authenticatedUser.getUserrole().equals(user.getUserrole())) {
                    throw new RoleMismatchException("User role mismatch");
                }

                // If authentication is successful and the role matches, generate JWT token
                String token = jwtService.generateToken(authenticatedUser.getEmail(), authenticatedUser.getUserrole());
                return new AuthResponse(token, authenticatedUser, authenticatedUser.getUserrole());
            } else {
                throw new BadCredentialsException("Invalid credentials");
            }

        } catch (BadCredentialsException e) {
            // Rethrow BadCredentialsException so it can be caught by the global exception handler
            throw new BadCredentialsException("Invalid credentials");
        }
    }


    public User updateUser(Long userId, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(userId);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            existingUser.setFirstname(updatedUser.getFirstname());
            existingUser.setLastname(updatedUser.getLastname());
            existingUser.setEmail(updatedUser.getEmail());

            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
            }


            return userRepository.save(existingUser);
        } else {
            throw new UsernameNotFoundException("User not found with ID: " + userId);
        }
    }

}
