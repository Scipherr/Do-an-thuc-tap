import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Dropdown } from 'react-bootstrap';
import axios from 'axios';

export const Header = () => {
  const navigate = useNavigate();
  
  // Check login status from localStorage
const isLoggedIn = localStorage.getItem('auth_token');
  const userImage = localStorage.getItem('auth_image');
  
  // Construct image URL (assuming backend is at localhost:8000)
  // If userImage is null or "null" string, use a placeholder
  const imageUrl = (userImage && userImage !== 'null' && userImage !== 'undefined') 
      ? `http://127.0.0.1:8000/${userImage}` // Adjust if your images are stored differently
      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  const logoutSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    
    axios.post(`http://127.0.0.1:8000/api/logout`, {}, {
        headers: { "Authorization": `Bearer ${token}` }
    }).then(res => {
        if(res.data.status === true) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem('auth_image');
            navigate('/loginad');
            window.location.reload(); 
        }
    }).catch(err => {
        // Even if API fails, clear local storage to force logout on frontend
        localStorage.clear();
        navigate('/loginad');
    });
  }

  return (
    <header>
       <div className="header-inner">
            <div className="logo">
                 <span style={{fontWeight:'900', fontSize:'24px'}}>TNT STORE</span>
            </div>
            
            <nav className="main-nav">
                <a href="/" className="nav-item active">Cửa Hàng</a>
                {/* ... (Keep your existing menu items here: Di động, TV & AV, etc.) ... */}
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
                                <div className="mega-product">
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
                
                {/* CONDITIONAL RENDERING */}
                {isLoggedIn ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic" className="icon-link p-0 text-decoration-none border-0">
                             <img 
                                src={imageUrl} 
                                alt="Profile" 
                                style={{
                                    width: '32px', 
                                    height: '32px', 
                                    borderRadius: '50%', 
                                    objectFit: 'cover',
                                    border: '2px solid #ddd'
                                }} 
                             />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item as={NavLink} to="/my-account">My Account</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/cart">My Cart</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logoutSubmit} className="text-danger">Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Nav.Link as={NavLink} to="/loginad" className="icon-link">
                        Đăng nhập <i className="fa-solid fa-user"></i>
                    </Nav.Link>
                )}
            </div>
        </div>
    </header>
  )
}
export default Header;