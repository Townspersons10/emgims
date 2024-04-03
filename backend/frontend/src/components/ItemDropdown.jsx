
import axios from 'axios'; // Axios library for making HTTP requests
import React, { useEffect, useState } from 'react'; // React hooks for state and lifecycle management

const ItemDropdown = ({ selectedItem, onChange, itemNames }) => {


    return (
        <div>
            <select 
                value={selectedItem} 
                onChange={onChange} // Make sure this is correctly defined and passed as a prop
                className="p-2 rounded border border-gray-300"
            >
                <option value="">Select an Item</option>

                {itemNames.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}

            </select>
        </div>
    )
}

export default ItemDropdown