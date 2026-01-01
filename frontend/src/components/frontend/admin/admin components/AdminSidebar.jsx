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

    // Helper to set active classes dynamically
    const getLinkClass = (path) => {
        return location.pathname === path 
            ? "nav-link px-0 text-dark fw-bold" // Active Style
            : "nav-link px-0 text-secondary";   // Inactive Style
    };

    return (
        <nav className="d-flex flex-column p-4 bg-white border-end" style={{ width: '260px', flexShrink: 0, minHeight: '100vh' }}>
            <div className="mb-5">
                <h5 className="fw-bold text-dark mb-0">Admin Panel</h5>
                <small className="text-muted">Hello, {localStorage.getItem('auth_name')}</small>
            </div>
            
            <ul className="nav flex-column gap-2">
                <li className="nav-item">
                    <Link to="/" className="nav-item">
                        <i className="bi bi-arrow-left-circle me-2"></i> View Homepage
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/products" className={getLinkClass('/admin/products')}>
                        Products
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/orders" className={getLinkClass('/admin/orders')}>
                        Orders
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/users" className={getLinkClass('/admin/users')}>
                        Users
                    </Link>
                </li>
            </ul>

            <div className="mt-auto pt-4 border-top">
                <button onClick={handleLogout} className="btn btn-link text-danger text-decoration-none px-0 w-100 text-start">
                    Log Out
                </button>
            </div>
        </nav>
    );
};

export default AdminSidebar;