import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Nav, Tab, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';

const MyAccount = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        if (!localStorage.getItem('auth_token')) {
            navigate('/loginad');
        }

        
        const userName = localStorage.getItem('auth_name');
        
       
        setUser(prev => ({ ...prev, name: userName }));
        setLoading(false);

       
    }, [navigate]);

    const handleLogout = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('auth_token');
        axios.post(`http://127.0.0.1:8000/api/logout`, {}, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {
            if(res.data.status === true) {
                localStorage.clear();
                navigate('/loginad');
            }
        }).catch(err => {
            
            localStorage.clear();
            navigate('/loginad');
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="py-5 bg-light">
                <div className="container">
                    <Row>
                        {/* Sidebar Navigation */}
                        <Col md={3} className="mb-4">
                            <Card className="shadow-sm border-0">
                                <Card.Body className="p-0">
                                    <div className="p-3 border-bottom text-center">
                                        <img 
                                            src={localStorage.getItem('auth_image') !== 'null' ? `http://127.0.0.1:8000/${localStorage.getItem('auth_image')}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                            alt="Avatar"
                                            className="rounded-circle mb-2"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                        <h5 className="mb-0">{user.name}</h5>
                                    </div>
                                    <div className="p-2 border-bottom text-center">Tài khoản của tôi</div>
                                    <Nav variant="pills" className="flex-column p-2" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                        
                                        <Nav.Link eventKey="orders" className={`mb-1 ${activeTab === 'orders' ? 'bg-dark text-white' : 'text-dark'}`}>
                                            <i className="fa-solid fa-box-open me-2"></i> Đơn hàng 
                                        </Nav.Link>
                                        <Nav.Link eventKey="details" className={`mb-1 ${activeTab === 'details' ? 'bg-dark text-white' : 'text-dark'}`}>
                                            <i className="fa-solid fa-user-gear me-2"></i> Hồ sơ
                                        </Nav.Link>
                                        <Nav.Link eventKey="details" className={`mb-1 ${activeTab === 'checkoutmethod' ? 'bg-dark text-white' : 'text-dark'}`}>
                                            <i className="fa-solid fa-user-gear me-2"></i> Ngân hàng/Thanh toán
                                        </Nav.Link>
                                        <Nav.Link eventKey="details" className={`mb-1 ${activeTab === 'address' ? 'bg-dark text-white' : 'text-dark'}`}>
                                            <i className="fa-solid fa-user-gear me-2"></i> Địa chỉ
                                        </Nav.Link>
                                        <Nav.Link eventKey="details" className={`mb-1 ${activeTab === 'reqrespass' ? 'bg-dark text-white' : 'text-dark'}`}>
                                            <i className="fa-solid fa-user-gear me-2"></i> Đổi mật khẩu
                                        </Nav.Link>
                                         <Nav.Link eventKey="details" className={`mb-1 ${activeTab === 'setting' ? 'bg-dark text-white' : 'text-dark'}`}>
                                            <i className="fa-solid fa-user-gear me-2"></i> Thiết lập riêng tư
                                        </Nav.Link>
                                        <Nav.Link eventKey="details" className={`mb-1 ${activeTab === 'privinfo' ? 'bg-dark text-white' : 'text-dark'}`}>
                                            <i className="fa-solid fa-user-gear me-2"></i> Thông tin cá nhân
                                        </Nav.Link>
                                        <Nav.Link onClick={handleLogout} className="text-danger">
                                            <i className="fa-solid fa-right-from-bracket me-2"></i> Đăng xuất
                                        </Nav.Link>
                                    </Nav>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Content Area */}
                        <Col md={9}>
                            <Card className="shadow-sm border-0">
                                <Card.Body className="p-4">
                                    <Tab.Content>
                                        
                                        

                                     
                                        {activeTab === 'orders' && (
                                            <div className="fade show">
                                                <h4 className="mb-4">Đơn hàng của tôi</h4>
                                                <div className="alert alert-info">
                                                    Bạn chưa có đơn hàng nào. <a href="/" className="alert-link">Bắt đầu mua sắm ngay</a>.
                                                </div>
                                                {/* TODO: Map through orders fetched from API
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table-hover">...</table>
                                                    </div>
                                                */}
                                            </div>
                                        )}

                                        {/* Account Details Tab */}
                                        {activeTab === 'details' && (
                                            <div className="fade show">
                                                <h4 className="mb-4">Chi tiết tài khoản</h4>
                                                <Form>
                                                    <Row className="mb-3">
                                                        <Col md={12}>
                                                            <Form.Group>
                                                                <Form.Label>Họ và tên</Form.Label>
                                                                <Form.Control type="text" value={user.name} readOnly />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={12}>
                                                            <Form.Group>
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control type="email" placeholder="Email của bạn" value={user.email} readOnly />
                                                                <Form.Text className="text-muted">
                                                                    Để thay đổi email, vui lòng liên hệ quản trị viên.
                                                                </Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    
                                                    <h5 className="mt-4 mb-3">Thay đổi mật khẩu</h5>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Mật khẩu hiện tại</Form.Label>
                                                        <Form.Control type="password" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Mật khẩu mới</Form.Label>
                                                        <Form.Control type="password" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                                                        <Form.Control type="password" />
                                                    </Form.Group>

                                                    <Button variant="dark" type="submit" className="mt-2">Lưu thay đổi</Button>
                                                </Form>
                                            </div>
                                        )}
                                    </Tab.Content>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyAccount;