import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('userModel')); // Parse the stored string back to an object

    console.log(user); // This should show the parsed object, including the userrole

    // Check if user is authenticated
    if (!isAuthenticated) {
        localStorage.removeItem('token');
        localStorage.removeItem('userModel');
        return <Navigate to="/login" />;
    }

    // Check if user role is allowed for this route
    if (allowedRoles && !allowedRoles.includes(user?.userrole)) {
        return <Navigate to="/login" />; // Redirect to unauthorized page if role doesn't match
    }

    // Render the component if authenticated and authorized
    return <Component {...rest} />;
};

export default PrivateRoute;
