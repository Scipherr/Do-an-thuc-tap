import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  './assets/css/style.scss';
import Home from './components/frontend/Home.jsx';
import  DT  from './components/frontend/DT.jsx';
import LoginPage from './components/frontend/LoginPage.jsx';


function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dt' element={<DT/>} />
        <Route path='/loginu' element ={<LoginPage/>}/>
     </Routes>
     </BrowserRouter>
        
    </>
  )
}

export default App
