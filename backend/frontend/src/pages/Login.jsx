import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

// Define the LoginPage component
const Login = () => {
    const [email, setEmail] = useState(""); // State for the email input
    const [password, setPassword] = useState(""); // State for the password input
    const [loading, setLoading] = useState(false); // State to handle loading indication
    const navigate = useNavigate(); // Hook to programmatically navigate to other routes

    // Function to handle the login form submission
    const handleLogin = (event) => {
        event.preventDefault(); // Prevent the default form submit action
        setLoading(true); // Show loading indicator

        // Perform the login action here
        // This is where you would call your backend API to authenticate the user
        // For demonstration, we'll just log the credentials and navigate to the homepage
        console.log(`Logging in with: ${email}, ${password}`);
        
        // Simulate an API call with setTimeout
        setTimeout(() => {
            setLoading(false); // Hide loading indicator after "API call"
            navigate('/'); // Navigate back to the homepage or relevant page after login
        }, 1500); // Delay to simulate API call
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl my-4">Login</h1>
            {loading ? <Spinner /> : ''}
            <form 
                className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'
                onSubmit={handleLogin}
            >
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="p-2 m-2 w-full"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="p-2 m-2 w-full"
                    required
                />
                <button type="submit" className="p-2 bg-sky-300 m-8">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
 