import React, { useState, useContext } from 'react';
import { loginUser } from '../service/AuthService'; 
import './Login.css';
import UserContext from '../context/UserContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userrole, setUserrole] = useState('ROLE_CUSTOMER');
    const { setUserModel } = useContext(UserContext);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authResponse = await loginUser({ email, password, userrole });
            if (authResponse) {
                localStorage.setItem('token', authResponse.token);
                localStorage.setItem('userModel', JSON.stringify(authResponse.user));
                setUserModel(authResponse.user);
    
                // Redirect based on user type
                if (userrole === 'ROLE_ADMIN') {
                    window.location.href = '/admin-dashboard';
                } else {
                    window.location.href = '/customer-dashboard';
                }
            }
        } catch (error) {
           
            setError(error.message);
        }
    };

    const handleShowPassword = () =>{
        setShowPassword(!showPassword);
    }


    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type={
                        showPassword ? "text" : "password"
                    } value={password} required onChange={(e) => setPassword(e.target.value) } 
                    />
                    <div className='password-toggle'>
                        <input type='checkbox' checked={showPassword} onClick={handleShowPassword}/><span>Show Password</span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="users">User Type:</label>
                    <select name="users" id="users" value={userrole} onChange={(e) => setUserrole(e.target.value)}>
                        <option value="ROLE_CUSTOMER">Customer</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className='button-container'>
                <button type="submit" className="login-button">Login</button>
                </div>
            </form>
            
            
            <p>Don't have an account?<a href="/register">Register Now</a></p>
        </div>
    );
};

export default Login;
