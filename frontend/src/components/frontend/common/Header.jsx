import React from 'react'
import { Container, Navbar, Nav, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { Search, ShoppingCart, User, Menu, X, Star } from 'lucide-react';

export const Header = () => {
  return (
    <header>
            <div className='container py-3'>
                                             <Navbar expand="lg">
                             
                                            <Navbar.Brand href="#home" className='logo'>CỬA HÀNG ĐIỆN TỬ TNT</Navbar.Brand>
                                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                                    <Navbar.Collapse id="basic-navbar-nav">
                                                    <Nav className="ms-auto">
                                                            <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
                                                            <Nav.Link href="/dt" className='nav-link'>Di động</Nav.Link>
                                                            <Nav.Link href="#link" className='nav-link'>TV & AV</Nav.Link>
                                                            <Nav.Link href="#link" className='nav-link'>Màn hình và thiết bị lưu trữ</Nav.Link>
                                                            <Nav.Link href="#link" className='nav-link'>Thiết bị đeo</Nav.Link>
                                                            <Nav.Link href="#link" className='nav-link'>Phụ kiện</Nav.Link>
                                                            
                                                    </Nav>
                                                    <Search size={22} placeholder="Tìm kiếm sản phẩm..." className='search-box'/>
                                                    <input type="text" className='search-input' placeholder='Tìm kiếm sản phẩm...'/>
                                                    <ShoppingCart size={22} className='cart-icon'/>
                                                    <User size={22} className='user-icon'/>
                                                    <Menu size={22} className='menu-icon'/>
                                            </Navbar.Collapse>       
            </Navbar>
            </div>
             

 
    </header>
  )
}
export default Header