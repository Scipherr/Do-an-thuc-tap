import React from 'react'

import { Container, Navbar, Nav, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Search, ShoppingCart, User, Menu, Star, Smartphone, Monitor, Watch, ArrowLeft } from 'lucide-react';
import Footer from './common/Footer'

export const LoginPage = () => {
  return (
   <>
    <main>
         <div className="login-header">DYNAMITE ACCOUNT</div>
         <div>
             <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
         </div>
          
           
      
    </main>


    <Footer/>
    </>
   
  )
}


export default LoginPage