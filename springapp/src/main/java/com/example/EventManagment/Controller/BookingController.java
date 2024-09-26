package com.example.EventManagment.Controller;

import com.example.EventManagment.Entity.Bookings;
import com.example.EventManagment.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;



    //Customer...................>

    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    @PostMapping("/user/")
    public Bookings createBooking(@RequestBody Bookings bookings) {
        return bookingService.saveBooking(bookings);
    }

    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    @PutMapping("/user/{bookingId}")
    public Bookings updateBookings(@PathVariable Long bookingId, @RequestBody Bookings booking) {
        return bookingService.updateBooking(bookingId, booking);
    }

    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    @GetMapping("/user/userId")
    public List<Bookings> getUserBookings(@RequestParam Long userId) {
        return bookingService.findBookingsByUserId(userId);
    }

    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    @DeleteMapping("/user/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long bookingId) {
        boolean isDeleted = bookingService.deleteBooking(bookingId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Admin.........................>

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/admin/{bookingId}/status")
    public Bookings updateStatus(@PathVariable Long bookingId, @RequestParam String status) {
        return bookingService.updateBookingStatus(bookingId, status);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/admin/")
    public List<Bookings> getAllUserBookings() {
        return bookingService.findAllBookings();
    }


}
