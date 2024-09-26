package com.example.EventManagment.Repository;

import com.example.EventManagment.Entity.Bookings;
import com.example.EventManagment.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings,Long> {
    List<Bookings> findByUserId(Long userId);
}
