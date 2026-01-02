import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';
import '../../../assets/css/admin.css';

const AdminUsers = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Quản Lý Người Dùng";
        fetchUsers();
    }, [navigate]);

    const fetchUsers = () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/loginad');
            return;
        }

        axios.get('http://127.0.0.1:8000/api/admin/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.status === 200) {
                setUsers(res.data.users);
            }
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching users:", err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                navigate('/loginad');
            }
            setLoading(false);
        });
    };

    const deleteUser = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Dang xoa...";

        if (!confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            thisClicked.innerText = "Xóa";
            return;
        }

        const token = localStorage.getItem('auth_token');
        axios.delete(`http://127.0.0.1:8000/api/admin/delete-user/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
                fetchUsers(); // Refresh the list
            } else if (res.data.status === 404) {
                alert(res.data.message);
                thisClicked.innerText = "Xóa";
            }
        }).catch(err => {
            console.error("Delete Error:", err);
            alert("Có lỗi xảy ra khi xóa.");
            thisClicked.innerText = "Xóa";
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

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-5">
                <div className="mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-light text-uppercase tracking-wide">Quản Lý Người Dùng</h5>
                </div>

                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                            <tr>
                                <th className="py-3 fw-normal border-bottom">ID</th>
                                <th className="py-3 fw-normal border-bottom">Họ Tên</th>
                                <th className="py-3 fw-normal border-bottom">Email</th>
                                <th className="py-3 fw-normal border-bottom">Vai Trò</th>
                                <th className="py-3 fw-normal border-bottom">Ngày tao</th>
                                <th className="py-3 fw-normal border-bottom text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((item) => (
                                    <tr key={item.ma_nguoi_dung} style={{ fontSize: '0.95rem' }}>
                                        <td className="py-3 text-muted">#{item.ma_nguoi_dung}</td>
                                        <td className="py-3 fw-bold">{item.ho_ten}</td>
                                        <td className="py-3 text-muted">{item.email}</td>
                                        <td className="py-3 text-dark">
                                            {item.vai_tro}
                                        </td>
                                        <td className="py-3 text-secondary">
                                            {item.ngay_tao ? new Date(item.ngay_tao).toLocaleDateString('vi-VN') : 'N/A'}
                                        </td>
                                        <td className="py-3 text-end">
                                            <Link to={`/admin/user/${item.ma_nguoi_dung}`} className="btn btn-sm btn-primary text-white me-2">
                                                Xem chi tiết
                                            </Link>
                                            <Link to={`/admin/edit-user/${item.ma_nguoi_dung}`} className="btn btn-sm btn-success text-white me-2">
                                                Sửa
                                            </Link>
                                            <button 
                                                type="button" 
                                                onClick={(e) => deleteUser(e, item.ma_nguoi_dung)} 
                                                className="btn btn-sm btn-danger text-white"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted fw-light">
                                        Không tìm thấy người dùng nào.
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

export default AdminUsers;