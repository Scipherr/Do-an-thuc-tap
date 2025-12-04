import React from 'react'

import { Container, Navbar, Nav, Row, Col, Button, Offcanvas,Carousel } from 'react-bootstrap';
import { Search, ShoppingCart, User, Menu, Star, Smartphone, Monitor, Watch } from 'lucide-react';
import '../../assets/css/style.scss';
import s25phone from '../../assets/images/s25phone.png';
import Header from './common/Header';
import Footer from './common/Footer';




const Home = () => {
return (
    <>
    <Header/>
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

            <section className="highlight-section">
          <Container>
            <div className="text-center mb-5">
              <h2 className="section-title">TV & Loa</h2>
              <div className="sub-nav d-flex justify-content-center gap-4 mt-3">
                <span className="sub-link active">Neo QLED 8k</span>
                <span className="sub-link">Neo QLED 4K</span>
                <span className="sub-link">OLED</span>
                <span className="sub-link">The Frame</span>
                <span className="sub-link">Loa Tranh Music Frame</span>
              </div>
            </div>

            <Row className="align-items-center">
              <Col md={5} className="offset-md-1">
                 <div className="highlight-content">
                   <h3 className="product-name">Galaxy S25 Ultra</h3>
                   
                   <h4 className="tech-spec">NEO QLED 8K</h4>
                   <p className="spec-desc">vượt 8K, Vượt xa đa nhiệm</p>
                   <div className="action-links">
                     <a href="#" className="link-underlined">Tìm hiểu thêm</a>
                     <Button className="btn-buy-round">Mua Ngay</Button>
                   </div>
                 </div>
              </Col>
              
            </Row>
          </Container>
        </section>

           <section className="vision-banner">
          <Container>
            <div className="vision-content">
              <h2>Sản phẩm mới nhất 2025</h2>
              
              <div className="vision-buttons">
                <Button variant="outline-dark" className="rounded-pill">Tìm hiểu thêm</Button>
                <Button variant="outline-dark" className="rounded-pill">Mua ngay</Button>
              </div>
            </div>
          </Container>
        </section>

         <h2 className="section-titlecr text-center gap-4 mt-5">Khám Phá Sản Phẩm Khác</h2>
         <section className="product-carousel-section">
               
          <Container>
           
            <Carousel className="custom-carousel" interval={3000}>
              
              <Carousel.Item>
                <div className="carousel-content-wrapper">
                  <Row className="w-100 align-items-center m-0">
                    <Col md={6} className="carousel-product-info ps-md-5">
                      <h3>Galaxy Z Fold5</h3>
                      <p>Mở ra thế giới mới với màn hình cực đại. Đa nhiệm mạnh mẽ, hiệu suất đỉnh cao.</p>
                      <Button variant="dark" className="rounded-pill px-4">Xem chi tiết</Button>
                    </Col>
                    <Col md={6} className="p-0">
                      <div className="carousel-visual">
                          <div className="carousel-shape-rect" style={{backgroundImage: "url('/src/assets/images/s25phone.png')", backgroundSize: 'fill', borderColor: '#81d4fa'}}>
                         </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>

             
              <Carousel.Item>
                <div className="carousel-content-wrapper">
                  <Row className="w-100 align-items-center m-0">
                    <Col md={6} className="carousel-product-info ps-md-5">
                      <h3>Galaxy Watch6</h3>
                      <p>Huấn luyện viên giấc ngủ của riêng bạn. Theo dõi sức khỏe toàn diện mỗi ngày.</p>
                      <Button variant="dark" className="rounded-pill px-4">Mua Ngay</Button>
                    </Col>
                    <Col md={6} className="p-0">
                      <div className="carousel-visual">
                         <div className="carousel-shape-circle" style={{backgroundColor: '#f3e5f5'}}>
                            <Watch size={80} color="#7b1fa2" strokeWidth={1} />
                         </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>

            
              <Carousel.Item>
                <div className="carousel-content-wrapper">
                   <Row className="w-100 align-items-center m-0">
                    <Col md={6} className="carousel-product-info ps-md-5">
                      <h3>Smart Monitor M8</h3>
                      <p>Màn hình thông minh không cần máy tính. Giải trí và làm việc tất cả trong một.</p>
                      <Button variant="dark" className="rounded-pill px-4">Khám phá</Button>
                    </Col>
                    <Col md={6} className="p-0">
                      <div className="carousel-visual">
                         <div className="carousel-shape-rect" style={{backgroundImage: "url('/src/assets/images/s25phone.png')", backgroundSize: 'fill', borderColor: '#81d4fa'}}>
                         </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>
            </Carousel>
          </Container>
        </section>
    </main>
<Footer/>
    </>
    
)
}

export default Home