import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/${id}`).then(res => {
            if(res.data.status === 200) {
                setProduct(res.data.product);
            }
            setLoading(false);
        });
    }, [id]);

    if(loading) return <div className="container py-5">Loading...</div>;
    
    if(!product) return <div className="container py-5">Product not found</div>;

    return (
        <>
            <Header />
            <div className="container py-5" style={{marginTop: '100px'}}>
                <div className="row">
                    <div className="col-md-6">
                        <img src={product.hinh_anh} alt={product.ten_san_pham} className="w-100 shadow rounded" />
                    </div>
                    <div className="col-md-6">
                        <h1 className="mb-3">{product.ten_san_pham}</h1>
                        <h4 className="text-danger mb-3">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.gia)}
                        </h4>
                        <p className="lead">{product.mo_ta}</p>
                        <p>Thương hiệu: {product.thuong_hieu}</p>
                        <button className="btn btn-dark btn-lg mt-3">Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetail;