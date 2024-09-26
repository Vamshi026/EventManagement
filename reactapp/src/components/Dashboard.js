import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Dashboard = () => {

    const navigate = useNavigate();
    const { userModel } = useContext(UserContext);

    useEffect(() => {
        if (userModel) {
            console.log("UserModel:", userModel); // Log userModel to verify its structure
    
            if (userModel.userrole === 'ROLE_ADMIN') {
                navigate('/admin-dashboard');
            } else {
                navigate('/customer-dashboard');
            }
        } else {
            navigate('/login');
        }
    }, [userModel, navigate]);
    

    if (!userModel) {
        return <div>Loading.....</div>;
    }

    return null; 
};

export default Dashboard;
