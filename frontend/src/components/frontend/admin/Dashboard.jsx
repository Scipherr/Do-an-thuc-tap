import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../assets/css/admin.css'; // Import the CSS we just made

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_users: 0,
        total_products: 0,
        total_orders: 0,
        total_categories: 0,
        recent_orders: []
    });

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/loginad');
            return;
        }

        axios.get('http://127.0.0.1:8000/api/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if(res.data.status === 200) {
                setStats(res.data);
                setLoading(false);
            }
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.status === 401) {
                navigate('/loginad');
            }
        });
    }, [navigate]);

    const handleLogout = () => {
        const token = localStorage.getItem('auth_token');
        axios.get('http://127.0.0.1:8000/api/logout', {
             headers: { 'Authorization': `Bearer ${token}` }
        }).then(() => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem('auth_role');
            navigate('/loginad');
        });
    }

    if (loading) {
        return <div className="d-flex justify-content-center mt-5"><div className="spinner-border"></div></div>;
    }

    return (
        <div className="admin-wrapper">
            {/* --- SIDEBAR --- */}
            <nav className="admin-sidebar d-flex flex-column">
                <div className="text-center mb-4">
                    <h4 className="fw-bold">Admin Panel</h4>
                    <small>Welcome, {localStorage.getItem('auth_name')}</small>
                </div>
                
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin/dashboard" className="nav-link active">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/products" className="nav-link">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/orders" className="nav-link">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/users" className="nav-link">Users</Link>
                    </li>
                    <li className="nav-item mt-auto">
                        <button onClick={handleLogout} className="nav-link btn btn-link text-start w-100 text-danger">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <div className="admin-content">
                <div className="container-fluid">
                    <h2 className="mb-4">Dashboard Overview</h2>

                    {/* Stats Cards Row */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-3">
                            <div className="card stat-card bg-primary text-white p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">Total Orders</h5>
                                        <h2 className="fw-bold">{stats.total_orders}</h2>
                                    </div>
                                    <div className="icon-box">🛒</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card stat-card bg-success text-white p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">Total Products</h5>
                                        <h2 className="fw-bold">{stats.total_products}</h2>
                                    </div>
                                    <div className="icon-box">📦</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card stat-card bg-warning text-dark p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">Total Users</h5>
                                        <h2 className="fw-bold">{stats.total_users}</h2>
                                    </div>
                                    <div className="icon-box">👥</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card stat-card bg-info text-white p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">Categories</h5>
                                        <h2 className="fw-bold">{stats.total_categories}</h2>
                                    </div>
                                    <div className="icon-box">📂</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="card shadow-sm">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">Recent Orders</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.recent_orders.length > 0 ? (
                                            stats.recent_orders.map(item => (
                                                <tr key={item.ma_don_hang}>
                                                    <td>#{item.ma_don_hang}</td>
                                                    <td>{new Date(item.ngay_tao).toLocaleDateString()}</td>
                                                    <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.tong_tien)}</td>
                                                    <td>
                                                        <span className={`badge ${item.trang_thai === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                                            {item.trang_thai}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link to={`/admin/order/${item.ma_don_hang}`} className="btn btn-sm btn-outline-primary">View</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">No recent orders found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* End Recent Orders */}

                </div>
            </div>
        </div>
    );
};

export default Dashboard;