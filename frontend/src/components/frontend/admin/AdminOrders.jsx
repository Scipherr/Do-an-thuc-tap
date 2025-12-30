import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Config hiển thị trạng thái (Kiểu dấu chấm hiện đại)
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

    const fetchOrders = () => {
        fetch('http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/admin_orders.php')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchOrders(); }, []);

    const updateStatus = (id, newStatus) => {
        if (!window.confirm(`Xác nhận đổi trạng thái đơn #${id}?`)) return;
        fetch('http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/update_order.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, status: newStatus })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    alert("✅ Cập nhật thành công!");
                    fetchOrders();
                    if (selectedOrder) setShowModal(false);
                } else {
                    alert("Lỗi: " + data.message);
                }
            });
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-4 rounded-4 shadow-sm">
                <h3 className="fw-bold mb-0 text-dark">📦 Quản Lý Đơn Hàng</h3>
                <p className="text-muted mb-0">Tổng: {orders.length} đơn</p>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light text-secondary">
                                <tr>
                                    <th className="ps-4 py-3">#ID</th>
                                    <th>Khách Hàng</th>
                                    <th>Ngày Đặt</th>
                                    <th>Tổng Tiền</th>
                                    <th>Trạng Thái</th>
                                    <th className="text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => {
                                    const statusConfig = getStatusConfig(order.trang_thai);
                                    return (
                                        <tr key={order.ma_don_hang}>
                                            <td className="ps-4 fw-bold">#{order.ma_don_hang}</td>
                                            <td>
                                                <div className="fw-bold">{order.ho_ten}</div>
                                                <small className="text-muted">{order.email}</small>
                                            </td>
                                            <td>{order.ngay_tao}</td>
                                            <td className="fw-bold text-danger">
                                                {new Intl.NumberFormat('vi-VN').format(order.tong_tien)} ₫
                                            </td>
                                            
                                            {/* --- PHẦN ĐÃ SỬA: KIỂU DẤU CHẤM --- */}
                                            <td>
                                                <div className="d-flex align-items-center p-2 rounded-3" style={{backgroundColor: '#f8f9fa', width: 'fit-content'}}>
                                                    <span className={`rounded-circle ${statusConfig.bg}`} style={{ width: '8px', height: '8px', marginRight: '8px' }}></span>
                                                    <span className={`fw-bold ${statusConfig.color}`} style={{ fontSize: '0.85rem' }}>
                                                        {statusConfig.label}
                                                    </span>
                                                </div>
                                            </td>
                                            {/* --------------------------------- */}

                                            <td className="text-center">
                                                <button className="btn btn-outline-dark btn-sm rounded-3 fw-bold shadow-sm" onClick={() => handleViewDetails(order)}>
                                                    <i className="bi bi-eye me-1"></i>Chi Tiết
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Chi Tiết */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Đơn Hàng #{selectedOrder?.ma_don_hang}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <>
                            {/* ... (Phần nội dung Modal giữ nguyên y cũ của đại ca) ... */}
                            {/* Đệ chỉ giữ khung sườn code Modal ở đây cho gọn, đại ca cứ giữ nguyên ruột bên trong nhé */}
                            
                            {/* DEMO lại phần nút bấm trong Modal để đảm bảo chạy đúng hàm updateStatus */}
                             <div className="d-flex gap-2 mt-4">
                                <Button variant="warning" className="flex-grow-1 fw-bold text-dark" onClick={() => updateStatus(selectedOrder.ma_don_hang, 'Pending')}>⏳ Chờ Xử Lý</Button>
                                <Button variant="primary" className="flex-grow-1 fw-bold" onClick={() => updateStatus(selectedOrder.ma_don_hang, 'Shipping')}>🚚 Đang Giao</Button>
                                <Button variant="success" className="flex-grow-1 fw-bold" onClick={() => updateStatus(selectedOrder.ma_don_hang, 'Completed')}>✅ Hoàn Tất</Button>
                                <Button variant="danger" className="flex-grow-1 fw-bold" onClick={() => updateStatus(selectedOrder.ma_don_hang, 'Cancelled')}>❌ Hủy Đơn</Button>
                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminOrders;