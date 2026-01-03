import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './common/Header';
import Footer from './common/Footer';
import { MapPin, Phone, Mail, User, CreditCard } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const [checkoutInput, setCheckoutInput] = useState({
        ho_ten: '',
        so_dien_thoai: '',
        email: '',
        duong: '',
        thanh_pho: '',
        tinh_thanh: '',
    });

    // State for Bank Card Information
    const [bankInfo, setBankInfo] = useState({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvv: ''
    });
    
    const [paymentMode, setPaymentMode] = useState('COD');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/loginad');
            Swal.fire('Warning', 'Login to checkout', 'error');
        } else {
            // Fetch Cart
            axios.get(`http://127.0.0.1:8000/api/cart`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
            }).then(res => {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    let total = 0;
                    res.data.cart.forEach(item => {
                        if(item.product) {
                            total += item.product.gia * item.so_luong;
                        }
                    });
                    setTotalPrice(total);
                }
                setLoading(false);
            });

            // Fetch User Profile - FIXED DATA MAPPING HERE
            axios.get(`http://127.0.0.1:8000/api/user-profile`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
            }).then(res => {
                if (res.data.status === 200) {
                    setCheckoutInput(prev => ({
                        ...prev,
                        // Correctly map Vietnamese DB columns to state
                        ho_ten: res.data.user.ho_ten || '',
                        email: res.data.user.email || '',
                        so_dien_thoai: res.data.user.so_dien_thoai || '',
                        duong: res.data.user.duong || '',
                        thanh_pho: res.data.user.thanh_pho || '',
                        tinh_thanh: res.data.user.tinh_thanh || '',
                    }));
                }
            });
        }
    }, [navigate]);

    const handleInput = (e) => {
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    };

    const handleBankInput = (e) => {
        setBankInfo({ ...bankInfo, [e.target.name]: e.target.value });
    };

    const submitOrder = (e) => {
        e.preventDefault();
        
        const data = {
            ...checkoutInput,
            payment_mode: paymentMode,
            ...(paymentMode === 'Bank Transfer' && { bank_info: bankInfo }) 
        };

        axios.post(`http://127.0.0.1:8000/api/place-order`, data, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(res => {
            if (res.data.status === 200) {
                Swal.fire('Success', res.data.message, 'success');
                setErrors({});
                navigate('/my-orders'); 
            } else if (res.data.status === 422) {
                setErrors(res.data.errors);
                Swal.fire('Error', 'Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
            } else if (res.data.status === 400) {
                 Swal.fire('Error', res.data.message, 'error');
            } else if (res.data.status === 500) {
              
                Swal.fire('Error', res.data.message, 'error');
            } else {
               
                Swal.fire('Error', 'Unknown error occurred.', 'error');
            }
        }).catch(err => {
            
            console.error(err);
            if (err.response && err.response.status === 401) {
                Swal.fire('Error', 'Session expired. Please login again.', 'error');
                navigate('/loginad');
            } else {
                Swal.fire('Error', 'Something went wrong. Please check your connection.', 'error');
            }
        });
    };

    const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

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
            <div className="container py-5" style={{ minHeight: '80vh' }}>
                <div className="row g-5">
                   
                    <div className="col-12">
                         <h2 className="fw-bold mb-4 display-6">Thanh toán</h2>
                    </div>

                    
                    <div className="col-lg-7">
                        <div className="mb-5">
                            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                <MapPin size={24} /> Thông tin đơn hàng
                            </h4>
                            
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">Tên khách hàng</label>
                                    <div className="input-group">
                                        <input type="text" name="ho_ten" onChange={handleInput} value={checkoutInput.ho_ten} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 px-0 bg-transparent ${errors.ho_ten ? 'is-invalid' : ''}`} placeholder="Enter full name" />
                                    </div>
                                    <small className="text-danger">{errors.ho_ten}</small>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">Số điện thoại</label>
                                    <div className="input-group">
                                        <input type="text" name="so_dien_thoai" onChange={handleInput} value={checkoutInput.so_dien_thoai} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 px-0 bg-transparent ${errors.so_dien_thoai ? 'is-invalid' : ''}`} placeholder="Enter phone number" />
                                    </div>
                                    <small className="text-danger">{errors.so_dien_thoai}</small>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label text-muted small fw-bold">Email</label>
                                    <div className="input-group">
                                        <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 px-0 bg-transparent ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter email" />
                                    </div>
                                    <small className="text-danger">{errors.email}</small>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label text-muted small fw-bold">Địa chỉ: Số nhà,Tên đường</label>
                                    <input type="text" name="duong" onChange={handleInput} value={checkoutInput.duong} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 px-0 bg-transparent ${errors.duong ? 'is-invalid' : ''}`} placeholder="House number and street name" />
                                    <small className="text-danger">{errors.duong}</small>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">QUẬN/HUYỆN</label>
                                    <input type="text" name="thanh_pho" onChange={handleInput} value={checkoutInput.thanh_pho} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 px-0 bg-transparent ${errors.thanh_pho ? 'is-invalid' : ''}`} placeholder="District" />
                                    <small className="text-danger">{errors.thanh_pho}</small>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">THÀNH PHỐ / TỈNH</label>
                                    <input type="text" name="tinh_thanh" onChange={handleInput} value={checkoutInput.tinh_thanh} className={`form-control border-top-0 border-start-0 border-end-0 rounded-0 px-0 bg-transparent ${errors.tinh_thanh ? 'is-invalid' : ''}`} placeholder="City" />
                                    <small className="text-danger">{errors.tinh_thanh}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-lg-5">
                        <div className="bg-light bg-opacity-50 p-4 rounded-4 sticky-top" style={{top: '20px'}}>
                             
                            
                            <h4 className="fw-bold mb-4">Order Summary</h4>
                            <div className="mb-4" style={{maxHeight: '300px', overflowY: 'auto'}}>
                                {cart.map((item, idx) => {
                                    if(!item.product) return null;
                                    return (
                                        <div key={idx} className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="position-relative">
                                                    <img src={`http://127.0.0.1:8000/${item.product.hinh_anh}`} style={{width: '60px', height: '60px', objectFit: 'cover'}} className="rounded-3 bg-white" alt="" />
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                                        {item.so_luong}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="fw-bold small text-truncate" style={{maxWidth: '150px'}}>{item.product.ten_san_pham}</div>
                                                    <div className="text-muted small" style={{fontSize: '0.8rem'}}>{item.product.thuong_hieu}</div>
                                                </div>
                                            </div>
                                            <span className="fw-bold small">{formatPrice(item.product.gia * item.so_luong)}</span>
                                        </div>
                                    );
                                })}
                            </div>

                          
                            <div className="border-top border-bottom py-3 mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Tạm tính</span>
                                    <span className="fw-bold">{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Phí vận chuyển</span>
                                    <span className="fw-bold">{formatPrice(30000)}</span>
                                </div>
                                <div className="d-flex justify-content-between fs-4 fw-bold mt-3">
                                    <span>Total</span>
                                    <span>{formatPrice(totalPrice + 30000)}</span>
                                </div>
                            </div>

                          
                            <h5 className="fw-bold mb-3">Phương thức thanh toán</h5>
                            <div className="d-flex flex-column gap-2">
                               
                                <div 
                                    className={`p-3 rounded-3 border cursor-pointer transition-all ${paymentMode === 'COD' ? 'border-dark bg-white shadow-sm' : 'border-transparent bg-transparent text-muted'}`}
                                    onClick={() => setPaymentMode('COD')}
                                    style={{cursor: 'pointer'}}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`rounded-circle border d-flex align-items-center justify-content-center ${paymentMode === 'COD' ? 'border-dark' : ''}`} style={{width: '20px', height: '20px'}}>
                                            {paymentMode === 'COD' && <div className="bg-dark rounded-circle" style={{width: '10px', height: '10px'}}></div>}
                                        </div>
                                        <div>
                                            <div className="fw-bold small">Trả khi nhận hàng(COD)</div>
                                            {paymentMode === 'COD' && <div className="small text-muted mt-1">Trả tiền mặt khi nhận hàng.</div>}
                                        </div>
                                    </div>
                                </div>

                               
                                <div 
                                    className={`p-3 rounded-3 border cursor-pointer transition-all ${paymentMode === 'Bank Transfer' ? 'border-dark bg-white shadow-sm' : 'border-transparent bg-transparent text-muted'}`}
                                    onClick={() => setPaymentMode('Bank Transfer')}
                                    style={{cursor: 'pointer'}}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`rounded-circle border d-flex align-items-center justify-content-center ${paymentMode === 'Bank Transfer' ? 'border-dark' : ''}`} style={{width: '20px', height: '20px'}}>
                                            {paymentMode === 'Bank Transfer' && <div className="bg-dark rounded-circle" style={{width: '10px', height: '10px'}}></div>}
                                        </div>
                                        <div className="w-100">
                                            <div className="fw-bold small d-flex justify-content-between align-items-center">
                                                Thanh toán bằng thẻ tín dụng, thẻ ghi nợ
                                                <CreditCard size={16} />
                                            </div>
                                            
                                          
                                            {paymentMode === 'Bank Transfer' && (
                                                <div className="mt-3 pt-3 border-top animate-fade-in">
                                                    <div className="mb-2">
                                                        <input type="text" name="cardNumber" value={bankInfo.cardNumber} onChange={handleBankInput} className="form-control form-control-sm bg-light border-0" placeholder="Card Number" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input type="text" name="cardHolder" value={bankInfo.cardHolder} onChange={handleBankInput} className="form-control form-control-sm bg-light border-0" placeholder="Card Holder Name" />
                                                    </div>
                                                    <div className="row g-2">
                                                        <div className="col-6">
                                                            <input type="text" name="expiry" value={bankInfo.expiry} onChange={handleBankInput} className="form-control form-control-sm bg-light border-0" placeholder="MM/YY" />
                                                        </div>
                                                        <div className="col-6">
                                                            <input type="text" name="cvv" value={bankInfo.cvv} onChange={handleBankInput} className="form-control form-control-sm bg-light border-0" placeholder="CVV" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                              
                                <div className="p-3 rounded-3 border border-transparent text-muted opacity-50">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle border" style={{width: '20px', height: '20px'}}></div>
                                        <div>
                                            <div className="fw-bold small">Thanh toán bằng ví điện tử momo</div>
                                            <div className="small">Under maintenance</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={submitOrder} className="btn btn-dark w-100 py-3 rounded-pill fw-bold mt-4 shadow-sm text-uppercase letter-spacing-1">
                               Đặt hàng 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;