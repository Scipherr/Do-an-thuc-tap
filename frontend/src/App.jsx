import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  './assets/css/style.scss';
import Home from './components/frontend/Home.jsx';
import  DT  from './components/frontend/DT.jsx';
import LoginPage from './components/frontend/LoginPage.jsx';
import RegisterPage from './components/frontend/RegisterPage.jsx';
import ProductDetail from './components/frontend/ProductDetail.jsx'; 
import AdminDashboard from './components/frontend/admin/Dashboard'; 
import AdminProducts from './components/frontend/admin/AdminProducts.jsx';
import OrderManager from './components/frontend/admin/OrderManager.jsx';
import Cart from './components/frontend/Cart.jsx';
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      {/* User  */}
        <Route path='/' element={<Home/>} />
        <Route path='/dt' element={<DT/>} />
        <Route path='/loginad' element ={<LoginPage/>}/>
        <Route path='/register' element ={<RegisterPage/>}/>
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/cart' element={<Cart/>} />

        {/* Admin  */}
        <Route path='/admin/dashboard' element={<AdminDashboard/>} /> 
        <Route path='/admin/products' element={<AdminProducts/>} />
        <Route path='/admin/orders' element={<OrderManager/>} />

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App