import React from 'react'

import { Container, Navbar, Nav, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { Search, ShoppingCart, User, Menu, X, Star } from 'lucide-react';
import s25phone from '../../assets/images/s25phone.png';




const Home = () => {
return (
    <>
    <header>
            <div className='container py-3'>
                                             <Navbar expand="lg">
                             
                                            <Navbar.Brand href="#home" className='logo'>CỬA HÀNG ĐIỆN TỬ TNT</Navbar.Brand>
                                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                                    <Navbar.Collapse id="basic-navbar-nav">
                                                    <Nav className="ms-auto">
                                                            <Nav.Link href="#home" className='nav-link'>Home</Nav.Link>
                                                            <Nav.Link href="#link" className='nav-link'>Di động</Nav.Link>
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
    <main>
            <section className='section-1'>
                    <div className='bannerbig d-flex align-items-center'>
                            <div className='container-fluid'>
                                    <div className='text-center'>
                                             <span>CHÀO MỪNG ĐẾN VỚI CỬA HÀNG ĐIỆN TỬ TNT</span>
                                             
                                                    <p>Siêu thị điện máy hàng đầu Việt Nam</p>

                                            

                                    </div>

                            </div>
                    </div>
            </section>

            <section className='section-spnb section-padding'>
                    <Container>
                            <h2 className='section-spnb-title text-center mb-5'>SẢN PHẨM MỚI NHẤT</h2>
                            <div className='danhsach-spnb d-flex justify-content-center gap-4 mb-5'>
                                    <span className="spnb-item active">Ưu đãi</span>
                                    <span className='spnb-item'>Điện thoại</span>
                                    <span className='spnb-item'>TV&AV</span>
                                    <span className='spnb-item'>Gia Dụng</span>
                                    <span className='spnb-item'>Màn hình-Bộ nhớ</span>

                            </div>


                            <Row className='g-4'>
                                    <Col md={3}>
                                            <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                            
                                    </Col>
                                    <Col md={3}>
                                    <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                    </Col>
                                    <Col md={3}>
                                    <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                    </Col>
                                    <Col md={3}>
                                    <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                    </Col>
                                    </Row>
                                    <Row className='g-4 mt-2'>
                                    <Col md={3}>
                                    <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                    </Col>
                                    <Col md={3}>
                                    <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                    </Col>
                                    <Col md={3}>
                                    <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                    </Col>
                                    <Col md={3}>
                                    <div className='spnb-card'>
                                                    <div className='spnb-card-img'>
                                                         <img src={s25phone} alt='spnb1' />
                                                         
                                                    </div>
                                                    <p className='spnb-card-title'>Samsung Galaxy S25 5G</p>
                                                    </div>
                                    </Col>
                                    </Row>
                    </Container>
            </section>

    </main>




    <footer>

    </footer>
    </>
    
)
}

export default Home