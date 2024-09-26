import React, { useState } from 'react';
import { registerUser } from '../service/AuthService'; 
import './Login.css';

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male'); 
    const [password, setPassword] = useState('');
    const [userrole, setUserrole] = useState('ROLE_CUSTOMER'); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ firstname, lastname, email, gender, password, userrole });
            
            window.location.href = '/login';
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="login-container">
            <h1>Register</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Firstname:</label>
                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Lastname:</label>
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="userrole">User Type:</label>
                    <select name="userrole" id="userrole" value={userrole} onChange={(e) => setUserrole(e.target.value)} required>
                        <option value="ROLE_CUSTOMER">Customer</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </div>
                <div className='button-container'>
                <button className="login-button" type="submit">Register</button>
                </div>
                <p>Already have an account? <a href='/login'>Login</a></p>
            </form>
        </div>
    );
};

export default Register;
