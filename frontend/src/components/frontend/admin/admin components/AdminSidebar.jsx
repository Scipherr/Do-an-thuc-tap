import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('auth_token');
        axios.get('http://127.0.0.1:8000/api/logout', {
             headers: { 'Authorization': `Bearer ${token}` }
        }).then(() => {
            localStorage.clear();
            navigate('/loginad');
        });
    };

    
    const getLinkClass = (path) => {
        return location.pathname === path 
            ? "nav-link px-0 text-dark fw-bold" 
            : "nav-link px-0 text-secondary";   
    };

    return (
        <nav className="d-flex flex-column p-4 bg-white border-end" style={{ width: '260px', flexShrink: 0, minHeight: '100vh' }}>
            <div className="mb-5 border-bottom pb-3 center">
                <h5 className="fw-bold text-dark mb-0">Hệ thống quản lý</h5>
                
            </div>
            
            <ul className="nav flex-column gap-2">
                <li className="nav-item">
                    <Link to="/" className="nav-item">
                        <i className="bi bi-arrow-left-circle me-2"></i> Xem trang chính
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
                        Xem bảng điều khiển
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/products" className={getLinkClass('/admin/products')}>
                        Quản lý sản phẩm
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/orders" className={getLinkClass('/admin/orders')}>
                        Quản lý đơn hàng
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/users" className={getLinkClass('/admin/users')}>
                        Quản lý người dùng
                    </Link>
                </li>
            </ul>

            <div className="mt-auto pt-4 border-top">
                <button onClick={handleLogout} className="btn btn-link text-danger text-decoration-none px-0 w-100 text-start">
                    Đăng xuất
                </button>
            </div>
        </nav>
    );
};

export default AdminSidebar;