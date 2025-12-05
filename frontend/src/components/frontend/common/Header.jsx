import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export const Header = () => {
  return (
    <header>
        <div className="header-inner">
            <div className="logo">
                 {/* Đoạn logo này đại ca có thể thay bằng đoạn logo màu mè đệ gửi lúc nãy nếu thích */}
                 <span style={{fontWeight:'900', fontSize:'24px'}}>TNT STORE</span>
            </div>
            
            <nav className="main-nav">
                <a href="#" className="nav-item active">Cửa Hàng</a>

                <div className="nav-item-group">
                    <a href="#" className="nav-item">Di động</a>
                    <div className="mega-menu">
                        <div className="mega-content">
                            <div className="mega-column">
                                <h4>Nổi bật</h4>
                                <a href="#">Galaxy Z Fold7</a>
                                <a href="#">Galaxy Z Flip7</a>
                                <a href="#">Galaxy S25 Ultra</a>
                                <a href="#">Galaxy AI</a>
                            </div>
                            <div className="mega-product-list">
                                <div className="mega-product">
                                    <img src="/images/s25phone.png" alt="S25"/>
                                    <p>Galaxy S25 Ultra</p>
                                </div>
                                <div className="mega-product">
                                    <img src="/images/zfold6.jpg" alt="Flip7"/>
                                    <p>Galaxy Z Fold 6</p>
                                </div>
                                {/* Đã sửa đường dẫn lỗi dấu \ thành / */}
                                <div className="mega-product">
                                    <img src="/images/vn-galaxy-s25-s938-sm-s938bzbcxxv-thumb-544711528.png" alt="Flip7"/>
                                    <p>Galaxy Z Fold 6</p>
                                </div>
                                <div className="mega-product">
                                    <img src="/images/vn-galaxy-s25-s938-sm-s938bzbcxxv-thumb-544711538.png" alt="Flip7"/>
                                    <p>Galaxy Z Fold 6</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-item-group">
                    <a href="#" className="nav-item">TV & AV</a>
                    <div className="mega-menu">
                        <div className="mega-content">
                            <div className="mega-column">
                                <h4>Khám phá TV</h4>
                                <a href="#">Neo QLED 8K</a>
                                <a href="#">OLED 2025</a>
                                <a href="#">The Frame</a>
                                <a href="#">Loa thanh (Soundbar)</a>
                            </div>
                            <div className="mega-product-list">
                                <div className="mega-product">
                                    <img src="/images/TVUHD.avif" alt="TV"/>
                                    <p>Crystal UHD 4K</p>
                                </div>
                                <div className="mega-product">
                                    <img src="/images/loaQseries.jpg" alt="Loa"/>
                                    <p>Loa Q-Series</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-item-group">
                    <a href="#" className="nav-item">Gia dụng</a>
                    <div className="mega-menu">
                        <div className="mega-content">
                            <div className="mega-column">
                                <h4>Thiết bị bếp</h4>
                                <a href="#">Tủ lạnh Bespoke</a>
                                <a href="#">Máy giặt thông minh</a>
                                <a href="#">Máy hút bụi</a>
                                <a href="#">Điều hòa không khí</a>
                            </div>
                            <div className="mega-product-list">
                                <div className="mega-product">
                                    <img src="/images/tulanh.jpg" alt="Fridge"/>
                                    <p>Tủ lạnh Bespoke</p>
                                </div>
                                <div className="mega-product">
                                    <img src="/images/maygiac.png" alt="Washer"/>
                                    <p>Máy giặt AI EcoBubble</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-item-group">
                    <a href="#" className="nav-item">Màn hình</a>
                    <div className="mega-menu">
                        <div className="mega-content">
                            <div className="mega-column">
                                <h4>Màn hình máy tính</h4>
                                <a href="#">Odyssey Gaming</a>
                                <a href="#">ViewFinity</a>
                                <a href="#">Smart Monitor</a>
                                <a href="#">Màn hình độ phân giải cao</a>
                            </div>
                            <div className="mega-product-list">
                                <div className="mega-product">
                                    <img src="/images/oledG8.jpg" alt="Odyssey"/>
                                    <p>Odyssey OLED G9</p>
                                </div>
                                <div className="mega-product">
                                    <img src="/images/TVM8.webp" alt="SmartMonitor"/>
                                    <p>Smart Monitor M8</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-item-group">
                    <a href="#" className="nav-item">Phụ kiện</a>
                    <div className="mega-menu">
                        <div className="mega-content">
                            <div className="mega-column">
                                <h4>Tìm kiếm nhanh</h4>
                                <a href="#">Ốp lưng & Bao da</a>
                                <a href="#">Sạc & Cáp</a>
                                <a href="#">Galaxy Buds</a>
                                <a href="#">Dây đeo đồng hồ</a>
                            </div>
                            <div className="mega-product-list">
                                <div className="mega-product">
                                    <img src="/images/tainghe.webp" alt="Buds"/>
                                    <p>Galaxy Buds FE</p>
                                </div>
                                <div class="mega-product">
                                    <img src="/images/cucsac.avif" alt="Charger"/>
                                    <p>Bộ sạc nhanh 65W</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-item-group">
                    <a href="#" className="nav-item">SmartThings</a>
                    <div className="mega-menu">
                        <div className="mega-content">
                            <div className="mega-column">
                                <h4>Sống thông minh</h4>
                                <a href="#">Ứng dụng SmartThings</a>
                                <a href="#">Trung tâm điều khiển</a>
                                <a href="#">SmartThings Find</a>
                                <a href="#">Tiết kiệm năng lượng</a>
                            </div>
                            <div className="mega-product-list">
                                <div className="mega-product">
                                    <img src="/images/tag2.avif" alt="Tag"/>
                                    <p>Galaxy SmartTag2</p>
                                </div>
                                <div className="mega-product">
                                    <img src="/images/hub.jpg" alt="Hub"/>
                                    <p>SmartThings Hub</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

            <div className="header-icons">
                <a href="#" className="icon-link">Tìm kiếm <i className="fa-solid fa-magnifying-glass"></i></a>
                <a href="#" className="icon-link"><i className="fa-solid fa-cart-shopping"></i></a>
                <Nav.Link as={NavLink} to="/loginad" className="icon-link">Đăng nhập <i className="fa-solid fa-user"></i></Nav.Link>
            </div>
        </div>
    </header>
  )
}
export default Header;