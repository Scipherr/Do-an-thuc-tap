import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='main-footer'>
        <Container>
          <Row className="gy-5">
           
            <Col lg={4} md={12}>
                <h5 className="footer-brand">TNT STORE</h5>
                <p className="footer-desc">
                    Trải nghiệm công nghệ đỉnh cao với các sản phẩm chính hãng. 
                    Chất lượng - Uy tín - Tận tâm.
                </p>
                <ul className="footer-contact">
                    <li>
                        <MapPin size={18} /> 
                        <span>123 Đường Công Nghệ, TP.HCM</span>
                    </li>
                    <li>
                        <Phone size={18} /> 
                        <span>1800 1234 (Miễn phí)</span>
                    </li>
                    <li>
                        <Mail size={18} /> 
                        <span>support@tntstore.com</span>
                    </li>
                </ul>
                <div className="social-icons">
                    <a href="#" className="social-link"><Facebook size={20} /></a>
                    <a href="#" className="social-link"><Instagram size={20} /></a>
                    <a href="#" className="social-link"><Youtube size={20} /></a>
                </div>
            </Col>
            
           
            <Col lg={2} md={4} xs={6}>
              <h6 className="footer-title">Sản Phẩm</h6>
              <ul className="footer-links">
                <li><Link to="#">Điện thoại Galaxy</Link></li>
                <li><Link to="#">Galaxy Tab</Link></li>
                <li><Link to="#">Galaxy Watch</Link></li>
                <li><Link to="#">Phụ kiện</Link></li>
                <li><Link to="#">SmartThings</Link></li>
              </ul>
            </Col>
            
            
            <Col lg={3} md={4} xs={6}>
              <h6 className="footer-title">Hỗ Trợ Khách Hàng</h6>
              <ul className="footer-links">
                <li><Link to="#">Trung tâm hỗ trợ</Link></li>
                <li><Link to="#">Tra cứu bảo hành</Link></li>
                <li><Link to="#">Tài khoản của tôi</Link></li>
                <li><Link to="#">Tra cứu đơn hàng</Link></li>
                <li><Link to="#">Chính sách đổi trả</Link></li>
              </ul>
            </Col>
            
         
            <Col lg={3} md={4} xs={12}>
              <h6 className="footer-title">Chính Sách & Về Chúng Tôi</h6>
              <ul className="footer-links">
                <li><Link to="#">Về TNT Store</Link></li>
                <li><Link to="#">Môi trường & Bền vững</Link></li>
                <li><Link to="#">Chính sách bảo mật</Link></li>
                <li><Link to="#">Điều khoản sử dụng</Link></li>
              </ul>
            </Col>
          </Row>

          <div className="footer-bottom">
             <Row className="align-items-center">
                <Col md={6} className="text-center text-md-start">
                    <p className="copyright-text">© 2025 TNT Store. All rights reserved.</p>
                </Col>
                <Col md={6} className="text-center text-md-end">
                    <div className="payment-methods">
                    
                        <span className="small text-muted">Vietnam</span>
                    </div>
                </Col>
             </Row>
          </div>
        </Container>
    </footer>
  )
}

export default Footer;