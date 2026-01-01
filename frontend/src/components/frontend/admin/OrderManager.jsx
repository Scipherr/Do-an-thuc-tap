import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';
import '../../../assets/css/admin.css';

const OrderManager = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        document.title = "Quản Lý Đơn Hàng";

        axios.get('http://127.0.0.1:8000/api/admin/orders').then(res => {
            if (res.data.status === 200) {
                setOrders(res.data.orders);
                setLoading(false);
            }
        }).catch(err => {
            console.error("Error fetching orders:", err);
            setLoading(false);
        });
    }, []);

    // Status Helper (Plain Text - No Colors)
    const renderStatus = (status) => {
        switch (parseInt(status)) {
            case 0: return "Chờ xử lý";
            case 1: return "Đã xác nhận";
            case 2: return "Đang giao";
            case 3: return "Hoàn thành";
            case 4: return "Đã hủy";
            default: return "Không rõ";
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-wrapper d-flex bg-light" style={{ minHeight: '100vh' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3">
                        <h4 className="mb-0 fw-normal">Quản Lý Đơn Hàng</h4>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3 border-0">ID</th>
                                        <th className="py-3 border-0">Khách Hàng</th>
                                        <th className="py-3 border-0">Ngày Đặt</th>
                                        <th className="py-3 border-0">Tổng Tiền</th>
                                        <th className="py-3 border-0">Trạng Thái</th>
                                        <th className="py-3 border-0 text-end pe-4">Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length > 0 ? (
                                        orders.map((item) => (
                                            <tr key={item.ma_don_hang} className="border-bottom">
                                                <td className="ps-4 fw-bold">#{item.ma_don_hang}</td>
                                                <td>{item.user_name || 'Khách vãng lai'}</td>
                                                <td className="text-secondary">
                                                    {new Date(item.ngay_tao).toLocaleDateString('vi-VN')}
                                                </td>
                                                <td className="fw-bold">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.tong_tien)}
                                                </td>
                                                <td>
                                                    {renderStatus(item.trang_thai)}
                                                </td>
                                                <td className="text-end pe-4">
                                                    <Link to={`/admin/order/${item.ma_don_hang}`} className="btn btn-sm btn-outline-primary">
                                                        Xem chi tiết
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-5 text-muted">
                                                Chưa có đơn hàng nào.
                                            </td>
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

export default OrderManager;