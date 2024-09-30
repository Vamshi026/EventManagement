package com.example.EventManagment.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


import java.time.LocalDate;
import java.time.LocalTime;


@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventid;
    private String name;
    private String eventtype;

    private LocalDate eventdate;

    private LocalTime fromtime;
    private LocalTime totime;
    private String location;

    public Long getEventid() {
        return eventid;
    }

    public void setEventid(Long eventid) {
        this.eventid = eventid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEventtype() {
        return eventtype;
    }

    public void setEventtype(String eventtype) {
        this.eventtype = eventtype;
    }

    public LocalDate getEventdate(){
        return eventdate;
    }

    public void setEventdate(LocalDate eventdate){
        this.eventdate = eventdate;
    }

    public LocalTime getFromtime() {
        return fromtime;
    }

    public void setFromtime(LocalTime fromtime) {
        this.fromtime = fromtime;
    }

    public LocalTime getTotime() {
        return totime;
    }

    public void setTotime(LocalTime totime) {
        this.totime = totime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Event() {
    }

    public Event(Long eventid, String name, String eventtype, LocalDate eventdate, LocalTime fromtime, LocalTime totime, String location) {
        this.eventid = eventid;
        this.name = name;
        this.eventtype = eventtype;
        this.eventdate = eventdate;
        this.fromtime = fromtime;
        this.totime = totime;
        this.location = location;
    }
}
