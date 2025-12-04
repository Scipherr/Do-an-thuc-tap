import React from 'react'
import { Container, Navbar, Nav, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { Search, ShoppingCart, User, Menu, X, Star } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='main-footer' >
        <Container>
          <Row className="footer-links-grid">
            <Col md={2} xs={6}>
              <h5>Mua Trực Tuyến</h5>
              <ul>
                <li><a href="#">Trang chủ Mua trực tuyến</a></li>
                <li><a href="#">Mua Hàng Trực Tiếp</a></li>
                <li><a href="#">SmartThings</a></li>
              </ul>
            </Col>
            <Col md={2} xs={6}>
              <h5>Sản Phẩm</h5>
              <ul>
                <li><a href="#">Điện thoại Galaxy</a></li>
                <li><a href="#">Galaxy Tab</a></li>
                <li><a href="#">Galaxy Watch</a></li>
              </ul>
            </Col>
            <Col md={2} xs={6}>
              <h5>Hỗ Trợ</h5>
              <ul>
                <li><a href="#">Trang chủ Hỗ Trợ</a></li>
                <li><a href="#">Bảo hành</a></li>
              </ul>
            </Col>
             <Col md={2} xs={6}>
              <h5>Tài khoản</h5>
              <ul>
                <li><a href="#">Samsung Account</a></li>
                <li><a href="#">Đơn hàng của tôi</a></li>
              </ul>
            </Col>
             <Col md={2} xs={6}>
              <h5>Sự bền vững</h5>
              <ul>
                <li><a href="#">Môi trường</a></li>
                <li><a href="#">Bảo mật</a></li>
              </ul>
            </Col>
          </Row>
            <div className="footer-bottom">
             <div className="copyright">
               <p>© 2025 TnT. All rights reserved.</p>
               <p>Công ty TNHH Điện Tử TnT</p>
             </div>
             
          </div>
        </Container>
    </footer>
  )
}

export default Footer
