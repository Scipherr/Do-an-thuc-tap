import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './common/Header';
import Footer from './common/Footer';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, X } from 'lucide-react';
import Swal from 'sweetalert2'; 

const Cart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    
    // Format currency
    const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/loginad');
            Swal.fire('Chú ý', 'Vui lòng đăng nhập để xem giỏ hàng', 'warning');
        } else {
            fetchCart();
        }
    }, []);

    const fetchCart = () => {
        axios.get(`http://127.0.0.1:8000/api/cart`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(res => {
            if (res.data.status === 200) {
                const validCartItems = res.data.cart.filter(item => item.product !== null);
                setCart(validCartItems);
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.error(err);
        });
    };

    const updateQuantity = (cart_id, scope) => {
        axios.put(`http://127.0.0.1:8000/api/cart-updatequantity/${cart_id}/${scope}`, {}, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(res => {
            if (res.data.status === 200) {
                fetchCart(); 
            }
        });
    };

    const deleteCartItem = (cart_id) => {
        // Minimalist confirmation
        Swal.fire({
            text: "Xóa sản phẩm này?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/delete-cartitem/${cart_id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
                }).then(res => {
                    if (res.data.status === 200) {
                        fetchCart();
                    }
                });
            }
        });
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => {
            if (!item.product) return sum;
            return sum + (item.product.gia * item.product_qty);
        }, 0);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh', background: '#fff'}}>
                <div className="spinner-grow text-dark" role="status" style={{width: '2rem', height: '2rem'}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            
            <div className="container py-5" style={{ minHeight: '80vh' }}>
               
                <div className="d-flex align-items-end justify-content-between mb-5">
                    <h1 className="display-5 fw-bold mb-0" style={{letterSpacing: '-1px'}}>Giỏ Hàng</h1>
                    <span className="text-muted">{cart.length} items</span>
                </div>

                {cart.length > 0 ? (
                    <div className="row g-5">
                      
                        <div className="col-lg-8">
                            <div className="d-flex flex-column gap-4">
                                {cart.map((item) => {
                                    if (!item.product) return null;
                                    return (
                                        <div key={item.id} className="d-flex gap-4 align-items-center border-bottom pb-4">
                                            
                                            <Link to={`/collections/all/products/${item.product.ma_san_pham}`}>
                                                <img 
                                                    src={`http://127.0.0.1:8000/${item.product.hinh_anh}`} 
                                                    alt={item.product.ten_san_pham} 
                                                    className="rounded-4"
                                                    style={{width: '120px', height: '120px', objectFit: 'cover', background: '#f8f9fa'}}
                                                />
                                            </Link>

                                            
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <h5 className="fw-bold mb-1 text-dark">{item.product.ten_san_pham}</h5>
                                                        <p className="text-muted small mb-0">{item.product.thuong_hieu}</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => deleteCartItem(item.id)} 
                                                        className="btn btn-link text-muted p-0 opacity-50 hover-opacity-100"
                                                    >
                                                        <X size={24} />
                                                    </button>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-end mt-3">
                                                    <div className="d-flex align-items-center bg-light rounded-pill px-2 py-1">
                                                        <button 
                                                            className="btn btn-sm rounded-circle p-1 d-flex align-items-center"
                                                            onClick={() => updateQuantity(item.id, 'dec')}
                                                            disabled={item.product_qty <= 1}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="mx-3 fw-bold small" style={{minWidth: '15px', textAlign: 'center'}}>
                                                            {item.product_qty}
                                                        </span>
                                                        <button 
                                                            className="btn btn-sm rounded-circle p-1 d-flex align-items-center"
                                                            onClick={() => updateQuantity(item.id, 'inc')}
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="mb-0 fw-bold fs-5">{formatPrice(item.product.gia * item.product_qty)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                       
                        <div className="col-lg-4">
                            <div className="bg-light rounded-5 p-4 " style={{top: '120px'}}>
                                <h4 className="fw-bold mb-4">Tổng giỏ hàng</h4>
                                
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Tổng giá trị</span>
                                    <span className="fw-bold">{formatPrice(calculateTotal())}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Shipping</span>
                                    <span className="text-success">Free</span>
                                </div>
                                
                                <hr className="my-4 opacity-10" />
                                
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5">Total</span>
                                    <span className="fw-bold fs-5">{formatPrice(calculateTotal())}</span>
                                </div>

                                <button className="btn btn-dark w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2">
                                    Thanh toán <ArrowRight size={18} />
                                </button>
                                
                                <div className="mt-4 text-center">
                                    <Link to="/" className="text-muted text-decoration-none small hover-underline">
                                        Tiếp tục mua hàng
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <div className="mb-4 p-4 rounded-circle bg-light d-inline-block">
                            <ShoppingBag size={40} className="text-muted opacity-50" />
                        </div>
                        <h3 className="fw-bold mb-3">Your bag is empty</h3>
                        <p className="text-muted mb-4">Looks like you haven't added anything yet.</p>
                        <Link to="/" className="btn btn-dark rounded-pill px-5 py-3 fw-bold">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;