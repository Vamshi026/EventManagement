import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoutes';
import './httpInterceptors';


const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/userprofile" element={<PrivateRoute component={UserProfile} />} />
            <Route path="/admin-dashboard" element={<PrivateRoute component={AdminDashboard} allowedRoles={['ROLE_ADMIN']} />} />
            <Route path="/customer-dashboard" element={<PrivateRoute component={CustomerDashboard} allowedRoles={['ROLE_CUSTOMER']}/>} />
            <Route path="/" element={<Login />} />
        </Routes>
    </Router>
);

export default App;
