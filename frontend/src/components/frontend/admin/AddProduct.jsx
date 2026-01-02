import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';

const AddProduct = () => {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [errorList, setErrorList] = useState({});
    const [loading, setLoading] = useState(false);

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
        trang_thai: 1,
        noi_bat: 0,
    });

    const [picture, setPicture] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        axios.get('http://127.0.0.1:8000/api/all-categories', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.category);
            }
        });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleCheckbox = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.checked ? 1 : 0 });
    }

    const handleImage = (e) => {
        setPicture(e.target.files[0]);
    }

    const submitProduct = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('hinh_anh', picture);
        formData.append('ma_san_pham', productInput.ma_san_pham);
        formData.append('ma_danh_muc', productInput.ma_danh_muc);
        formData.append('ten_san_pham', productInput.ten_san_pham);
        formData.append('slug', productInput.slug);
        formData.append('mo_ta', productInput.mo_ta);
        formData.append('thuong_hieu', productInput.thuong_hieu);
        formData.append('gia_goc', productInput.gia_goc);
        formData.append('gia', productInput.gia);
        formData.append('so_luong_ton', productInput.so_luong_ton);
        formData.append('trang_thai', productInput.trang_thai);
        formData.append('noi_bat', productInput.noi_bat);

        const token = localStorage.getItem('auth_token');
        axios.post('http://127.0.0.1:8000/api/add-product', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            setLoading(false);
            if (res.data.status === 200) {
                alert(res.data.message);
                setErrorList({});
                navigate('/admin/view-product');
            } else if (res.data.status === 422) {
                setErrorList(res.data.errors);
            }
        });
    }

    return (
        <div className="admin-wrapper">
            <AdminSidebar />
            <div className="admin-content px-4 pt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-dark">Thêm Sản Phẩm Mới</h4>
                    <Link to="/admin/view-product" className="btn btn-outline-secondary btn-sm">Quay lại</Link>
                </div>
                
                <form onSubmit={submitProduct} encType="multipart/form-data">
                    <div className="row">
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Mã Sản Phẩm</label>
                            <input type="text" name="ma_san_pham" onChange={handleInput} value={productInput.ma_san_pham} className="form-control" />
                            <small className="text-danger">{errorList.ma_san_pham}</small>
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Danh Mục</label>
                            <select name="ma_danh_muc" onChange={handleInput} value={productInput.ma_danh_muc} className="form-control">
                                <option>Chọn danh mục</option>
                                {
                                    categoryList.map((item) => {
                                        return (
                                            <option value={item.ma_danh_muc} key={item.ma_danh_muc}>{item.ten_danh_muc}</option>
                                        )
                                    })
                                }
                            </select>
                            <small className="text-danger">{errorList.ma_danh_muc}</small>
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Tên Sản Phẩm</label>
                            <input type="text" name="ten_san_pham" onChange={handleInput} value={productInput.ten_san_pham} className="form-control" />
                            <small className="text-danger">{errorList.ten_san_pham}</small>
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                            <small className="text-danger">{errorList.slug}</small>
                        </div>
                        <div className="col-md-12 form-group mb-3">
                            <label className="mb-1 text-muted">Mô Tả</label>
                            <textarea name="mo_ta" onChange={handleInput} value={productInput.mo_ta} className="form-control" rows="3"></textarea>
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Thương Hiệu</label>
                            <input type="text" name="thuong_hieu" onChange={handleInput} value={productInput.thuong_hieu} className="form-control" />
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Số Lượng Tồn</label>
                            <input type="number" name="so_luong_ton" onChange={handleInput} value={productInput.so_luong_ton} className="form-control" />
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Giá Gốc</label>
                            <input type="number" name="gia_goc" onChange={handleInput} value={productInput.gia_goc} className="form-control" />
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Giá Bán</label>
                            <input type="number" name="gia" onChange={handleInput} value={productInput.gia} className="form-control" />
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label className="mb-1 text-muted">Hình Ảnh</label>
                            <input type="file" name="hinh_anh" onChange={handleImage} className="form-control" />
                            <small className="text-danger">{errorList.hinh_anh}</small>
                        </div>
                        
                        
                        <div className="col-md-12 form-group mb-3">
                            <button type="submit" className="btn btn-primary px-4 mt-2" disabled={loading}>
                                {loading ? 'Đang xử lý...' : 'Thêm Sản Phẩm'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;