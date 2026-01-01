import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Star, Heart, Minus, Plus, Truck, ShieldCheck } from 'lucide-react';

import Header from './common/Header';
import Footer from './common/Footer';


import '../../assets/css/style.scss';
import '../../assets/css/productdetail.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);

    
    useEffect(() => {
        let isMounted = true;
        
        axios.get(`http://127.0.0.1:8000/api/product/${id}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    const prod = res.data.product;
                    setProduct(prod);
                    setMainImage(prod.hinh_anh);
                }
                setLoading(false);
            }
        }).catch(err => {
            if (isMounted) {
                console.error("Error fetching product:", err);
                setLoading(false);
            }
        });

        return () => { isMounted = false };
    }, [id]);

    
    const handleAddToCart = (e) => {
        e.preventDefault();

      
        if (!localStorage.getItem('auth_token')) {
            Swal.fire({
                title: 'Chưa đăng nhập',
                text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Đăng nhập',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) navigate('/loginad');
            });
            return;
        }
        
        const data = {
            product_id: product.ma_san_pham,
            product_qty: quantity,
        };

        axios.post(`http://127.0.0.1:8000/api/add-to-cart`, data, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(res => {
            if (res.data.status === 201) {
                // SUCCESS
                Swal.fire({
                    title: 'Thành công',
                    text: res.data.message,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

                
                window.dispatchEvent(new Event('cart-updated'));
                
            } else if (res.data.status === 409) {
               
                Swal.fire('Thông báo', res.data.message, 'warning');
            } else if (res.data.status === 401) {
               
                Swal.fire({
                    title: 'Lỗi',
                    text: res.data.message,
                    icon: 'error'
                });
                navigate('/loginad');
            } else if (res.data.status === 404) {
               
                Swal.fire('Lỗi', res.data.message, 'error');
            }
        }).catch(err => {
           
            Swal.fire('Lỗi', 'Có lỗi xảy ra phía server. Vui lòng thử lại sau.', 'error');
        });
    }

    
    const getImageUrl = (path) => {
        if (!path) return 'https://placehold.co/500x500?text=No+Image';
        return path.startsWith('http') || path.startsWith('/') ? path : `/${path}`;
    };

    const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    // Render Loading / Error states
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    
    if (!product) return (
        <>
            <Header />
            <div className="container py-5 text-center" style={{minHeight:'60vh'}}>
                <h2>Sản phẩm không tồn tại</h2>
                <Link to="/" className="btn btn-dark mt-3">Quay lại trang chủ</Link>
            </div>
            <Footer />
        </>
    );

    // Parse JSON fields safely
    const galleryImages = Array.isArray(product.anh_chi_tiet) ? product.anh_chi_tiet : JSON.parse(product.anh_chi_tiet || '[]');
    const specs = typeof product.thong_so_ky_thuat === 'object' ? product.thong_so_ky_thuat : JSON.parse(product.thong_so_ky_thuat || '{}');

    return (
        <>
            <Header />
            
            <div className="product-minimal-page">
                {/* Minimal Breadcrumb */}
                <div className="container mt-4 mb-5">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb small text-uppercase text-muted">
                            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{product.ten_san_pham}</li>
                        </ol>
                    </nav>
                </div>

                <div className="container mb-5">
                    <div className="row g-5">
                        {/* LEFT: Image Gallery */}
                        <div className="col-lg-7">
                            <div className="main-image-minimal mb-4">
                                <img src={getImageUrl(mainImage)} alt={product.ten_san_pham} />
                            </div>
                            
                            {galleryImages.length > 0 && (
                                <div className="gallery-grid">
                                    <div 
                                        className={`gallery-thumb ${mainImage === product.hinh_anh ? 'active' : ''}`}
                                        onClick={() => setMainImage(product.hinh_anh)}
                                    >
                                        <img src={getImageUrl(product.hinh_anh)} alt="Main" />
                                    </div>
                                    {galleryImages.map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`gallery-thumb ${mainImage === img ? 'active' : ''}`}
                                            onClick={() => setMainImage(img)}
                                        >
                                            <img src={getImageUrl(img)} alt={`Thumb ${idx}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT: Product Info */}
                        <div className="col-lg-5">
                            <div className="product-info-minimal sticky-top" style={{top: '100px'}}>
                                <h6 className="text-muted text-uppercase small ls-2 mb-2">{product.thuong_hieu}</h6>
                                <h1 className="display-6 fw-bold mb-3">{product.ten_san_pham}</h1>
                                
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <span className="fw-bold">{product.diem_danh_gia || 5.0}</span>
                                    <Star size={16} fill="#000" strokeWidth={0} />
                                    <span className="text-muted ms-2 small text-decoration-underline">
                                        {product.so_luot_danh_gia || 0} reviews
                                    </span>
                                </div>

                                <div className="price-minimal mb-4">
                                    <span className="current">{formatPrice(product.gia)}</span>
                                    {product.gia_goc > product.gia && (
                                        <span className="original">{formatPrice(product.gia_goc)}</span>
                                    )}
                                </div>

                                <p className="desc-text mb-4">{product.mo_ta}</p>

                                {/* Specs Preview */}
                                {specs && Object.keys(specs).length > 0 && (
                                    <div className="specs-minimal mb-5">
                                        {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                                            <div className="spec-item" key={key}>
                                                <span className="label text-capitalize">{key.replace(/_/g, ' ')}</span>
                                                <span className="value">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="actions-minimal">
                                    <div className="qty-minimal">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} type="button">
                                            <Minus size={16}/>
                                        </button>
                                        <span>{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)} type="button">
                                            <Plus size={16}/>
                                        </button>
                                    </div>
                                   <button className="btn-add-minimal" onClick={handleAddToCart}>
                                        Thêm vào giỏ - {formatPrice(product.gia * quantity)}
                                    </button>
                                    <button className="btn-wishlist"><Heart size={20}/></button>
                                </div>

                                <div className="trust-badges mt-4 pt-4 border-top">
                                    <div className="badge-item"><Truck size={18}/> Free Shipping</div>
                                    <div className="badge-item"><ShieldCheck size={18}/> Official Warranty</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM: Full Specs Table */}
                    <div className="row mt-5 pt-5">
                        <div className="col-lg-8 mx-auto">
                            <h4 className="mb-4 fw-bold">Thông số kỹ thuật</h4>
                            <div className="table-responsive">
                                <table className="table table-borderless table-minimal">
                                    <tbody>
                                        {specs && Object.entries(specs).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className="text-muted text-capitalize" style={{width: '35%'}}>
                                                    {key.replace(/_/g, ' ')}
                                                </td>
                                                <td className="fw-medium">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetail;