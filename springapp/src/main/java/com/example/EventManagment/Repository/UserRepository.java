package com.example.EventManagment.Repository;

import com.example.EventManagment.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUserId(Long userId);

    List<User> findAll();

    Optional<User> findById(Long userId);

//    Optional<User> findByEmail(String username);
}
