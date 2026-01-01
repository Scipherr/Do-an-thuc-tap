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

    // Helper to format status - TEXT ONLY (No Box)
    const renderStatus = (status) => {
        switch (parseInt(status)) {
            case 0: return <span className="fw-bold">Chờ xử lý</span>;       // Grey
            case 1: return <span className="fw-bold">Đã xác nhận</span>;     // Blue
            case 2: return <span className="fw-bold">Đang giao</span>;          // Cyan
            case 3: return <span className="fw-bold">Hoàn thành</span>;      // Green
            case 4: return <span className="fw-bold">Đã hủy</span>;           // Red
            default: return <span className="text-secondary">Không rõ</span>;
        }
    };

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

                    {/* Minimal Table - Recent Orders */}
                    <div className="bg-white border p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0 fw-normal">Đơn hàng gần đây</h5>
                            <Link to="/admin/orders" className="text-decoration-none text-muted small">Xem tất cả &rarr;</Link>
                        </div>
                        
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle mb-0">
                                <thead className="border-bottom">
                                    <tr className="text-muted small text-uppercase">
                                        <th className="fw-normal py-3">STT</th>
                                        <th className="fw-normal py-3">Mã đơn hàng</th>
                                        <th className="fw-normal py-3">Ngày tạo</th>
                                        <th className="fw-normal py-3">Trạng thái</th>
                                        <th className="fw-normal py-3 text-end">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recent_orders.length > 0 ? (
                                        stats.recent_orders.map((item, index) => (
                                            <tr key={item.ma_don_hang} className="border-bottom">
                                                <td className="py-3 text-muted">{index + 1}</td>
                                                <td className="py-3 text-dark fw-bold">#{item.ma_don_hang}</td>
                                                <td className="py-3 text-muted">
                                                    {new Date(item.ngay_tao).toLocaleDateString('vi-VN')}
                                                </td>
                                                
                                                {/* Status (Text Only) */}
                                                <td className="py-3">
                                                    {renderStatus(item.trang_thai)}
                                                </td>

                                                <td className="py-3 text-end">
                                                    <Link to={`/admin/order/${item.ma_don_hang}`} className="btn btn-sm btn-primary text-white">
                                                        Xem chi tiết
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5 text-muted">Chưa có đơn hàng nào trong 2 tuần qua</td>
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