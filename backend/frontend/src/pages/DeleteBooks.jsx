import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Define the DeletePersonInventory component
const DeletePersonInventory = () => {
    const [loading, setLoading] = useState(false); // State to handle loading indication
    const navigate = useNavigate(); // Hook to programmatically navigate to other routes
    const { id } = useParams(); // Extracting person inventory ID from URL parameters

    // Function to handle the deletion of a person inventory
    const handleDeletePersonInventory = () => {
        setLoading(true); // Show loading indicator
        axios
            .delete(`https://mern-stack-acc-61100cd42945.herokuapp.com/employee/${id}`) // Adjust the endpoint as necessary
            .then(() => {
                setLoading(false); // Hide loading indicator on success
                navigate('/'); // Navigate back to the homepage or relevant page after deletion
            })
            .catch((error) => {
                setLoading(false); // Hide loading indicator on error
                alert('An error occurred, please check console'); // Alert user of error
                console.log(error); // Log error details for debugging
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Delete Inventory Item</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                <h3 className="text-2xl">Are you sure you want to delete this inventory item?</h3>
                <button
                    className="p-4 bg-red-600 text-white m-8 w-full"
                    onClick={handleDeletePersonInventory}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    );
}

export default DeletePersonInventory;
