import React, { useState, useEffect, useContext } from 'react';

import './Dashboard.css';
import { BASE_URL } from '../service/Utils';
import UserContext from '../context/UserContext';

const CustomerDashboard = () => {
    const { userModel } = useContext(UserContext);
    const [eventname, setEventname] = useState('');
    const [eventtype, setEventtype] = useState('');
    const [eventdate, setEventdate] = useState('');
    const [fromtime, setFromtime] = useState('');
    const [totime, setTotime] = useState('');
    const [status, setStatus] = useState('Pending');
    const [showBookform, setShowbookform] = useState(false);
    const [showUserbookings, setShowuserbookings] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [bookings, setBookings] = useState([]);
    

    useEffect(() => {
        if (userModel) {
            console.log(userModel);
           
            fetchBookings(userModel.userId);
        }
    }, [userModel]);

    const fetchBookings = async () => {
        try {
         
            const token =  localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/api/user/userId?userId=${userModel.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the Authorization header with the token
                }
            });

            if (response.status === 401) {
                localStorage.removeItem("userModel");
                localStorage.removeItem('token');
                
                alert("Your session has expired. Please log in again.");
                // Optionally, redirect to login page
                window.location.href = "/login";
                return;
            }
            
            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`Error fetching bookings: ${response.statusText}`);
            }
            
            // Parse the response as JSON
            const data = await response.json();
            console.log('Fetched bookings:', data); // Log the fetched bookings
            
            // Update state with the fetched bookings
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    

    const handleBooking = () => {
        setEventname('');
        setEventtype('');
        setEventdate('');
        setFromtime('');
        setTotime('');
        setStatus('Pending');
        setShowbookform(true);
        setShowuserbookings(false);
    };

    const handleSeeBookings = () => {
        setShowuserbookings(true);
        setShowbookform(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userModel) {
            console.error('User model is not available.');
            return;
        }
        
        const newBooking = { 
            userId: userModel.userId,
            event: {
                name: eventname, 
                eventtype, 
                eventdate, 
                fromtime,//: `${eventdate}T${fromtime}:00`, 
                totime//:`${eventdate}T${fromtime}:00`
            }, 
            status 
        };
    
        try {
            const token = localStorage.getItem('token');
            if (editingIndex !== null) {
                const bookingId = bookings[editingIndex].id;
                const response = await fetch(`${BASE_URL}/api/user/${bookingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(newBooking),
                });
                if (!response.ok) {
                    throw new Error(`Error updating booking: ${response.statusText}`);
                }
                if (response.status === 401) {
                    localStorage.removeItem("userModel");
                    localStorage.removeItem('token');
                    
                    alert("Your session has expired. Please log in again.");
                    // Optionally, redirect to login page
                    window.location.href = "/login";
                    return;
                }
                alert("Booking Successfully Updated");
                const updatedBooking = await response.json();
                setBookings(bookings.map((booking, index) => index === editingIndex ? updatedBooking : booking));
                setEditingIndex(null);
            } else {
                const response = await fetch(`${BASE_URL}/api/user/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(newBooking),
                });
                if (response.status === 401) {
                    localStorage.removeItem("userModel");
                    localStorage.removeItem('token');
                    
                    alert("Your session has expired. Please log in again.");
                    // Optionally, redirect to login page
                    window.location.href = "/login";
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Error creating booking: ${response.statusText}`);
                }
                const newBookingData = await response.json();
                alert("Event Booked");
                setBookings([...bookings, newBookingData]);
            }
            setShowbookform(false);
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };
    

    const handleEditBooking = (index) => {
        const booking = bookings[index];
        setEventname(booking.event.name);
        setEventtype(booking.event.eventtype);
        setEventdate(booking.event.eventdate);
        setFromtime(booking.event.fromtime);
        setTotime(booking.event.totime);
        setStatus(booking.status);
        setEditingIndex(index);
        setShowbookform(true);
        setShowuserbookings(false);
    };

    const handleDeleteBooking = async (index) => {
        const deletingId = bookings[index].id;
        const confirmDelete = window.confirm('Are you sure you want to delete this booking?');

    if (!confirmDelete) {
        
        return;
    }
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/api/user/${deletingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error deleting booking: ${response.statusText}`);
            }
            alert("Booking Successfully Deleted");
            setBookings(bookings.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <>
            <div className="dashboard">
                <div className='heading'><h1>Welcome </h1><h1 style={{color: "gray"}}>{userModel.firstname}</h1></div>
                <div className='img-container'>
                    <img src='https://i0.wp.com/mixnvixen.com/wp-content/uploads/2019/11/Book_with_us.png?fit=500%2C500' alt='Booking'/>
                </div>
                <p>Excited to see you! Book your events now</p>
                <div className="buttons-group">
                    <button onClick={handleBooking}>Book Now</button>
                    <button onClick={handleSeeBookings}>See your Bookings</button>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="image-container">
                            <img src="https://img.freepik.com/premium-vector/form-application-filling-icon-vector-tax-document-paper-list-with-pen-illustration-flat-design-job-questionnaire-statement-write-loan-admission-apply-survey-claim-register-submission-agreement_101884-2171.jpg" alt="Fill the Form" />
                            <label>Fill the Form</label>
                        </div>
                        <div className="image-container">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/025/876/530/small/man-approving-documents-finance-banking-investments-marketing-on-desk-contract-law-or-rubber-stamping-business-real-estate-documents-and-other-official-and-legal-contracts-and-agreements-photo.jpg" alt="Get it Approved" />
                            <label>Get it Approved</label>
                        </div>
                        <div className="image-container">
                            <img src="https://img.freepik.com/free-photo/friends-throwing-up-champagne-confetti_23-2147651888.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721260800&semt=ais_user" alt="Enjoy your Event" />
                            <label>Enjoy your Event</label>
                        </div>
                    </div>
                </div>
            </div>
            {showBookform && (
                <div className="overlay">
                    <div className="book-now">
                        <form className="booking-form" onSubmit={handleSubmit}>
                            <label>Event Name:</label>
                            <input
                                type="text"
                                className="form-entry"
                                value={eventname}
                                placeholder="Enter Event Name"
                                required
                                onChange={(e) => setEventname(e.target.value)
                                
                                }
                            />
                            <label>Event Type:</label>
                            <select
                                className='form-entry'
                                value={eventtype}
                                required
                                onChange={(e) => setEventtype(e.target.value)}
                            >
                                <option value="">Select Event Type</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Marriage">Marriage</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Other">Other</option>
                                
                            </select>
                            <label>Event Date:</label>
                            <input
                                type="date"
                                className="form-entry"
                                value={eventdate}
                                required
                                onChange={(e) => setEventdate(e.target.value)}
                            />
                            <div className="event-time">
                                <label>From:</label>
                                <input
                                    type="time"
                                    className="form-entry"
                                    value={fromtime}
                                    required
                                    onChange={(e) => setFromtime(e.target.value)}
                                />
                                <label>To:</label>
                                <input
                                    type="time"
                                    className="form-entry"
                                    value={totime}
                                    required
                                    onChange={(e) => setTotime(e.target.value)}
                                />
                            </div>
                            <div className='buttons-group'>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setShowbookform(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
           {showUserbookings && (
    <div className="overlay">
        <div className="booking-list">
            <div className="booking-header">
                <h2>Your Bookings</h2>
            </div>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index} className="booking-item">
                        <strong>{booking.event.name}</strong>
                        <p>Booking ID: {booking.id}</p>
                        <p>Event Type: {booking.event.eventtype}</p>
                        <p>Date: {booking.event.eventdate}</p>
                        <p>Time: {booking.event.fromtime} - {booking.event.totime}</p>
                        <p>Status: <span style={{ backgroundColor: "black", fontWeight:"bold", color: booking.status === 'Approved' ? 'green' : (booking.status ==='Denied' ? 'red' : 'white') }}>
                            {booking.status}
                            </span></p>
                        <div className="buttons-group">
                            {booking.status === "Pending" && <button onClick={() => handleEditBooking(index)}>Edit</button>}
                            <button className="close-button" onClick={() => handleDeleteBooking(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="buttons-group">
                <button className="close-button" onClick={() => setShowuserbookings(false)}>Close</button>
            </div>
        </div>
    </div>
)}

        </>
    );
};

export default CustomerDashboard;
