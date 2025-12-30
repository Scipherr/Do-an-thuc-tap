import React, { useEffect, useState } from 'react';

const AdminKhoMoi = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm gọi API mới
    const loadData = () => {
        setLoading(true);
       
        fetch('http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/api_kho_new.php')
            .then(res => res.json())
            .then(data => {
                console.log("Dữ liệu về:", data); 
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    // Hàm xóa
    const handleDelete = (id) => {
        if(window.confirm("Xóa thật chứ?")) {
            fetch(`http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/api_kho_new.php?id=${id}`, { method: 'DELETE' })
            .then(() => loadData());
        }
    }

    return (
        <div className="container-fluid p-4" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">📦 QUẢN LÝ KHO (GIAO DIỆN MỚI)</h2>
                <button className="btn btn-primary btn-lg rounded-pill px-4" onClick={loadData}>
                    <i className="bi bi-arrow-clockwise me-2"></i> Tải lại
                </button>
            </div>

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light" style={{height: '60px'}}>
                                <tr className="text-uppercase small fw-bold text-secondary">
                                    <th className="ps-4">Sản phẩm</th>
                                    <th>Giá bán</th>
                                    <th className="text-center">Tồn kho (Quan trọng)</th>
                                    <th className="text-end pe-4">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-5">Đang tải dữ liệu...</td></tr>
                                ) : products.map((sp) => (
                                    <tr key={sp.id} style={{height: '80px'}}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center">
                                                <img 
                                                    src={sp.image} 
                                                    alt="" 
                                                    className="rounded-3 shadow-sm border" 
                                                    width="60" height="60" 
                                                    style={{objectFit: 'cover'}}
                                                    onError={(e) => e.target.src = 'https://via.placeholder.com/60'}
                                                />
                                                <div className="ms-3">
                                                    <h6 className="fw-bold mb-1 text-dark">{sp.name}</h6>
                                                    <small className="text-muted">ID: {sp.id}</small>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="fw-bold text-primary">
                                            {new Intl.NumberFormat('vi-VN').format(sp.price)} đ
                                        </td>

                                        {/* --- CỘT TỒN KHO: ĐỆ ĐÃ FIX ĐỂ NÓ HIỆN RÕ MỒN MỘT --- */}
                                        <td className="text-center">
                                            {sp.stock > 0 ? (
                                                <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                                                    Còn {sp.stock} cái
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
                                                    Hết hàng (0)
                                                </span>
                                            )}
                                        </td>

                                        <td className="text-end pe-4">
                                            <button 
                                                className="btn btn-outline-danger btn-sm rounded-circle p-2"
                                                onClick={() => handleDelete(sp.id)}
                                                title="Xóa"
                                            >
                                                <i className="bi bi-trash fs-6"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminKhoMoi;