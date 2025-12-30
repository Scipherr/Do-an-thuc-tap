import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // State lưu dữ liệu thống kê
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        users: 0,
        recent_orders: []
    });

    // 1. Config hiển thị trạng thái (Kiểu Dấu Chấm - Copy từ trang Order sang cho đồng bộ)
    const getStatusConfig = (status) => {
        switch (status) {
            case 'Shipping': case 'Đang Giao':
                return { color: 'text-primary', bg: 'bg-primary', label: 'Đang Giao' };
            case 'Completed': case 'Hoàn Tất':
                return { color: 'text-success', bg: 'bg-success', label: 'Hoàn Tất' };
            case 'Cancelled': case 'Hủy Đơn':
                return { color: 'text-danger', bg: 'bg-danger', label: 'Hủy Đơn' };
            default:
                return { color: 'text-warning', bg: 'bg-warning', label: 'Chờ Xử Lý' };
        }
    };

    // Gọi API lấy dữ liệu
    useEffect(() => {
        fetch('http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/dashboard.php')
            .then(res => res.json())
            .then(data => {
                if (data) setStats(data);
            })
            .catch(err => console.error("Lỗi tải dashboard:", err));
    }, []);

    // Component thẻ thống kê nhỏ (Widget) - Đã chỉnh lại CSS cho đẹp hơn
    const StatCard = ({ title, value, icon, color, bg }) => (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card border-0 shadow-sm h-100 py-2 rounded-4 border-start border-4 border-${color}`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs fw-bold text-${color} text-uppercase mb-1`}>
                                {title}
                            </div>
                            <div className="h4 mb-0 fw-bold text-gray-800">{value}</div>
                        </div>
                        <div className="col-auto">
                            <div className={`rounded-circle d-flex align-items-center justify-content-center ${bg} text-${color}`} style={{ width: '50px', height: '50px' }}>
                                <i className={`bi ${icon} fs-4`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4 bg-white p-3 rounded-4 shadow-sm">
                <h3 className="mb-0 text-dark fw-bold">📊 Dashboard Tổng Quan</h3>
                <Link to="/admin/orders" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm rounded-pill fw-bold px-3 py-2">
                    <i className="bi bi-file-earmark-text me-2"></i>Xem Báo Cáo
                </Link>
            </div>

            {/* Hàng Thẻ Thống Kê */}
            <div className="row">
                <StatCard
                    title="Doanh Thu (Thực tế)"
                    value={`${new Intl.NumberFormat('vi-VN').format(stats.revenue)} ₫`}
                    icon="bi-currency-dollar"
                    color="success"
                    bg="bg-success-subtle"
                />
                <StatCard
                    title="Tổng Đơn Hàng"
                    value={stats.orders}
                    icon="bi-cart-check-fill"
                    color="primary"
                    bg="bg-primary-subtle"
                />
                <StatCard
                    title="Sản Phẩm Tồn Kho"
                    value={stats.products}
                    icon="bi-box-seam-fill"
                    color="warning"
                    bg="bg-warning-subtle"
                />
                <StatCard
                    title="Khách Hàng"
                    value={stats.users}
                    icon="bi-people-fill"
                    color="info"
                    bg="bg-info-subtle"
                />
            </div>

            {/* Hàng Đơn Hàng Gần Đây */}
            <div className="row mt-2">
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-white border-0">
                            <h6 className="m-0 fw-bold text-primary">
                                <i className="bi bi-clock-history me-2"></i>Đơn Hàng Mới Nhất
                            </h6>
                            <Link to="/admin/orders" className="btn btn-sm btn-outline-dark rounded-pill fw-bold px-3">Xem tất cả</Link>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light text-secondary">
                                        <tr>
                                            <th className="ps-4 py-3">Mã Đơn</th>
                                            <th>Khách Hàng</th>
                                            <th>Tổng Tiền</th>
                                            <th>Trạng Thái</th>
                                            <th className="text-end pe-4">Ngày Đặt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.recent_orders.length > 0 ? (
                                            stats.recent_orders.map((order, index) => {
                                                // Lấy config màu sắc từ hàm ở trên
                                                const statusConfig = getStatusConfig(order.trang_thai);

                                                return (
                                                    <tr key={index}>
                                                        <td className="ps-4 fw-bold text-primary">#{order.ma_don_hang}</td>
                                                        <td className="fw-bold">{order.ho_ten}</td>
                                                        <td className="text-danger fw-bold">
                                                            {new Intl.NumberFormat('vi-VN').format(order.tong_tien)} ₫
                                                        </td>

                                                        {/* --- SỬA LẠI PHẦN NÀY: Dùng Style Dấu Chấm --- */}
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <span
                                                                    className={`rounded-circle ${statusConfig.bg}`}
                                                                    style={{ width: '8px', height: '8px', marginRight: '8px' }}
                                                                ></span>
                                                                <span className={`fw-bold ${statusConfig.color}`} style={{ fontSize: '0.85rem' }}>
                                                                    {statusConfig.label}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        {/* --------------------------------------------- */}

                                                        <td className="text-end pe-4 text-muted small">
                                                            {new Date(order.ngay_tao).toLocaleString('vi-VN')}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4 text-muted">Chưa có đơn hàng nào</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;