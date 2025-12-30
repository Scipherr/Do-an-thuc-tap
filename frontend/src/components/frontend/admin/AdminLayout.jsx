import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();

    // Kiểm tra quyền Admin khi vào trang này
    useEffect(() => {
        const userStr = localStorage.getItem('user_info');
        if (!userStr) {
            navigate('/loginad');
        } else {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                alert("Chức năng dành cho QTV!");
                navigate('/');
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user_info');
        navigate('/loginad');
    };

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* SIDEBAR MÀU TỐI */}
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4 fw-bold">TNT ADMIN</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link text-white">
                            <i className="bi bi-speedometer2 me-2"></i> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" className="nav-link text-white">
                            <i className="bi bi-box-seam me-2"></i> Quản lý Sản phẩm
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders" className="nav-link text-white">
                            <i className="bi bi-cart-check me-2"></i> Quản lý Đơn hàng
                        </Link>
                    </li>
                </ul>
                <hr />
                <button onClick={handleLogout} className="btn btn-danger w-100">
                    Đăng xuất
                </button>
            </div>

            {/* NỘI DUNG CHÍNH (THAY ĐỔI THEO ROUTE) */}
            <div className="flex-grow-1 bg-light p-4" style={{ overflowY: 'auto' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;