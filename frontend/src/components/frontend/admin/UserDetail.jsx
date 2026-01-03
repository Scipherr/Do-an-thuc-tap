import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';
import '../../../assets/css/admin.css';

const UserDetail = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Chi Tiết Người Dùng";
        fetchUserDetail();
    }, [id, navigate]);

    const fetchUserDetail = () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/loginad');
            return;
        }

        axios.get(`http://127.0.0.1:8000/api/admin/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.status === 200) {
                setUser(res.data.user);
            } else if (res.data.status === 404) {
                alert(res.data.message);
                navigate('/admin/users');
            }
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching user details:", err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                navigate('/loginad');
            }
            setLoading(false);
        });
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

    if (!user) {
        return (
            <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
                <AdminSidebar />
                <div className="flex-grow-1 p-5">
                    <div className="alert alert-danger">Không tìm thấy thông tin người dùng.</div>
                    <Link to="/admin/users" className="btn btn-secondary">Quay lại</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-5">
                <div className="mb-5 pb-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-light text-uppercase tracking-wide">Chi Tiết Người Dùng: {user.ho_ten}</h5>
                    <Link to="/admin/users" className="btn btn-sm btn-outline-secondary">
                        <i className="fa fa-arrow-left me-1"></i> Quay lại
                    </Link>
                </div>

                <div className="row">
                    
                    <div className="col-md-4 mb-4">
                        <div className="text-center pt-3">
                            <div className="mb-4">
                                {user.hinh_anh ? (
                                    <img 
                                        src={`http://127.0.0.1:8000/${user.hinh_anh}`} 
                                        alt={user.ho_ten} 
                                        className="rounded-circle img-thumbnail"
                                        style={{ width: '160px', height: '160px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div 
                                        className="rounded-circle bg-light text-secondary d-flex align-items-center justify-content-center mx-auto"
                                        style={{ width: '160px', height: '160px', fontSize: '3.5rem' }}
                                    >
                                        {user.ho_ten.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <h4 className="mb-2">{user.ho_ten}</h4>
                            <p className="text-muted mb-3">{user.email}</p>
                           
                        </div>
                    </div>

                    {/* Right Column - Detailed Info */}
                    <div className="col-md-8 mb-4 ps-md-5">
                        <div className="mb-4 pb-2 border-bottom">
                            <h6 className="mb-0 fw-bold text-uppercase text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>Thông tin cá nhân</h6>
                        </div>
                        
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Tên người dùng</div>
                            <div className="col-sm-8 fw-medium text-dark">{user.ho_ten}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Vai trò</div>
                            <div className="col-sm-8 fw-medium text-dark">{user.vai_tro === 1 ? 'Admin' : 'Khách hàng'}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Email</div>
                            <div className="col-sm-8 fw-medium text-dark">{user.email}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">ID Người dùng</div>
                            <div className="col-sm-8 fw-medium text-dark">#{user.ma_nguoi_dung}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Số điện thoại</div>
                            <div className="col-sm-8 text-dark">{user.so_dien_thoai || 'Chưa cập nhật'}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Giới tính</div>
                            <div className="col-sm-8 text-dark">{user.gioi_tinh || 'Chưa cập nhật'}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Ngày sinh</div>
                            <div className="col-sm-8 text-dark">
                                {user.ngay_sinh ? new Date(user.ngay_sinh).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                            </div>
                        </div>
                        
                        <div className="mt-5 mb-4 pb-2 border-bottom">
                            <h6 className="mb-0 fw-bold text-uppercase text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>Địa chỉ & Thời gian</h6>
                        </div>
                        
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Địa chỉ</div>
                            <div className="col-sm-8 text-dark">
                                {[user.duong, user.thanh_pho, user.tinh_thanh].filter(Boolean).join(', ') || 'Chưa cập nhật'}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Ngày tạo tài khoản</div>
                            <div className="col-sm-8 text-dark">
                                {user.ngay_tao ? new Date(user.ngay_tao).toLocaleString('vi-VN') : 'N/A'}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-4 text-muted">Cập nhật lần cuối</div>
                            <div className="col-sm-8 text-dark">
                                {user.ngay_cap_nhat ? new Date(user.ngay_cap_nhat).toLocaleString('vi-VN') : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;