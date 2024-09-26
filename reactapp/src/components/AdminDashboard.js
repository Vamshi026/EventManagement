import React, { useEffect, useState } from "react";
import axios from "axios";
import './Dashboard.css';
import { BASE_URL } from "../service/Utils";

const AdminDashboard = () => {
    
    const [bookings, setBookings] = useState([]);
    const [statusAnimation, setStatusAnimation] = useState({}); 
    
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/api/admin/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-cache'
                }
            });

            if (response.status === 401) {
                localStorage.removeItem("userModel");
                localStorage.removeItem('token');
                
                alert("Your session has expired. Please log in again.");
                
                window.location.href = "/login";
                return;
            }

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Error fetching bookings: ${response.statusText} - ${errorData}`);
            }

            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleStatusChange = async (bookingId, status) => {
        try {
            
            setStatusAnimation({ bookingId, status });

            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/api/admin/${bookingId}/status?status=${status}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error updating booking status: ${response.statusText}`);
            }
            alert("Booking Status Updated");
           
            setTimeout(() => {
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.id === bookingId ? { ...booking, status } : booking
                    )
                );
                setStatusAnimation({}); // Reset animation
            }, 500); // Animation duration
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };
    
    return (
        <div className="dashboard">
            <center><h1>Welcome Admin</h1></center>
            <div className='book-now'>
                <h2>All Bookings</h2>
                <div className='bookings-list'>
                    <div className="booking booking-header">
                        <p>User ID</p>
                        <p>Event Name</p>
                        <p>Event Type</p>
                        <p>Event Date</p>
                        <p>From</p>
                        <p>To</p>
                        <p>Action</p>
                    </div>
                    {bookings.map((booking, index) => (
                        <div key={index} className={`booking ${statusAnimation.bookingId === booking.id ? `fade-${statusAnimation.status}` : ''}`}>
                            <p>{booking.id}</p>
                            <p>{booking.event.name}</p>
                            <p>{booking.event.eventtype}</p>
                            <p>{booking.event.eventdate}</p>
                            <p>{booking.event.fromtime}</p>
                            <p>{booking.event.totime}</p>
                            <div className="action-btn">
                                {booking.status === "Approved" ? (
                                    <p className="status-text approved">Approved</p>
                                ) : booking.status === "Denied" ? (
                                    <p className="status-text denied">Denied</p>
                                ) : (
                                    <>
                                        <button className="apprv-btn" onClick={() => handleStatusChange(booking.id, 'Approved')}>Approve</button>
                                        <button className="deny-btn" onClick={() => handleStatusChange(booking.id, 'Denied')}>Deny</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
