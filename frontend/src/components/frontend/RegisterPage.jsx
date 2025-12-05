import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './common/Footer';
import Header from './common/Header';

export const RegisterPage = () => {
    const navigate = useNavigate();
    
    // State for inputs
    const [registerInput, setRegisterInput] = useState({
        ho_ten: '',
        email: '',
        mat_khau: '',
        confirm_mat_khau: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInput = (e) => {
        e.persist();
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        if (registerInput.mat_khau !== registerInput.confirm_mat_khau) {
            setError('Mật khẩu nhập lại không khớp');
            return;
        }

        setIsLoading(true);

        const data = {
            ho_ten: registerInput.ho_ten,
            email: registerInput.email,
            mat_khau: registerInput.mat_khau,
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('http://127.0.0.1:8000/api/register', data)
                .then(res => {
                    if (res.data.status === true) {
                        localStorage.setItem('auth_token', res.data.token);
                        localStorage.setItem('auth_name', res.data.user.name);
                        navigate('/'); 
                    } else {
                        setError(res.data.message || 'Registration failed');
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        if(err.response.data.errors) {
                             setError(Object.values(err.response.data.errors).flat()[0]);
                        } else {
                             setError(err.response.data.message);
                        }
                    } else {
                        setError('Something went wrong. Please try again.');
                    }
                    setIsLoading(false);
                });
        });
    };

    return (
        <>
            <Header /> 

            <div className="login-wrapper">
                <div className="login-header">
                    <span>DYNAMITE ACCOUNT</span>
                    <Nav.Link href="/" className='text-white text-decoration-none'>Back to Home</Nav.Link>
                </div>

                <div className="login-container">
                    <div className="login-card" style={{maxWidth: '500px'}}>
                        <h1 className="login-title">Đăng Ký</h1>

                        <form onSubmit={handleRegister}>
                            <div className="custom-input-group">
                                <input 
                                    type="text" 
                                    name="ho_ten" 
                                    className="custom-input" 
                                    placeholder=" " 
                                    value={registerInput.ho_ten} 
                                    onChange={handleInput} 
                                    required 
                                />
                                <label className="input-label">Họ và Tên</label>
                            </div>

                            <div className="custom-input-group">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="custom-input" 
                                    placeholder=" " 
                                    value={registerInput.email} 
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
                                    value={registerInput.mat_khau} 
                                    onChange={handleInput} 
                                    required 
                                />
                                <label className="input-label">Mật khẩu</label>
                            </div>

                            <div className="custom-input-group">
                                <input 
                                    type="password" 
                                    name="confirm_mat_khau" 
                                    className="custom-input" 
                                    placeholder=" " 
                                    value={registerInput.confirm_mat_khau} 
                                    onChange={handleInput} 
                                    required 
                                />
                                <label className="input-label">Nhập lại mật khẩu</label>
                            </div>

                            {error && <div className="error-msg text-danger mb-3 text-start">{error}</div>}

                            <button 
                                type="submit" 
                                className="btn-continue" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang xử lý...' : 'Đăng Ký'}
                            </button>
                        </form>

                        <div className="mt-3">
                            <span className="text-secondary">Đã có tài khoản? </span>
                            <span className="create-account-link" onClick={() => navigate('/loginad')}>Đăng nhập</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default RegisterPage;