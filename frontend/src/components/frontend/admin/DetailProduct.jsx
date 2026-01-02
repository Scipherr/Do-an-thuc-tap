import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';

const DetailProduct = () => {
    const { id } = useParams();
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    const brandList = [
        "Samsung", "Apple", "Xiaomi", "OPPO", 
        "Sony", "LG", "JBL", "Anker", 
        "Dyson", "Panasonic", "Sharp"
    ];

    const [productInput, setProduct] = useState({
        ma_san_pham: '',
        ma_danh_muc: '',
        ten_san_pham: '',
        slug: '',
        mo_ta: '',
        thuong_hieu: '',
        gia_goc: '',
        gia: '',
        so_luong_ton: '',
    });

    const [specsInput, setSpecsInput] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        
        axios.get('http://127.0.0.1:8000/api/all-categories', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.category);
            }
        });

        axios.get(`http://127.0.0.1:8000/api/product/${id}`).then(res => {
            if (res.data.status === 200) {
                const product = res.data.product;
                
                setProduct({
                    ma_san_pham: product.ma_san_pham,
                    ma_danh_muc: product.ma_danh_muc,
                    ten_san_pham: product.ten_san_pham,
                    slug: product.slug,
                    mo_ta: product.mo_ta,
                    thuong_hieu: product.thuong_hieu,
                    gia_goc: product.gia_goc,
                    gia: product.gia,
                    so_luong_ton: product.so_luong_ton,
                });

                let specs = product.thong_so_ky_thuat;
                if (typeof specs === 'string') {
                    try {
                        specs = JSON.parse(specs);
                    } catch (e) {
                        specs = {};
                    }
                }
                setSpecsInput(specs || {});

                setImagePreview(`http://127.0.0.1:8000/${product.hinh_anh}`);
                
                setLoading(false);
            } else if (res.data.status === 404) {
                alert("Không tìm thấy sản phẩm");
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });

    }, [id]);

    const renderSpecsFields = () => {
        const catID = parseInt(productInput.ma_danh_muc);
        const getVal = (key) => specsInput[key] || '';

        switch(catID) {
            case 1: 
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Màn hình</label>
                            <input type="text" className="form-control" value={getVal('screen')} disabled />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">CPU</label>
                            <input type="text" className="form-control" value={getVal('cpu')} disabled />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-muted">RAM</label>
                            <input type="text" className="form-control" value={getVal('ram')} disabled />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-muted">Bộ nhớ trong</label>
                            <input type="text" className="form-control" value={getVal('storage')} disabled />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-muted">Pin</label>
                            <input type="text" className="form-control" value={getVal('battery')} disabled />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Kích thước màn hình</label>
                            <input type="text" className="form-control" value={getVal('screen_size')} disabled />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Độ phân giải</label>
                            <input type="text" className="form-control" value={getVal('resolution')} disabled />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Công nghệ</label>
                            <input type="text" className="form-control" value={getVal('technology')} disabled />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Tần số quét</label>
                            <input type="text" className="form-control" value={getVal('refresh_rate')} disabled />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Dung tích / Công suất</label>
                            <input type="text" className="form-control" value={getVal('capacity')} disabled />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Loại</label>
                            <input type="text" className="form-control" value={getVal('type')} disabled />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label text-muted">Công nghệ nổi bật</label>
                            <input type="text" className="form-control" value={getVal('technology')} disabled />
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Loại phụ kiện</label>
                            <input type="text" className="form-control" value={getVal('type')} disabled />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Kết nối / Cổng</label>
                            <input type="text" className="form-control" value={getVal('connection')} disabled />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label text-muted">Tính năng khác</label>
                            <input type="text" className="form-control" value={getVal('features')} disabled />
                        </div>
                    </>
                );
            default:
                return <div className="col-12 text-muted fst-italic">Chưa có thông tin kỹ thuật cho danh mục này.</div>;
        }
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
                <div className="spinner-border text-secondary" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
        );
    }

    return (
        <div className="admin-wrapper">
            <AdminSidebar />
            <div className="admin-content px-4 pt-4">
                <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
                    <h3 className="m-0 text-dark fw-light">Chi Tiết Sản Phẩm</h3>
                    <Link to="/admin/products" className="btn btn-dark px-5 py-2 rounded-0">
                        <i className="fas fa-arrow-left me-1"></i> Quay lại
                    </Link>
                </div>
                
                <div className="bg-white p-4 border">
                    <div className="row">
                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Mã Sản Phẩm</label>
                            <input 
                                type="text" 
                                value={productInput.ma_san_pham} 
                                className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-light px-0" 
                                disabled
                            />
                        </div>

                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Danh Mục</label>
                            <select 
                                value={productInput.ma_danh_muc} 
                                className="form-select border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0"
                                disabled
                            >
                                <option value="">Chọn danh mục</option>
                                {
                                    categoryList.map((item) => (
                                        <option value={item.ma_danh_muc} key={item.ma_danh_muc}>{item.ten_danh_muc}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Tên Sản Phẩm</label>
                            <input type="text" value={productInput.ten_san_pham} className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" disabled />
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Slug</label>
                            <input type="text" value={productInput.slug} className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" disabled />
                        </div>

                        <div className="col-md-4 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Giá Gốc</label>
                            <input type="text" value={productInput.gia_goc} className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" disabled />
                        </div>
                        <div className="col-md-4 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Giá Bán</label>
                            <input type="text" value={productInput.gia} className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" disabled />
                        </div>
                        <div className="col-md-4 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Số Lượng Tồn</label>
                            <input type="text" value={productInput.so_luong_ton} className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" disabled />
                        </div>

                        <div className="col-md-12 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Thương Hiệu</label>
                            <select value={productInput.thuong_hieu} className="form-select border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" disabled>
                                <option value="">Chọn thương hiệu</option>
                                {brandList.map((brand, index) => (
                                    <option key={index} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-md-12 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Mô Tả</label>
                            <textarea value={productInput.mo_ta} className="form-control bg-light border-0 p-3" rows="3" disabled></textarea>
                        </div>

                        <div className="col-md-12 mb-4 mt-2">
                            <div className="p-3 bg-light rounded-3">
                                <h6 className="fw-bold text-dark mb-4">Thông Số Kỹ Thuật</h6>
                                <div className="row">
                                    {renderSpecsFields()}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Hình Ảnh</label>
                            
                            {imagePreview ? (
                                <div className="mt-2 text-center border p-3 bg-light">
                                    <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain', borderRadius: '4px' }} />
                                </div>
                            ) : (
                                <div className="mt-2 p-3 bg-light text-muted">Không có hình ảnh</div>
                            )}
                        </div>

                        <div className="col-md-12 form-group mb-5 mt-3 text-end">
                            <Link to={`/admin/edit-product/${id}`} className="btn btn-dark px-5 py-2 rounded-0">
                                CHỈNH SỬA SẢN PHẨM
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;