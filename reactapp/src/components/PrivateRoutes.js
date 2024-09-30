import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('userModel')); 

    console.log(user); 

    
    if (!isAuthenticated) {
        localStorage.removeItem('token');
        localStorage.removeItem('userModel');
        return <Navigate to="/login" />;
    }

    
    if (allowedRoles && !allowedRoles.includes(user?.userrole)) {
        return <Navigate to="/login" />; 
    }

    
    return <Component {...rest} />;
};

export default PrivateRoute;
