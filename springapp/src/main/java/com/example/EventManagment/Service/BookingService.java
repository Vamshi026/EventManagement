package com.example.EventManagment.Service;

import com.example.EventManagment.Entity.Bookings;
import com.example.EventManagment.Entity.Event;
import com.example.EventManagment.Repository.BookingsRepository;
import com.example.EventManagment.Repository.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingsRepository bookingsRepository;

    @Autowired
    private EventsRepository eventsRepository;

    public List<Bookings> findAllBookings() {
        return bookingsRepository.findAll();
    }

    public Bookings saveBooking(Bookings bookings) {


        Event event = bookings.getEvent();
        if(event!= null){
            Event savedEvent = CreateorUpdateEvent(event);
            bookings.setEvent(savedEvent);
        }
        bookings.setStatus("Pending");
        return bookingsRepository.save(bookings);
    }

    private Event CreateorUpdateEvent(Event event) {
        if(event.getEventid()!=null){
            Optional<Event> existingEventOptional = eventsRepository.findById(event.getEventid());
            if(existingEventOptional.isPresent()){
                Event existingEvent = existingEventOptional.get();
                existingEvent.setName(event.getName());
                existingEvent.setEventtype(event.getEventtype());
                existingEvent.setEventdate(event.getEventdate());
                existingEvent.setFromtime(event.getFromtime());
                existingEvent.setTotime(event.getTotime());
                existingEvent.setLocation(event.getLocation());
                return eventsRepository.save(existingEvent);
            }else {
                return eventsRepository.save(event);
            }
        }else{
            return eventsRepository.save(event);
        }
    }

    public List<Bookings> findBookingsByUserId(Long userId) {

        return bookingsRepository.findByUserId(userId);
    }

    public Bookings updateBooking(Long bookingId, Bookings updatedBooking) {
        Optional<Bookings> bookingsOptional = bookingsRepository.findById(bookingId);
        if (bookingsOptional.isPresent()) {
            Bookings existingBooking = bookingsOptional.get();
            existingBooking.setUserId(updatedBooking.getUserId());

            Event updatedEvent = updatedBooking.getEvent();
            if (updatedEvent != null) {
                Optional<Event> eventOptional = eventsRepository.findById(existingBooking.getEvent().getEventid());
                if (eventOptional.isPresent()) {
                    Event existingEvent = eventOptional.get();
                    existingEvent.setName(updatedEvent.getName());
                    existingEvent.setEventtype(updatedEvent.getEventtype());
                    existingEvent.setEventdate(updatedEvent.getEventdate());
                    existingEvent.setFromtime(updatedEvent.getFromtime());
                    existingEvent.setTotime(updatedEvent.getTotime());
                    existingEvent.setLocation(updatedEvent.getLocation());

                    eventsRepository.save(existingEvent);
                } else {
                    throw new RuntimeException("Event not found with ID: " + existingBooking.getEvent().getEventid());
                }
            }
            return bookingsRepository.save(existingBooking);
        } else {
            throw new RuntimeException("Booking not found with ID: " + bookingId);
        }
    }

    public Bookings updateBookingStatus(Long bookingId, String newStatus) {
        Optional<Bookings> optionalBookings = bookingsRepository.findById(bookingId);
        if (optionalBookings.isPresent()) {
            Bookings booking = optionalBookings.get();
            booking.setStatus(newStatus);
            return bookingsRepository.save(booking);
        } else {
            throw new RuntimeException("Booking not found with ID: " + bookingId);
        }
    }

    public boolean deleteBooking(Long bookingId) {
        // Check if the booking exists
        if (bookingsRepository.existsById(bookingId)) {
            Optional<Bookings> bookings = bookingsRepository.findById(bookingId);
            Long evntid = bookings.get().getEvent().getEventid();
            bookingsRepository.deleteById(bookingId);
            System.out.println(evntid);
            eventsRepository.deleteById(evntid);

            return true;
        } else {
            return false;
        }
    }

}
