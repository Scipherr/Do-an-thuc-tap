import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react'; 

export const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]); 
  const [totalPrice, setTotalPrice] = useState(0);

  // Auth Check
  const isLoggedIn = !!localStorage.getItem('auth_token'); 
  const userImage = localStorage.getItem('auth_image');
  const userRole = localStorage.getItem('auth_role');
  
  const imageUrl = (userImage && userImage !== 'null' && userImage !== 'undefined') 
      ? `http://127.0.0.1:8000/${userImage}` 
      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  // --- CART FETCH LOGIC ---
 const fetchCartData = () => {
      if (!isLoggedIn) {
          setCartCount(0);
          setCartItems([]);
          return;
      }

      const token = localStorage.getItem('auth_token');
      axios.get(`http://127.0.0.1:8000/api/cart`, {
          headers: { "Authorization": `Bearer ${token}` }
      }).then(res => {
          if (res.data.status === 200) {
              // 1. Filter valid items
              const validItems = res.data.cart.filter(item => item.product != null);
              setCartItems(validItems);
              
              // 2. Safe Reduce for Count
              const count = validItems.reduce((acc, item) => acc + item.product_qty, 0); 
              setCartCount(count);

              // 3. Safe Reduce for Price (This is where it was crashing)
              const total = validItems.reduce((acc, item) => {
                  if(!item.product) return acc; // Extra safety
                  return acc + (item.product.gia * item.product_qty);
              }, 0);
              setTotalPrice(total);
          }
      }).catch(err => {
          console.error("Cart fetch error", err);
      });
  };

  useEffect(() => {
      // 1. Initial fetch when page loads
      fetchCartData();

      // 2. Listen for custom event 'cart-updated' from ProductDetail
      window.addEventListener('cart-updated', fetchCartData);

      // Cleanup listener
      return () => {
          window.removeEventListener('cart-updated', fetchCartData);
      };
  }, [isLoggedIn]);

  const logoutSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    
    axios.post(`http://127.0.0.1:8000/api/logout`, {}, {
        headers: { "Authorization": `Bearer ${token}` }
    }).then(res => {
        if(res.data.status === true) {
            localStorage.clear();
            navigate('/loginad');
            window.location.reload(); 
        }
    }).catch(err => {
        localStorage.clear();
        navigate('/loginad');
    });
  }

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

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
               
                {/* --- MEGA MENUS --- */}
                <div className="nav-item-group">
                    <a href="#" className="nav-item">Di động</a>
                    <div className="mega-menu">
                        <div className="mega-content">
                            <div className="mega-column">
                                <h4>Nổi bật</h4>
                                <a href="#">Galaxy Z Fold7</a>
                                <a href="#">Galaxy Z Flip7</a>
                                <a href="#">Galaxy S25 Ultra</a>
                            </div>
                            <div className="mega-product-list">
                                <div className="mega-product">
                                    <img src="/images/s25phone.png" alt="S25"/>
                                    <p>Galaxy S25 Ultra</p>
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

           <div className="header-icons d-flex align-items-center gap-3">
                <a href="#" className="icon-link text-decoration-none text-dark">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </a>
                
                {/* --- MINI CART DROPDOWN --- */}
                <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="icon-link position-relative text-dark p-0 border-0 after-none text-decoration-none">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '10px'}}>
                                {cartCount}
                            </span>
                        )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: '320px', padding: '0', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <div className="p-3 border-bottom bg-light">
                            <h6 className="m-0 fw-bold">Giỏ hàng ({cartCount})</h6>
                        </div>
                        
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {cartItems.length > 0 ? (
                                cartItems.map((item, idx) => (
                                    <div key={idx} className="d-flex gap-3 p-3 border-bottom align-items-center bg-white">
                                        {/* Added safety check just in case item.product is still somehow null */}
                                        {item.product && (
                                            <>
                                                <img 
                                                    src={`http://127.0.0.1:8000/${item.product.hinh_anh}`} 
                                                    alt={item.product.ten_san_pham} 
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                                />
                                                <div className="flex-grow-1">
                                                    <p className="mb-0 small fw-bold text-truncate" style={{maxWidth: '180px'}}>{item.product.ten_san_pham}</p>
                                                    <small className="text-muted">{item.product_qty} x {formatPrice(item.product.gia)}</small>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-muted bg-white">
                                    <ShoppingCart size={32} className="mb-2 opacity-50"/>
                                    <p className="mb-0 small">Giỏ hàng trống</p>
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-3 bg-white">
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="fw-bold">Tổng cộng:</span>
                                    <span className="fw-bold text-danger">{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="d-grid gap-2">
                                    <NavLink to="/cart" className="btn btn-dark btn-sm rounded-pill fw-bold">Xem giỏ hàng</NavLink>
                                </div>
                            </div>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                {/* --- USER DROPDOWN --- */}
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
                    <Nav.Link as={NavLink} to="/loginad" className="icon-link text-dark">
                        Đăng nhập <i className="fa-solid fa-user"></i>
                    </Nav.Link>
                )}
            </div>
        </div>
    </header>
  )
}
export default Header;