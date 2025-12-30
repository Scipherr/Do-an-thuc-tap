import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  './assets/css/style.scss';
import Home from './components/frontend/Home.jsx';
import  DT  from './components/frontend/DT.jsx';
import LoginPage from './components/frontend/LoginPage.jsx';
import RegisterPage from './components/frontend/RegisterPage.jsx';
import ProductDetail from './components/frontend/ProductDetail.jsx'; // Import the new component
import AdminDashboard from './components/frontend/admin/Dashboard'; // Example path
import AdminProducts from './components/frontend/admin/AdminProducts.jsx';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dt' element={<DT/>} />
        {/* This is your Admin Login Page */}
        <Route path='/loginad' element ={<LoginPage/>}/>
        <Route path='/register' element ={<RegisterPage/>}/>
        <Route path='/product/:id' element={<ProductDetail/>} />

        {/* ADD THIS ROUTE for the Admin Dashboard */}
        <Route path='/admin/dashboard' element={<AdminDashboard/>} /> 
        {/* Admin Product Route */}
        <Route path='/admin/products' element={<AdminProducts/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App