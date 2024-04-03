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

// Defining the Home component that will be the main view of the app
export const Home = () => {
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

  return (
    <h1> Under Construction </h1>
  );
}

export default Home; // Export the component for use in other parts of the app
