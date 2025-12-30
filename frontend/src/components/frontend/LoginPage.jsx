import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './common/Footer';
import Header from './common/Header';

export const LoginPage = () => {
    const navigate = useNavigate();
    
    // State for inputs
    const [loginInput, setLoginInput] = useState({
        email: '',
        mat_khau: '',
    });

    // State for UI feedback
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInput = (e) => {
        e.persist();
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
        // Clear error when user types
        if (error) setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            email: loginInput.email,
            mat_khau: loginInput.mat_khau,
        };

        // Note: Replace with your actual API URL from .env or config
       axios.post('http://127.0.0.1:8000/api/authenticate', data)
    .then(res => {
        if (res.data.status === true) {
            // Store token and user info
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.user.name);
            localStorage.setItem('auth_image', res.data.user.image); 
            localStorage.setItem('auth_role', res.data.user.role); // Optional: Store role if needed later

            // CHECK ROLE AND REDIRECT
            if (res.data.user.role === 'admin') { // Check your DB value for admin
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }

        } else {
            setError(res.data.message || 'Login failed');
        }
        setIsLoading(false);
    })
    };

    return (
        <>
            {/* Header is optional on login page, remove if not needed */}
            <Header /> 

            <div className="login-wrapper">
                <div className="login-header">
                    <span>DYNAMITE ACCOUNT</span>
                    <Nav.Link href="/" className='text-white text-decoration-none'>Back to Home</Nav.Link>
                </div>

                <div className="login-container">
                    <div className="login-card">
                        <h1 className="login-title">Đăng Nhập</h1>

                        <form onSubmit={handleLogin}>
                            <div className="custom-input-group">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="custom-input" 
                                    placeholder=" " 
                                    value={loginInput.email} 
                                    onChange={handleInput} 
                                    required 
                                />
                                <label className="input-label">Email</label>
                            </div>

                            <div className="custom-input-group">
                                <input 
                                    type="password" 
                                    name="mat_khau" 
                                    className="custom-input" 
                                    placeholder=" " 
                                    value={loginInput.mat_khau} 
                                    onChange={handleInput} 
                                    required 
                                />
                                <label className="input-label">Mật khẩu</label>
                            </div>

                            {error && <div className="error-msg text-danger mb-3">{error}</div>}

                            <button 
                                type="submit" 
                                className="btn-continue" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
                            </button>
                        </form>

                        <div className="mt-3">
                            <span className="text-secondary">Chưa có tài khoản? </span>
                            <span className="create-account-link" onClick={() => navigate('/register')}>Tạo tài khoản</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default LoginPage;