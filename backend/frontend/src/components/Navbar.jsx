import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
const Navbar = () => {
    return (
        <nav className="bg-green-200 p-4 flex justify-between items-center">
            <Link to="/" className="text-xl">Home</Link> 
            <div className="flex gap-4">
                <Link to="/charts" className="text-xl">Charts</Link>
                <Link to="/database" className="text-xl">Database</Link> 
                <Link to="/login" className="text-xl">Login</Link> 
            </div>
        </nav>
    );
};

export default Navbar;
