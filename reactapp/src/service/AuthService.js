
import { BASE_URL } from './Utils';


export const registerUser = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            if (response.status === 409) {
                
                alert("User with this email already exists. Please Login!");
                
                throw new Error("User with this email already exists.");
                
            }
            throw new Error("An error occurred.");
            
        }

       
        const data = await response.json();
        alert("Registration Successfull, Please Login!");
        console.log(data); 

        return data; 
    } catch (error) {
        console.error("Registration failed", error);
        throw error;
    }
};


export const loginUser = async (user) => {
    try {
        
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        
        if (!response.ok) {
            const errorData = await response.json(); 
          
            throw new Error(errorData.message || 'Login failed'); 
        }

        const data = await response.json();
        console.log(data); 
        return data; 
    } catch (error) {
        console.error("Login failed", error);
        throw error; 
};
}

