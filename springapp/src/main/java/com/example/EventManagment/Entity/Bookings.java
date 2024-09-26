package com.example.EventManagment.Entity;

import jakarta.persistence.*;

@Entity
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


  // @JoinColumn(name = "user_id")
    private Long userId;

    @ManyToOne
    private Event event;

    private String status;

    public Bookings(Long id, Long userId, Event event, String status) {
        this.id = id;
        this.userId = userId;
        this.event = event;
        this.status = status;
    }

    public Bookings() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
