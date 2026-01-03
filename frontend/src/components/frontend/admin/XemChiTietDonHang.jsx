import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Spinner, Image, Button } from 'react-bootstrap';

const DetailOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState({ order: null, order_items: [] });

    useEffect(() => {
        document.title = "Chi Tiết Đơn Hàng";
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/loginad');
            return;
        }

        
        axios.get(`http://127.0.0.1:8000/api/my-order/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.data.status === 200) {
                setOrderData({
                    order: res.data.order,
                    order_items: res.data.order_items
                });
                setLoading(false);
            } else {
               
                navigate('/my-account');
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

    // Status Color Helper
    const getStatusColor = (status) => {
        switch (parseInt(status)) {
            case 3: return 'text-success bg-success bg-opacity-10'; 
            case 4: return 'text-danger bg-danger bg-opacity-10';   
            default: return 'text-warning bg-warning bg-opacity-10'; 
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="dark" />
            </div>
        );
    }

    const { order, order_items } = orderData;

    return (
        <>
            <Header />
            <div className="bg-white py-5" style={{ minHeight: '80vh' }}>
                <div className="container">
                    
                    <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
                        <div>
                            <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                                ĐƠN HÀNG #{order.ma_don_hang}
                            </small>
                            <h2 className="fw-light mt-1 mb-0">Chi tiết đơn hàng</h2>
                        </div>
                        <Link to="/my-account" className="text-decoration-none text-dark small">
                            <i className="fa-solid fa-arrow-left me-2"></i> Quay lại danh sách
                        </Link>
                    </div>

                    <div className="row g-5">
                      
                        <div className="col-lg-8">
                            <h6 className="text-uppercase text-muted mb-4" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>Sản phẩm đã đặt</h6>
                            
                            <div className="table-responsive">
                                <table className="table table-borderless align-middle">
                                    <tbody>
                                        {order_items.map((item, index) => (
                                            <tr key={index} className="border-bottom">
                                                <td className="ps-0 py-3" style={{ width: '80px' }}>
                                                    <Image 
                                                        src={item.hinh_anh ? `http://127.0.0.1:8000${item.hinh_anh}` : 'https://via.placeholder.com/60'} 
                                                        alt={item.product_name} 
                                                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                                        className="bg-light border"
                                                    />
                                                </td>
                                                <td className="py-3">
                                                    <div className="fw-medium">{item.product_name}</div>
                                                    {(item.mau_sac || item.dung_luong) && (
                                                        <div className="text-muted small mt-1">
                                                            {item.mau_sac} {item.dung_luong && ` • ${item.dung_luong}`}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-3 text-end text-muted">
                                                    x{item.so_luong}
                                                </td>
                                                <td className="py-3 text-end fw-medium" style={{ minWidth: '120px' }}>
                                                    {formatCurrency(item.don_gia || item.gia)} 
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        
                        <div className="col-lg-4">
                            <div className="bg-light p-4 rounded-3">
                                
                                <div className="mb-4">
                                    <h6 className="text-uppercase text-muted mb-2" style={{ fontSize: '0.75rem' }}>Trạng thái đơn hàng</h6>
                                    <span className={`d-inline-block px-3 py-1 rounded-pill small fw-bold ${getStatusColor(order.trang_thai)}`}>
                                        {getStatusText(order.trang_thai)}
                                    </span>
                                </div>

                                
                                <div className="mb-4">
                                    <h6 className="text-uppercase text-muted mb-2" style={{ fontSize: '0.75rem' }}>Ngày đặt hàng</h6>
                                    <div className="small">{new Date(order.ngay_tao).toLocaleString('vi-VN')}</div>
                                </div>

                                
                                <div className="mb-4">
                                    <h6 className="text-uppercase text-muted mb-2" style={{ fontSize: '0.75rem' }}>Địa chỉ nhận hàng</h6>
                                    <div className="small lh-base">
                                        <div className="fw-bold mb-1">{order.user_name || 'Người nhận'}</div>
                                        {order.duong_giao_hang}<br/>
                                        {order.thanh_pho_giao_hang}, {order.quoc_gia_giao_hang}<br/>
                                        <span className="text-muted">{order.email}</span>
                                    </div>
                                </div>

                               
                                <div className="border-top pt-3 mt-3">
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
                                    <div className="d-flex justify-content-between border-top pt-3 fw-bold fs-5">
                                        <span>Tổng cộng</span>
                                        <span>{formatCurrency(order.tong_tien)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default XemChiTietDonHang;