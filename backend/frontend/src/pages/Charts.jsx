// Necessary imports from React and other libraries
import React, { useEffect, useState } from 'react'; // React hooks for state and lifecycle management
import axios from 'axios'; // Axios library for making HTTP requests
import Spinner from '../components/Spinner'; // Custom spinner component for loading indication
import { Link } from 'react-router-dom'; // React Router's Link component for navigation
// Importing icons for visual elements in UI
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Navbar from '../components/Navbar';

const Charts = () => {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [showEmployeeData, setShowEmployeeData] = useState(false);
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

    const toggleView = () => {
        setShowEmployeeData(!showEmployeeData);
        // Reset selections when toggling views
        setSelectedEmployee('');
        setSelectedItem('');
    };

    const chartData = {
        labels: showEmployeeData ? employees.find(e => e._id === selectedEmployee)?.inventoryItems.map(item => item.itemName) : employees.map(e => e.name),
        datasets: [{
            label: showEmployeeData ? `${employees.find(e => e._id === selectedEmployee)?.name}'s Inventory` : `Quantity of ${selectedItem} Across Employees`,
            data: showEmployeeData ? employees.find(e => e._id === selectedEmployee)?.inventoryItems.map(item => item.quantity) : employees.map(e => e.inventoryItems.find(item => item.itemName === selectedItem)?.quantity || 0),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }]
    };

    return (
        <div className='p-4' style={{ paddingLeft: '15%', paddingRight: '15%' }}>

            <h1 className='text-4xl my-8 flex justify-center'>EMG INVENTORY MANAGEMENT</h1>

            <div className='flex justify-center items-center '>
                <button onClick={toggleView} className="p-2 m-5 rounded border border-sky-600">
                    {showEmployeeData ? "Show Item Data:" : "Show Employee Data:"}
                </button>

                {showEmployeeData ? (
                    <div>
                        <select value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)} className="p-2 rounded border border-gray-300">
                            <option value="">Select an Employee</option>
                            {employees.map(employee => (
                                <option key={employee._id} value={employee._id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div>
                        <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)} className="p-2 rounded border border-gray-300">
                            <option value="">Select an Item</option>

                            {Array.from(new Set(employees.flatMap(e => e.inventoryItems.map(item => item.itemName)))).map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}

                        </select>
                    </div>
                )}

            </div>

            {loading ? <Spinner /> : <Bar data={chartData} />}
            {/* Operations Display div */}

            {/* Table Display div*/}
            <div className='flex justify-center items-center'>
                <h4 className='text-1xl my-8 text-center'>Employee Inventory Database</h4>
            </div>
        </div>
    );
}

export default Charts