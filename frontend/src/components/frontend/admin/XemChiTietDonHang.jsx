import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';
import '../../../assets/css/admin.css';

const XemChiTietDonHang = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState({ order: null, order_items: [] });

    useEffect(() => {
        document.title = "Chi Tiết Đơn Hàng";
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/login');
            return;
        }

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
                navigate('/admin/orders');
            }
        }).catch(err => setLoading(false));
    }, [id, navigate]);

    if (loading) return <div className="p-5 text-center text-muted">Loading...</div>;

    const { order, order_items } = orderData;

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-5">
               
                <div className="d-flex justify-content-between align-items-end mb-5 border-bottom pb-3">
                    <div>
                        <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                            Đơn hàng #{order.ma_don_hang}
                        </small>
                        <h2 className="fw-light mt-1 mb-0">{order.user_name || 'Khách vãng lai'}</h2>
                    </div>
                    <Link to="/admin/orders" className="text-decoration-none text-secondary small">
                        ← Quay lại
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
                                            <td className="ps-0 py-3" style={{ width: '60px' }}>
                                                <img 
                                                    src={item.hinh_anh ? `http://127.0.0.1:8000${item.hinh_anh}` : 'https://via.placeholder.com/50'} 
                                                    alt="" 
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                                    className="bg-light"
                                                />
                                            </td>
                                            <td className="py-3">
                                                <div className="fw-medium">{item.ten_san_pham}</div>
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
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        
                        
                           
                        
                    </div>

                   
                    <div className="col-lg-4">
                        <div className="ps-lg-4">
                            
                            <div className="mb-5">
                                <h6 className="text-uppercase text-muted mb-3" style={{ fontSize: '0.8rem' }}>Trạng thái</h6>
                                <div className={`d-inline-block px-3 py-1 rounded-pill small fw-medium ${
                                    order.trang_thai == 3 ? 'bg-success bg-opacity-10 text-success' : 
                                    order.trang_thai == 4 ? 'bg-danger bg-opacity-10 text-danger' : 
                                    'bg-warning bg-opacity-10 text-warning'
                                }`}>
                                    {order.trang_thai == 0 ? 'Chờ xử lý' : 
                                     order.trang_thai == 1 ? 'Đã xác nhận' :
                                     order.trang_thai == 2 ? 'Đang giao' :
                                     order.trang_thai == 3 ? 'Hoàn thành' : 'Đã hủy'}
                                </div>
                            </div>

                            
                            <div className="mb-5">
                                <h6 className="text-uppercase text-muted mb-3" style={{ fontSize: '0.8rem' }}>Khách hàng</h6>
                                <div className="mb-2 fw-medium">{order.user_name}</div>
                                <div className="text-muted small">{order.email}</div>
                                <div className="text-muted small">{new Date(order.ngay_tao).toLocaleString('vi-VN')}</div>
                            </div>

                            
                            <div className="mb-5">
                                <h6 className="text-uppercase text-muted mb-3" style={{ fontSize: '0.8rem' }}>Giao đến</h6>
                                <div className="text-muted small lh-lg">
                                    {order.duong_giao_hang}<br/>
                                    {order.thanh_pho_giao_hang}, {order.quoc_gia_giao_hang}
                                </div>
                            </div>
                            <div className="mb-5">
                                    <div style={{ minWidth: '250px' }}>
                                    <div className="d-flex justify-content-between mb-2 small text-muted">
                                        <span>Tạm tính</span>
                                        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.tien_hang)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 small text-muted">
                                        <span>Phí vận chuyển</span>
                                        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.phi_van_chuyen)}</span>
                                    </div>
                                    {Number(order.tien_giam) > 0 && (
                                        <div className="d-flex justify-content-between mb-3 small text-danger">
                                            <span>Giảm giá</span>
                                            <span>- {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.tien_giam)}</span>
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-between border-top pt-3 fw-bold fs-5">
                                        <span>Tổng cộng</span>
                                        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.tong_tien)}</span>
                                    </div>
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