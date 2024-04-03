import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the CreatePerson component
const CreatePerson = () => {
    // State hooks for managing form inputs and loading state
    const [name, setName] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Function to handle person creation
    const handleSavePerson = () => {
        // Assuming your API expects an array of inventoryItems
        const data = { 
            name, 
            inventoryItems: [{
                itemName,
                quantity: parseInt(quantity, 10) // Ensure quantity is sent as a number
            }]
        };

        setLoading(true);
        axios
            .post('https://mern-stack-acc-61100cd42945.herokuapp.com/employee', data) // Adjust the endpoint accordingly
            .then(() => {
                setLoading(false);
                navigate('/'); // Adjust the navigation target if necessary
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened, please check console')
                console.log(error);
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Update Inventory</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Name</label>
                    <input
                        type ='text'
                        value ={name}
                        onChange = {(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Item Name</label>
                    <input
                        type = 'text'
                        value = {itemName}
                        onChange = {(e) => setItemName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Quantity</label>
                    <input
                        type = 'number' // Ensure numerical input for quantity
                        value = {quantity}
                        onChange = {(e) => setQuantity(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleSavePerson}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default CreatePerson; // Export the CreatePerson component
