
import React, { useEffect, useState } from 'react'; // React hooks for state and lifecycle management
import axios from 'axios'; // Axios library for making HTTP requests
import Spinner from '../components/Spinner'; // Custom spinner component for loading indication
import { Link } from 'react-router-dom'; // React Router's Link component for navigation
// Importing icons for visual elements in UI
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ItemDropdown from '../components/ItemDropdown';

const Database = () => {

    const [employees, setEmployees] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('https://mern-stack-acc-61100cd42945.herokuapp.com/employee')
            .then((response) => {
                setEmployees(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);


    const itemNames = Array.from(new Set(employees.flatMap(e => e.inventoryItems.map(item => item.itemName))));

    return (
        <div className='p-4' style={{ paddingLeft: '15%', paddingRight: '15%' }}>

            <h1 className='text-4xl my-8 flex justify-center'>EMG INVENTORY MANAGEMENT</h1>

            <ItemDropdown
                selectedItem={selectedItem}
                onChange={e => setSelectedItem(e.target.value)}
                itemNames={itemNames}
            />

            {/* Table Display div*/}
            <div className='flex justify-center items-center'>
                <h1 className='text-3xl my-8 text-center'>Modify Employee:</h1>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Name</th>
                        <th className='border border-slate-600 rounded-md'>Inventory Items</th>
                        <th className='border border-slate-600 rounded-md'>Query</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {employee.name}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {employee.inventoryItems.map((item, itemIndex) => (
                                    <div key={itemIndex}>{item.itemName} (Quantity: {item.quantity})</div>
                                ))}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>

                                    <Link to='/employee/create'>
                                        <MdOutlineAddBox className='text-sky-800 text-2xl' />
                                    </Link>
                                    <Link to={`/employee/edit/${employee._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/employee/delete/${employee._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}


export default Database