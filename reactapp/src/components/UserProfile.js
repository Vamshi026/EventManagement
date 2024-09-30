import React, { useContext, useEffect, useState } from "react";
import './Login.css';
import UserContext from "../context/UserContext";
import { BASE_URL } from "../service/Utils";

const UserProfile = () => {
    const { userModel, setUserModel } = useContext(UserContext); 

    const [userid, setUserid] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [isEditing, setIsEditing] = useState(false);

    
    useEffect(() => {
        const getUser = () => {
            if (userModel) {
                return {
                    userid: userModel.userId || '', 
                    firstname: userModel.firstname || '', 
                    lastname: userModel.lastname || '', 
                    email: userModel.email || '', 
                    password: ''
                };
            }
            return {}; 
        };

        const user = getUser();
        setUserid(user.userid || '');
        setFirstname(user.firstname || '');
        setLastname(user.lastname || '');
        setEmail(user.email || '');
        setPassword('');
    }, [userModel]);

    
    const handleEdit = () => {
        setIsEditing(true); 
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const updatedUser = {
            userId: userid,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password 
        };

        try {
            
            const token = localStorage.getItem('token');
            
            
            const response = await fetch(`${BASE_URL}/user/${userid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(updatedUser) 
            });
            
            if (response.status === 401) {
                localStorage.removeItem("userModel");
                localStorage.removeItem('token');
                
                alert("Your session has expired. Please log in again.");
                
                window.location.href = "/login";
                return;
            }
            
            
            if (!response.ok) {
                throw new Error(`Error updating user details: ${response.statusText}`);
            }
            const responseData = await response.json();
            console.log(responseData);

            setUserModel({
                ...userModel,
                firstname: responseData.firstname,
                lastname: responseData.lastname,
                
            });

            setIsEditing(false); 
            alert('User details updated successfully!');
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <div className='login-container'>
            <div className="heading">
                <h1>Hello!</h1>
                <h1>{firstname}</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>User ID:</label>
                    <input 
                        type="text" 
                        value={userid} 
                        disabled={true} 
                    />
                </div>
                <div className='form-group'>
                    <label>Firstname:</label>
                    <input 
                        type="text" 
                        value={firstname} 
                        onChange={(e) => setFirstname(e.target.value)} 
                        disabled={!isEditing} 
                    />
                </div>
                <div className='form-group'>
                    <label>Lastname:</label>
                    <input 
                        type="text" 
                        value={lastname} 
                        onChange={(e) => setLastname(e.target.value)} 
                        disabled={!isEditing} 
                    />
                </div>
                <div className='form-group'>
                    <label>Email:</label>
                    <i style={{color:"grey"}}>email cannot be changed</i>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        disabled={true} 
                    />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        disabled={!isEditing} 
                    />
                </div>
                <div className="button-container">
            {isEditing ? (
                    <button type="button" className='login-button' onClick={handleSubmit}>Save</button>
                ) : (
                    <button type="button" className='login-button' onClick={handleEdit}>Edit</button>
                )}
            </div>
                
            </form>
            
        </div>
    );
}

export default UserProfile;
