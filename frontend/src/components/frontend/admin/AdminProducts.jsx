import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../assets/css/admin.css'; 
import AdminSidebar from './admin components/AdminSidebar';

const ViewProduct = () => {
    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'ma_san_pham', direction: 'desc' });

    useEffect(() => {
        document.title = "Quản Lý Sản Phẩm";
        const token = localStorage.getItem('auth_token');
        
        const fetchProducts = axios.get('http://127.0.0.1:8000/api/view-product', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const fetchCategories = axios.get('http://127.0.0.1:8000/api/all-categories', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        Promise.all([fetchProducts, fetchCategories]).then(([resProd, resCat]) => {
            if(resProd.data.status === 200) setProduct(resProd.data.products);
            if(resCat.data.status === 200) setCategories(resCat.data.category);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });

    }, []);

   
    const deleteProduct = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        

        if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            const token = localStorage.getItem('auth_token');
            axios.delete(`http://127.0.0.1:8000/api/delete-product/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                if(res.data.status === 200) {
                    
                    setProduct(prev => prev.filter(item => item.ma_san_pham !== id));
                    alert(res.data.message);
                } else if(res.data.status === 404) {
                    alert(res.data.message);
                }
            })
            .catch(err => alert("Có lỗi xảy ra khi xóa sản phẩm"));
        }
    }

    const getCategoryName = (id) => {
        const cat = categories.find(c => String(c.ma_danh_muc) === String(id));
        return cat ? cat.ten_danh_muc : id;
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const filteredProducts = useMemo(() => {
        let data = [...viewProduct];
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            data = data.filter(item => {
                const categoryName = getCategoryName(item.ma_danh_muc).toString().toLowerCase();
                return (
                    item.ten_san_pham.toLowerCase().includes(lowerTerm) ||
                    String(item.ma_san_pham).toLowerCase().includes(lowerTerm) ||
                    categoryName.includes(lowerTerm)
                );
            });
        }
        if (sortConfig.key) {
            data.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (sortConfig.key === 'ma_danh_muc') {
                    aValue = getCategoryName(a.ma_danh_muc).toLowerCase();
                    bValue = getCategoryName(b.ma_danh_muc).toLowerCase();
                } else if (['gia', 'so_luong_ton'].includes(sortConfig.key)) {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [viewProduct, categories, searchTerm, sortConfig]);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <span className="text-muted small ms-1">↕</span>;
        return sortConfig.direction === 'asc' ? <span className="ms-1">↑</span> : <span className="ms-1">↓</span>;
    };

    if(loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
                <div className="spinner-border text-secondary" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
        );
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-5">
                <div className="mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-light text-uppercase tracking-wide">Quản Lý Sản Phẩm</h5>
                    <Link to="/admin/add-product" className="btn btn-sm btn-dark rounded-0 text-uppercase" style={{ letterSpacing: '1px' }}>Thêm sản phẩm</Link>
                </div>

                <div className="mb-4">
                    <input 
                        type="text" 
                        className="form-control border-0 border-bottom rounded-0 ps-0" 
                        placeholder="Tìm kiếm theo Tên, Mã SP hoặc Danh Mục..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ maxWidth: '400px', fontSize: '0.9rem' }}
                    />
                </div>

                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                            <tr>
                                <th className="py-3 fw-normal border-bottom cursor-pointer" onClick={() => requestSort('ma_san_pham')}>Mã SP {getSortIcon('ma_san_pham')}</th>
                                <th className="py-3 fw-normal border-bottom cursor-pointer" onClick={() => requestSort('ma_danh_muc')}>Danh mục {getSortIcon('ma_danh_muc')}</th>
                                <th className="py-3 fw-normal border-bottom cursor-pointer" onClick={() => requestSort('ten_san_pham')}>Tên sản phẩm {getSortIcon('ten_san_pham')}</th>
                                <th className="py-3 fw-normal border-bottom cursor-pointer" onClick={() => requestSort('gia')}>Giá {getSortIcon('gia')}</th>
                                <th className="py-3 fw-normal border-bottom cursor-pointer" onClick={() => requestSort('so_luong_ton')}>Tồn kho {getSortIcon('so_luong_ton')}</th>
                                <th className="py-3 fw-normal border-bottom text-end">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((item) => (
                                    <tr key={item.ma_san_pham} style={{ fontSize: '0.95rem' }}>
                                        <td className="py-3 text-muted">#{item.ma_san_pham}</td>
                                        <td className="py-3 text-primary">{getCategoryName(item.ma_danh_muc)}</td>
                                        <td className="py-3 fw-medium">{item.ten_san_pham}</td>
                                        <td className="py-3">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}
                                        </td>
                                        <td className="py-3 ps-4">{item.so_luong_ton}</td>
                                        <td className="py-3 text-end">
                                            <Link to={`/admin/edit-product/${item.ma_san_pham}`} className="btn btn-sm btn-outline-success me-2" style={{ fontSize: '0.85rem' }}>Sửa</Link>
                                            
                                            
                                            <button 
                                                type="button" 
                                                onClick={(e) => deleteProduct(e, item.ma_san_pham)}
                                                className="btn btn-sm btn-outline-danger" 
                                                style={{ fontSize: '0.85rem' }}
                                            >
                                                Xóa
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted fw-light">Không tìm thấy sản phẩm nào phù hợp.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;