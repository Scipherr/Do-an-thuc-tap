import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../assets/css/admin.css'; 
import AdminSidebar from './admin components/AdminSidebar';

const ViewProduct = () => {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        axios.get('http://127.0.0.1:8000/api/view-product', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if(res.data.status === 200) {
                setProduct(res.data.products);
                setLoading(false);
            }
        });
    }, []);

    var display_ProductData = "";
    if(loading) {
        display_ProductData = <tr><td colSpan="6" className="text-center">Loading Products...</td></tr>;
    } else {
        display_ProductData = viewProduct.map((item) => {
            return (
                <tr key={item.ma_san_pham}>
                    <td>{item.ma_san_pham}</td>
                    <td>{item.ma_danh_muc}</td>
                    <td>{item.ten_san_pham}</td>
                    <td>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}
                    </td>
                    <td>
                        <img src={`http://127.0.0.1:8000${item.hinh_anh}`} width="50px" alt={item.ten_san_pham} />
                    </td>
                    <td>
                        <Link to={`/admin/edit-product/${item.ma_san_pham}`} className="btn btn-success btn-sm me-2">Sửa</Link>
                        <button type="button" className="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="admin-wrapper">
             {/* Sidebar (You should probably move this to a separate component to avoid repeating code) */}
            <AdminSidebar />

            <div className="admin-content">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm">Thêm sản phẩm</Link>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Mã sản phẩm</th>
                                        <th>Mã danh mục</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Hình ảnh</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {display_ProductData}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;