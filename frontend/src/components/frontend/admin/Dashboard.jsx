import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../assets/css/admin.css';
import AdminSidebar from './admin components/AdminSidebar';

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

    // --- DATA FETCHING ---
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
            localStorage.clear(); // Clear all auth info efficiently
            navigate('/loginad');
        });
    }

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">Loading...</div>;
    }

    return (
        <div className="admin-wrapper d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
          <AdminSidebar />

              

            {/* --- MAIN CONTENT --- */}
            <div className="flex-grow-1 p-5">
                <div className="container-fluid p-0">
                    <h3 className="fw-light mb-4">Overview</h3>

                    {/* Minimal Stats Row */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Total Orders</small>
                                <div className="mt-2 d-flex justify-content-between align-items-end">
                                    <h2 className="mb-0 fw-light">{stats.total_orders}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Products</small>
                                <div className="mt-2">
                                    <h2 className="mb-0 fw-light">{stats.total_products}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Users</small>
                                <div className="mt-2">
                                    <h2 className="mb-0 fw-light">{stats.total_users}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Categories</small>
                                <div className="mt-2">
                                    <h2 className="mb-0 fw-light">{stats.total_categories}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimal Table */}
                    <div className="bg-white border p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0 fw-normal">Recent Orders</h5>
                            <Link to="/admin/orders" className="text-decoration-none text-muted small">View All &rarr;</Link>
                        </div>
                        
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle mb-0">
                                <thead className="border-bottom">
                                    <tr className="text-muted small text-uppercase">
                                        <th className="fw-normal py-3">Order ID</th>
                                        <th className="fw-normal py-3">Date</th>
                                        <th className="fw-normal py-3">Total</th>
                                        <th className="fw-normal py-3">Status</th>
                                        <th className="fw-normal py-3 text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recent_orders.length > 0 ? (
                                        stats.recent_orders.map(item => (
                                            <tr key={item.ma_don_hang} className="border-bottom">
                                                <td className="py-3 text-dark fw-bold">#{item.ma_don_hang}</td>
                                                <td className="py-3 text-muted">{new Date(item.ngay_tao).toLocaleDateString()}</td>
                                                <td className="py-3">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.tong_tien)}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 small rounded-1 ${
                                                        item.trang_thai === 'Completed' ? 'bg-light text-success' : 'bg-light text-warning'
                                                    }`}>
                                                        {item.trang_thai}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-end">
                                                    <Link to={`/admin/order/${item.ma_don_hang}`} className="btn btn-sm btn-light border">Detail</Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5 text-muted">No recent activity</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;