import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBooks from './pages/CreateBooks';
import ShowBooks from './pages/ShowBooks';
import EditBooks from './pages/EditBooks';
import DeleteBooks from './pages/DeleteBooks';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Database from './pages/Database';
import Charts from './pages/Charts';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/create" element={<CreateBooks />} />
        <Route path="/employee/details/:id" element={<ShowBooks />} />
        <Route path="/employee/edit/:id" element={<EditBooks />} />
        <Route path="/employee/delete/:id" element={<DeleteBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/database" element={<Database />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>

    </>
  );
};

export default App;
