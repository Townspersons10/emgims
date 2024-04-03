import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPersonInventory = () => {
    const [name, setName] = useState('');
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://mern-stack-acc-61100cd42945.herokuapp.com/employee/${id}`)
            .then((response) => {
                setName(response.data.name);
                setInventoryItems(response.data.inventoryItems);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred, please check console');
                console.log(error);
            });
    }, [id]);

    const handleEditPersonInventory = () => {
        const data = { name, inventoryItems };

        setLoading(true);
        axios.put(`https://mern-stack-acc-61100cd42945.herokuapp.com/employee/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred, please check console');
                console.log(error);
            });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...inventoryItems];
        newItems[index][field] = value;
        setInventoryItems(newItems);
    };

    const handleAddItem = () => {
        setInventoryItems([...inventoryItems, { itemName: '', quantity: 0 }]);
    };

    const handleRemoveItem = (index) => {
        const newItems = [...inventoryItems];
        newItems.splice(index, 1);
        setInventoryItems(newItems);
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Person Inventory</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' 
                    />
                </div>
                {inventoryItems.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={item.itemName}
                            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                            className="border-2 border-gray-500 mr-2 px-2"
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
                            className="border-2 border-gray-500 mr-2 px-2"
                        />
                        <button onClick={() => handleRemoveItem(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddItem}>Add Item</button>
                <button className="p-2 bg-sky-300 m-8" onClick={handleEditPersonInventory}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditPersonInventory;
