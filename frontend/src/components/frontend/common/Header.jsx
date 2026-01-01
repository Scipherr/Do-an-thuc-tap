import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Dropdown, Badge } from 'react-bootstrap'; // Added Badge
import axios from 'axios';

export const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0); // State for cart count
  
  // Auth Check
  const isLoggedIn = localStorage.getItem('auth_token');
  const userImage = localStorage.getItem('auth_image');
  const userRole = localStorage.getItem('auth_role');
  
  const imageUrl = (userImage && userImage !== 'null' && userImage !== 'undefined') 
      ? `http://127.0.0.1:8000/${userImage}` 
      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  // --- CART COUNT LOGIC ---
  const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // Count total items (sum of quantities)
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
  };

  useEffect(() => {
      // 1. Initial count check
      updateCartCount();

      // 2. Listen for custom event 'cart-updated'
      window.addEventListener('cart-updated', updateCartCount);

      // Cleanup
      return () => {
          window.removeEventListener('cart-updated', updateCartCount);
      };
  }, []);
  // ------------------------

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
            localStorage.removeItem('auth_role');
            navigate('/loginad');
            window.location.reload(); 
        }
    }).catch(err => {
        localStorage.clear();
        navigate('/loginad');
    });
  }

  return (
    <header>
       <div className="header-inner">
            <div className="logo">
                 <Nav.Link as={NavLink} to="/" className="p-0 text-dark text-decoration-none">
                    <span style={{fontWeight:'900', fontSize:'24px'}}>TNT STORE</span>
                 </Nav.Link>
            </div>
            
            <nav className="main-nav">
                <Nav.Link as={NavLink} to="/" className="nav-item">Cửa Hàng</Nav.Link>
               
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
            </nav>

           <div className="header-icons">
                <a href="#" className="icon-link">Tìm kiếm <i className="fa-solid fa-magnifying-glass"></i></a>
                
                {/* --- CART ICON WITH BADGE --- */}
                <Nav.Link as={NavLink} to="/cart" className="icon-link position-relative">
                    <i className="fa-solid fa-cart-shopping"></i>
                    {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '10px'}}>
                            {cartCount}
                        </span>
                    )}
                </Nav.Link>

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
                            {userRole === 'admin' && (
                                <>
                                    <Dropdown.Item as={NavLink} to="/admin/dashboard" className="fw-bold text-primary">
                                        <i className="fa-solid fa-gauge me-2"></i> Admin Dashboard
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                </>
                            )}
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