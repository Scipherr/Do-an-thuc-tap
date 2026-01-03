import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Dropdown } from 'react-bootstrap';
import axios from 'axios';

export const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);


  const isLoggedIn = !!localStorage.getItem('auth_token'); 
  const userImage = localStorage.getItem('auth_image');
  const userRole = localStorage.getItem('auth_role');
  
  const imageUrl = (userImage && userImage !== 'null' && userImage !== 'undefined') 
      ? `http://127.0.0.1:8000/${userImage}` 
      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

 
  const fetchCartData = () => {
      if (!isLoggedIn) {
          setCartCount(0);
          return;
      }

      const token = localStorage.getItem('auth_token');
      axios.get(`http://127.0.0.1:8000/api/cart`, {
          headers: { "Authorization": `Bearer ${token}` }
      }).then(res => {
          if (res.data.status === 200) {
              
              const validItems = res.data.cart.filter(item => item.product != null);
              
              
              const count = validItems.reduce((acc, item) => acc + item.product_qty, 0); 
              setCartCount(count);
          }
      }).catch(err => {
          console.error("Cart fetch error", err);
      });
  };

  useEffect(() => {
      fetchCartData();
      window.addEventListener('cart-updated', fetchCartData);
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
        <Nav.Link as={NavLink} to="/category/dien-thoai" className="nav-item">Di động</Nav.Link>
        <div className="mega-menu">
           
        </div>
    </div>

    
    <div className="nav-item-group">
        <Nav.Link as={NavLink} to="/category/tv" className="nav-item">TV & AV</Nav.Link>
        <div className="mega-menu">
            
        </div>
    </div>

 
    <div className="nav-item-group">
        <Nav.Link as={NavLink} to="/category/gia-dung" className="nav-item">Gia dụng</Nav.Link>
        <div className="mega-menu">
             
        </div>
    </div>
</nav>

           <div className="header-icons d-flex align-items-center gap-3">
                <a href="#" className="icon-link text-decoration-none text-dark">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </a>
                
               
                <NavLink to="/cart" className="icon-link position-relative text-dark p-0 border-0 text-decoration-none">
                    <i className="fa-solid fa-cart-shopping"></i>
                    {cartCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '10px'}}>
                            {cartCount}
                        </span>
                    )}
                </NavLink>

                
                {isLoggedIn ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic" className="icon-link p-0 text-decoration-none border-0 after-none">
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
                            <Dropdown.Item as={NavLink} to="/my-account">Tài khoản của tôi</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to="/cart">Giỏ hàng</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logoutSubmit} className="text-danger">Đăng xuất</Dropdown.Item>
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