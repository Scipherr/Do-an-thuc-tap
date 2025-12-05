import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  './assets/css/style.scss';
import Home from './components/frontend/Home.jsx';
import  DT  from './components/frontend/DT.jsx';
import LoginPage from './components/frontend/LoginPage.jsx';
import RegisterPage from './components/frontend/RegisterPage.jsx';
import ProductDetail from './components/frontend/ProductDetail.jsx'; // Import the new component

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dt' element={<DT/>} />
        <Route path='/loginad' element ={<LoginPage/>}/>
        <Route path='/register' element ={<RegisterPage/>}/>
        {/* Add the Detail Route */}
        <Route path='/product/:id' element={<ProductDetail/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App