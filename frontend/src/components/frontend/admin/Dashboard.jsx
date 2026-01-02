import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../assets/css/admin.css';
import AdminSidebar from './admin components/AdminSidebar';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_users: 0,
        total_products: 0,
        total_orders: 0,
        total_categories: 0,
        recent_orders: [],
        revenue_stats: [] 
    });

 
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');

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
            }
        })
        .catch(err => {
            console.error("Dashboard Error:", err);
            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    navigate('/loginad');
                }
            }
        })
        .finally(() => {
            setLoading(false);
        });

    }, [navigate]);

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

    const getFilteredAndSortedOrders = () => {
        let result = [...stats.recent_orders];
        
        if (filterStatus !== 'all') {
            result = result.filter(item => parseInt(item.trang_thai) === parseInt(filterStatus));
        }
        
        result.sort((a, b) => {
            const dateA = new Date(a.ngay_tao);
            const dateB = new Date(b.ngay_tao);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return result;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const filteredOrders = getFilteredAndSortedOrders();

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">Loading...</div>;
    }

    return (
        <div className="admin-wrapper d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <AdminSidebar />
           
            <div className="flex-grow-1 p-5">
                <div className="container-fluid p-0">
                    <h3 className="fw-light mb-4">Tổng quan</h3>

                 
                    <div className="row g-4 mb-5">
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Tổng đơn hàng</small>
                                <div className="mt-2">
                                    <h2 className="mb-0 fw-light">{stats.total_orders}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Sản phẩm</small>
                                <div className="mt-2">
                                    <h2 className="mb-0 fw-light">{stats.total_products}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Người dùng</small>
                                <div className="mt-2">
                                    <h2 className="mb-0 fw-light">{stats.total_users}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="p-4 bg-white border rounded-0 h-100">
                                <small className="text-uppercase text-muted fw-bold" style={{fontSize: '0.75rem'}}>Danh mục</small>
                                <div className="mt-2">
                                    <h2 className="mb-0 fw-light">{stats.total_categories}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                 
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="p-4 bg-white border rounded-0">
                                <h5 className="mb-4 fw-normal">Doanh thu 7 ngày qua (Đơn hoàn thành)</h5>
                                <div style={{ width: '100%', height: 350 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={stats.revenue_stats}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis 
                                                dataKey="date" 
                                                tickFormatter={(str) => new Date(str).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'})}
                                            />
                                            <YAxis 
                                                tickFormatter={(value) => new Intl.NumberFormat('vi-VN', { notation: "compact" }).format(value)}
                                            />
                                            <Tooltip 
                                                formatter={(value) => formatCurrency(value)}
                                               
                                                labelFormatter={(label) => `Ngày thanh toán: ${new Date(label).toLocaleDateString('vi-VN')}`}
                                            />
                                            <Bar dataKey="total_revenue" name="Doanh thu" fill="#0d6efd" barSize={50} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    {stats.revenue_stats && stats.revenue_stats.length === 0 && (
                                        <div className="text-center text-muted mt-2">Chưa có dữ liệu doanh thu trong tuần này.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                  
                    <div className="bg-white border p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 fw-normal">Đơn hàng gần đây</h5>
                            <Link to="/admin/orders" className="text-decoration-none text-muted small">Xem tất cả &rarr;</Link>
                        </div>
                   
                        <div className="d-flex gap-3 mb-3">
                            <select 
                                className="form-select form-select-sm" 
                                style={{ width: '150px' }}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="0">Chờ xử lý</option>
                                <option value="1">Đã xác nhận</option>
                                <option value="2">Đang giao</option>
                                <option value="3">Hoàn thành</option>
                                <option value="4">Đã hủy</option>
                            </select>

                            <select 
                                className="form-select form-select-sm" 
                                style={{ width: '150px' }}
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="oldest">Cũ nhất</option>
                            </select>
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
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((item, index) => (
                                            <tr key={item.ma_don_hang} className="border-bottom">
                                                <td className="py-3 text-muted">{index + 1}</td>
                                                <td className="py-3 text-dark fw-bold">#{item.ma_don_hang}</td>
                                                <td className="py-3 text-muted">
                                                    {new Date(item.ngay_tao).toLocaleDateString('vi-VN')}
                                                </td>
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
                                            <td colSpan="5" className="text-center py-5 text-muted">Không tìm thấy đơn hàng nào</td>
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