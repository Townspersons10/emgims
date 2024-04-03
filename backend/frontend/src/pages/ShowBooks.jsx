import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowPersonInventory = () => {
  const [person, setPerson] = useState({ inventoryItems: [] });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://mern-stack-acc-61100cd42945.herokuapp.com/employee/${id}`)
      .then((response) => {
          setPerson(response.data);
          setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Person Inventory</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Name</span>
              <span>{person.name}</span>
            </div>
            {person.inventoryItems.map((item, index) => (
              <div key={index} className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Item Name:</span>
                <span>{item.itemName}</span>
                <span className='ml-4 text-xl mr-4 text-gray-500'>Quantity:</span>
                <span>{item.quantity}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ShowPersonInventory;
