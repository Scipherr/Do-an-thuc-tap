import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';
import '../../../assets/css/admin.css';

const OrderManager = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Quản Lý Đơn Hàng";

        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://127.0.0.1:8000/api/admin/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.status === 200) {
                setOrders(res.data.orders);
                setLoading(false);
            }
        }).catch(err => {
            console.error("Error fetching orders:", err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                navigate('/login');
            }
            setLoading(false);
        });
    }, [navigate]);

    const renderStatus = (status) => {
        switch (parseInt(status)) {
            case 0: return <span className="">Chờ xử lý</span>;
            case 1: return <span className="">Đã xác nhận</span>;
            case 2: return <span className="">Đang giao</span>;
            case 3: return <span className="">Hoàn thành</span>;
            case 4: return <span className="">Đã hủy</span>;
            default: return <span className="">Không rõ</span>;
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-5">
                {/* Title Section */}
                <div className="mb-4 pb-3 border-bottom">
                    <h5 className="mb-0 fw-light text-uppercase tracking-wide">Quản Lý Đơn Hàng</h5>
                </div>

                {/* Table Section - No Card Wrapper */}
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                            <tr>
                                <th className="py-3 fw-normal border-bottom">Mã đơn hàng</th>
                                <th className="py-3 fw-normal border-bottom">Khách Hàng</th>
                                <th className="py-3 fw-normal border-bottom">Ngày Đặt</th>
                                <th className="py-3 fw-normal border-bottom">Tổng Tiền</th>
                                <th className="py-3 fw-normal border-bottom">Trạng Thái</th>
                                <th className="py-3 fw-normal border-bottom text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((item) => (
                                    <tr key={item.ma_don_hang} style={{ fontSize: '0.95rem' }}>
                                        <td className="py-3 text-muted">#{item.ma_don_hang}</td>
                                        <td className="py-3">{item.user_name || 'Khách vãng lai'}</td>
                                        <td className="py-3 text-secondary">
                                            {new Date(item.ngay_tao).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="py-3 fw-medium">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.tong_tien)}
                                        </td>
                                        <td className="py-3">
                                            {renderStatus(item.trang_thai)}
                                        </td>
                                        <td className="py-3 text-end">
                                            <Link 
                                                to={`/admin/order/${item.ma_don_hang}`} 
                                                className="btn btn-sm btn-primary text-white"
                                                style={{ fontSize: '0.85rem' }}
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted fw-light">
                                        Chưa có đơn hàng nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderManager;