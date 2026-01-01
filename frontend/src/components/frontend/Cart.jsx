import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './common/Header';
import Footer from './common/Footer';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2'; 

const Cart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Format currency
    const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    useEffect(() => {
        // Check if user is logged in
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
                // FIX 1: Filter out items where product is null (orphaned cart items)
                const validCartItems = res.data.cart.filter(item => item.product !== null);
                setCart(validCartItems);
                
                // Optional: Recalculate total immediately based on valid items
                // setTotalPrice(res.data.total_price); 
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
                fetchCart(); // Refresh cart to update totals
            } else {
                Swal.fire('Lỗi', res.data.message, 'error');
            }
        });
    };

    const deleteCartItem = (cart_id) => {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: "Sản phẩm sẽ bị xóa khỏi giỏ hàng!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xóa đi!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/delete-cartitem/${cart_id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
                }).then(res => {
                    if (res.data.status === 200) {
                        fetchCart();
                        Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success');
                    } else {
                        Swal.fire('Lỗi', res.data.message, 'error');
                    }
                });
            }
        });
    };

    // FIX 2: Calculate total safely by checking if item.product exists
    const calculateTotal = () => {
        return cart.reduce((sum, item) => {
            if (!item.product) return sum;
            return sum + (item.product.gia * item.product_qty);
        }, 0);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            
            <div className="container py-5" style={{minHeight: '60vh'}}>
                <div className="row mb-4">
                    <div className="col-12">
                        <h2 className="fw-bold mb-0">Giỏ hàng của bạn</h2>
                        <p className="text-muted">{cart.length} sản phẩm trong giỏ</p>
                    </div>
                </div>

                {cart.length > 0 ? (
                    <div className="row g-5">
                        {/* Cart Items List */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table align-middle mb-0">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th className="border-0 p-3 ps-4">Sản phẩm</th>
                                                    <th className="border-0 p-3 text-center">Đơn giá</th>
                                                    <th className="border-0 p-3 text-center">Số lượng</th>
                                                    <th className="border-0 p-3 text-end">Tổng</th>
                                                    <th className="border-0 p-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => {
                                                    // FIX 3: Don't render if product is null to prevent crash
                                                    if (!item.product) return null;

                                                    return (
                                                        <tr key={item.id}>
                                                            <td className="p-3 ps-4">
                                                                <div className="d-flex align-items-center gap-3">
                                                                    <img 
                                                                        src={`http://127.0.0.1:8000/${item.product.hinh_anh}`} 
                                                                        alt={item.product.ten_san_pham} 
                                                                        className="rounded-3"
                                                                        style={{width: '60px', height: '60px', objectFit: 'cover'}}
                                                                    />
                                                                    <div>
                                                                        <h6 className="mb-0 fw-bold text-dark text-decoration-none">
                                                                            {item.product.ten_san_pham}
                                                                        </h6>
                                                                        <small className="text-muted">Mã: {item.product.ma_san_pham}</small>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center p-3 text-muted">
                                                                {formatPrice(item.product.gia)}
                                                            </td>
                                                            <td className="p-3">
                                                                <div className="d-flex justify-content-center align-items-center gap-2">
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center"
                                                                        style={{width: '28px', height: '28px'}}
                                                                        onClick={() => updateQuantity(item.id, 'dec')}
                                                                    >
                                                                        <Minus size={14} />
                                                                    </button>
                                                                    <span className="fw-bold" style={{minWidth: '20px', textAlign: 'center'}}>
                                                                        {item.product_qty}
                                                                    </span>
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center"
                                                                        style={{width: '28px', height: '28px'}}
                                                                        onClick={() => updateQuantity(item.id, 'inc')}
                                                                    >
                                                                        <Plus size={14} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="text-end p-3 fw-bold">
                                                                {formatPrice(item.product.gia * item.product_qty)}
                                                            </td>
                                                            <td className="p-3 text-end pe-4">
                                                                <button 
                                                                    onClick={() => deleteCartItem(item.id)} 
                                                                    className="btn btn-link text-danger p-0"
                                                                >
                                                                    <Trash2 size={18} />
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
                        </div>

                        {/* Order Summary */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 bg-light">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4">Tổng quan đơn hàng</h5>
                                    
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Tạm tính</span>
                                        <span className="fw-bold">{formatPrice(calculateTotal())}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <span className="text-muted">Phí vận chuyển</span>
                                        <span className="text-success">Miễn phí</span>
                                    </div>
                                    
                                    <hr className="my-3 text-muted" />
                                    
                                    <div className="d-flex justify-content-between mb-4">
                                        <span className="fw-bold fs-5">Tổng cộng</span>
                                        <span className="fw-bold fs-5 text-primary">{formatPrice(calculateTotal())}</span>
                                    </div>

                                    <button className="btn btn-dark w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2">
                                        Tiến hành thanh toán <ArrowRight size={18} />
                                    </button>
                                    
                                    <div className="mt-4 text-center">
                                        <Link to="/" className="text-muted text-decoration-none small">
                                            <ArrowRight size={14} className="me-1" style={{transform: 'rotate(180deg)'}}/>
                                            Tiếp tục mua sắm
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <ShoppingBag size={80} className="text-muted opacity-25" />
                        </div>
                        <h3 className="fw-bold">Giỏ hàng trống</h3>
                        <p className="text-muted mb-4">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                        <Link to="/" className="btn btn-dark rounded-pill px-5 py-3 fw-bold">
                            Bắt đầu mua sắm
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default Cart;