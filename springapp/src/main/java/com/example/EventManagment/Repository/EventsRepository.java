package com.example.EventManagment.Repository;

import com.example.EventManagment.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventsRepository extends JpaRepository<Event,Long> {
}
