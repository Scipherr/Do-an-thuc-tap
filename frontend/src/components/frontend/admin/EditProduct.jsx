import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './admin components/AdminSidebar';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryList, setCategoryList] = useState([]);
    const [errorList, setErrorList] = useState({});
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

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

    const [picture, setPicture] = useState({
        file: null,
        preview: null
    });

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

                setPicture({
                    file: null,
                    preview: `http://127.0.0.1:8000/${product.hinh_anh}`
                });
                
                setInitialLoading(false);
            } else if (res.data.status === 404) {
                alert("Không tìm thấy sản phẩm");
                navigate('/admin/view-product');
            }
        }).catch(err => {
            console.log(err);
            setInitialLoading(false);
        });

    }, [id, navigate]);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setProduct({ ...productInput, ma_danh_muc: categoryId });
        setSpecsInput({}); 
    }

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleNameChange = (e) => {
        e.persist();
        const name = e.target.value;
        const slug = name.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-');
            
        setProduct({ 
            ...productInput, 
            ten_san_pham: name,
            slug: slug 
        });
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture({
                file: file,
                preview: URL.createObjectURL(file)
            });
        }
    }

    const handleSpecInput = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    }

    const updateProduct = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('_method', 'PUT'); 
        
        if (picture.file) {
            formData.append('hinh_anh', picture.file);
        }
        
        formData.append('ma_san_pham', productInput.ma_san_pham);
        formData.append('ma_danh_muc', productInput.ma_danh_muc);
        formData.append('ten_san_pham', productInput.ten_san_pham);
        formData.append('slug', productInput.slug);
        formData.append('mo_ta', productInput.mo_ta);
        formData.append('thuong_hieu', productInput.thuong_hieu);
        formData.append('gia_goc', productInput.gia_goc);
        formData.append('gia', productInput.gia);
        formData.append('so_luong_ton', productInput.so_luong_ton);

        Object.keys(specsInput).forEach(key => {
            formData.append(`thong_so_ky_thuat[${key}]`, specsInput[key]);
        });
        
        const token = localStorage.getItem('auth_token');
        
        axios.post(`http://127.0.0.1:8000/api/update-product/${id}`, formData, {
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
            } else if (res.data.status === 404) {
                alert(res.data.message);
                navigate('/admin/view-product');
            } else {
                alert("Đã xảy ra lỗi không xác định");
            }
        }).catch(err => {
            setLoading(false);
            alert("Lỗi kết nối server");
        });
    }

    const renderSpecsFields = () => {
        const catID = parseInt(productInput.ma_danh_muc);
        
        const getVal = (key) => specsInput[key] || '';

        switch(catID) {
            case 1: 
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Màn hình</label>
                            <input type="text" name="screen" onChange={handleSpecInput} value={getVal('screen')} className="form-control" placeholder="VD: 6.8 inch Dynamic AMOLED 2X" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">CPU</label>
                            <input type="text" name="cpu" onChange={handleSpecInput} value={getVal('cpu')} className="form-control" placeholder="VD: Snapdragon 8 Gen 4" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-muted">RAM</label>
                            <input type="text" name="ram" onChange={handleSpecInput} value={getVal('ram')} className="form-control" placeholder="VD: 12GB" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-muted">Bộ nhớ trong</label>
                            <input type="text" name="storage" onChange={handleSpecInput} value={getVal('storage')} className="form-control" placeholder="VD: 512GB" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label text-muted">Pin</label>
                            <input type="text" name="battery" onChange={handleSpecInput} value={getVal('battery')} className="form-control" placeholder="VD: 5000mAh" />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Kích thước màn hình</label>
                            <input type="text" name="screen_size" onChange={handleSpecInput} value={getVal('screen_size')} className="form-control" placeholder="VD: 65 inch" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Độ phân giải</label>
                            <input type="text" name="resolution" onChange={handleSpecInput} value={getVal('resolution')} className="form-control" placeholder="VD: 4K, 8K" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Công nghệ</label>
                            <input type="text" name="technology" onChange={handleSpecInput} value={getVal('technology')} className="form-control" placeholder="VD: OLED, QLED" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Tần số quét</label>
                            <input type="text" name="refresh_rate" onChange={handleSpecInput} value={getVal('refresh_rate')} className="form-control" placeholder="VD: 120Hz" />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Dung tích / Công suất</label>
                            <input type="text" name="capacity" onChange={handleSpecInput} value={getVal('capacity')} className="form-control" placeholder="VD: 600L hoặc 2000W" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Loại</label>
                            <input type="text" name="type" onChange={handleSpecInput} value={getVal('type')} className="form-control" placeholder="VD: Inverter, Cửa trước" />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label text-muted">Công nghệ nổi bật</label>
                            <input type="text" name="technology" onChange={handleSpecInput} value={getVal('technology')} className="form-control" placeholder="VD: Diet khuan Blue Ag+" />
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Loại phụ kiện</label>
                            <input type="text" name="type" onChange={handleSpecInput} value={getVal('type')} className="form-control" placeholder="VD: Tai nghe, Sạc dự phòng" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Kết nối / Cổng</label>
                            <input type="text" name="connection" onChange={handleSpecInput} value={getVal('connection')} className="form-control" placeholder="VD: USB-C, Bluetooth 5.3" />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label text-muted">Tính năng khác</label>
                            <input type="text" name="features" onChange={handleSpecInput} value={getVal('features')} className="form-control" placeholder="VD: Chống ồn, Sạc nhanh" />
                        </div>
                    </>
                );
            default:
                return <div className="col-12 text-muted fst-italic">Vui lòng chọn danh mục để nhập thông số kỹ thuật.</div>;
        }
    }

    if (initialLoading) {
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
                    <h3 className="m-0 text-dark fw-light">Cập Nhật Sản Phẩm</h3>
                    <Link to="/admin/products" className="btn btn-link text-decoration-none text-secondary">
                        <i className="fas fa-arrow-left me-1"></i> Quay lại
                    </Link>
                </div>
                
                <form onSubmit={updateProduct} encType="multipart/form-data" className="bg-white p-4 border">
                    <div className="row">
                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Mã Sản Phẩm</label>
                            <input 
                                type="text" 
                                name="ma_san_pham" 
                                value={productInput.ma_san_pham} 
                                className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-light px-0" 
                                readOnly 
                                disabled
                            />
                            <small className="text-muted fst-italic">Không thể chỉnh sửa mã sản phẩm</small>
                        </div>

                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Danh Mục</label>
                            <select name="ma_danh_muc" onChange={handleCategoryChange} value={productInput.ma_danh_muc} className={`form-select border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0 ${errorList.ma_danh_muc ? 'is-invalid' : ''}`}>
                                <option value="">Chọn danh mục</option>
                                {
                                    categoryList.map((item) => (
                                        <option value={item.ma_danh_muc} key={item.ma_danh_muc}>{item.ten_danh_muc}</option>
                                    ))
                                }
                            </select>
                            <small className="text-danger">{errorList.ma_danh_muc}</small>
                        </div>

                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Tên Sản Phẩm</label>
                            <input type="text" name="ten_san_pham" onChange={handleNameChange} value={productInput.ten_san_pham} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0 ${errorList.ten_san_pham ? 'is-invalid' : ''}`} />
                            <small className="text-danger">{errorList.ten_san_pham}</small>
                        </div>
                        <div className="col-md-6 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0 ${errorList.slug ? 'is-invalid' : ''}`} />
                            <small className="text-danger">{errorList.slug}</small>
                        </div>

                        <div className="col-md-4 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Giá Gốc</label>
                            <input type="number" name="gia_goc" onChange={handleInput} value={productInput.gia_goc} className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" />
                        </div>
                        <div className="col-md-4 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Giá Bán</label>
                            <input type="number" name="gia" onChange={handleInput} value={productInput.gia} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0 ${errorList.gia ? 'is-invalid' : ''}`} />
                            <small className="text-danger">{errorList.gia}</small>
                        </div>
                        <div className="col-md-4 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Số Lượng Tồn</label>
                            <input type="number" name="so_luong_ton" onChange={handleInput} value={productInput.so_luong_ton} className="form-control border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0" />
                        </div>

                        <div className="col-md-12 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Thương Hiệu</label>
                            <select name="thuong_hieu" onChange={handleInput} value={productInput.thuong_hieu} className="form-select border-top-0 border-start-0 border-end-0 rounded-0 bg-transparent px-0">
                                <option value="">Chọn thương hiệu</option>
                                {brandList.map((brand, index) => (
                                    <option key={index} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-md-12 form-group mb-4">
                            <label className="form-label text-secondary small text-uppercase">Mô Tả</label>
                            <textarea name="mo_ta" onChange={handleInput} value={productInput.mo_ta} className="form-control bg-light border-0 p-3" rows="3"></textarea>
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
                            <input type="file" name="hinh_anh" onChange={handleImage} className={`form-control ${errorList.hinh_anh ? 'is-invalid' : ''}`} />
                            <small className="text-danger">{errorList.hinh_anh}</small>
                            <small className="text-muted d-block mt-1">Chọn ảnh mới để thay thế ảnh hiện tại</small>
                            
                            {picture.preview && (
                                <div className="mt-3">
                                    <p className="small text-muted mb-1">Ảnh hiện tại / Preview:</p>
                                    <img src={picture.preview} alt="Preview" style={{ maxWidth: '200px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                </div>
                            )}
                        </div>

                        <div className="col-md-12 form-group mb-5 mt-3 text-end">
                            <button type="submit" className="btn btn-dark px-5 py-2 rounded-0" disabled={loading}>
                                {loading ? 'Đang cập nhật...' : 'CẬP NHẬT SẢN PHẨM'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;