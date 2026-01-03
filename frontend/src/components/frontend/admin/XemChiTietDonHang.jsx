import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar'; // Import Sidebar
import { Spinner, Image } from 'react-bootstrap';
import '../../../assets/css/admin.css';

const XemChiTietDonHang = () => { // Renamed to match export
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState({ order: null, order_items: [] });

    useEffect(() => {
        document.title = "Chi Tiết Đơn Hàng (Admin)";
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/loginad');
            return;
        }

        // Changed API endpoint to Admin route
        axios.get(`http://127.0.0.1:8000/api/admin/order/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.data.status === 200) {
                setOrderData({
                    order: res.data.order,
                    order_items: res.data.order_items
                });
                setLoading(false);
            } else {
                alert(res.data.message);
                navigate('/admin/orders'); // Redirect to Admin Orders list
            }
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id, navigate]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const getStatusText = (status) => {
        switch (parseInt(status)) {
            case 0: return 'Chờ xử lý';
            case 1: return 'Đã xác nhận';
            case 2: return 'Đang giao';
            case 3: return 'Đã giao';
            case 4: return 'Đã hủy';
            default: return 'Chờ xử lý';
        }
    };

    const getStatusColor = (status) => {
        switch (parseInt(status)) {
            case 3: return 'text-success bg-success bg-opacity-10'; 
            case 4: return 'text-danger bg-danger bg-opacity-10';   
            default: return 'text-warning bg-warning bg-opacity-10'; 
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    const { order, order_items } = orderData;

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-5">
                <div className="mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
                    <div>
                        <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                            ĐƠN HÀNG #{order.ma_don_hang}
                        </small>
                        <h5 className="mb-0 fw-light text-uppercase tracking-wide mt-1">Chi tiết đơn hàng</h5>
                    </div>
                    <Link to="/admin/orders" className="btn btn-sm btn-outline-secondary">
                        <i className="fa fa-arrow-left me-1"></i> Quay lại
                    </Link>
                </div>

                <div className="row g-4">
                    {/* Left Column: Order Items */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white py-3">
                                <h6 className="mb-0 fw-bold text-muted text-uppercase" style={{ fontSize: '0.8rem' }}>Sản phẩm đã đặt</h6>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <tbody>
                                            {order_items.map((item, index) => (
                                                <tr key={index} className="border-bottom">
                                                    <td className="ps-4 py-3" style={{ width: '80px' }}>
                                                        <Image 
                                                            src={item.hinh_anh ? `http://127.0.0.1:8000/${item.hinh_anh}` : 'https://via.placeholder.com/60'} 
                                                            alt={item.product_name} 
                                                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                                            className="bg-light border"
                                                        />
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="fw-medium text-dark">{item.product_name}</div>
                                                        {(item.mau_sac || item.dung_luong) && (
                                                            <div className="text-muted small mt-1">
                                                                {item.mau_sac} {item.dung_luong && ` • ${item.dung_luong}`}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-3 text-center text-muted">
                                                        x{item.so_luong}
                                                    </td>
                                                    <td className="py-3 text-end pe-4 fw-bold text-dark" style={{ minWidth: '120px' }}>
                                                        {formatCurrency(item.don_gia || item.gia)} 
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Info & Status */}
                    <div className="col-lg-4">
                        {/* Status Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h6 className="text-uppercase text-muted mb-3" style={{ fontSize: '0.75rem' }}>Thông tin đơn hàng</h6>
                                
                                <div className="mb-3">
                                    <label className="text-muted small d-block mb-1">Trạng thái</label>
                                    <span className={`badge ${getStatusColor(order.trang_thai)} px-3 py-2 rounded-pill`}>
                                        {getStatusText(order.trang_thai)}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <label className="text-muted small d-block mb-1">Ngày đặt hàng</label>
                                    <span className="fw-medium">{new Date(order.ngay_tao).toLocaleString('vi-VN')}</span>
                                </div>

                                <div className="mb-0">
                                    <label className="text-muted small d-block mb-1">Phương thức thanh toán</label>
                                    <span className="fw-medium">{order.phuong_thuc_thanh_toan || 'COD'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Info Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h6 className="text-uppercase text-muted mb-3" style={{ fontSize: '0.75rem' }}>Khách hàng</h6>
                                <div className="fw-bold mb-1">{order.ho_ten || order.user_name || 'Khách vãng lai'}</div>
                                <div className="small text-muted mb-2">{order.email}</div>
                                <div className="small text-muted">{order.so_dien_thoai}</div>
                                <hr className="my-3"/>
                                <h6 className="text-uppercase text-muted mb-2" style={{ fontSize: '0.75rem' }}>Địa chỉ giao hàng</h6>
                                <div className="small lh-base text-dark">
                                    {order.duong_giao_hang}<br/>
                                    {order.thanh_pho_giao_hang}, {order.quoc_gia_giao_hang}
                                </div>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="text-uppercase text-muted mb-3" style={{ fontSize: '0.75rem' }}>Tổng thanh toán</h6>
                                <div className="d-flex justify-content-between mb-2 small text-muted">
                                    <span>Tạm tính</span>
                                    <span>{formatCurrency(order.tien_hang)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2 small text-muted">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatCurrency(order.phi_van_chuyen)}</span>
                                </div>
                                {Number(order.tien_giam) > 0 && (
                                    <div className="d-flex justify-content-between mb-3 small text-danger">
                                        <span>Giảm giá</span>
                                        <span>- {formatCurrency(order.tien_giam)}</span>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between border-top pt-3 fw-bold fs-5 text-dark">
                                    <span>Tổng cộng</span>
                                    <span>{formatCurrency(order.tong_tien)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default XemChiTietDonHang;