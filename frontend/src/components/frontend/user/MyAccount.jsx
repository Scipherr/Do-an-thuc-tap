import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Nav, Row, Col, Button, Form, Spinner, Table, Image } from 'react-bootstrap';

const MyAccount = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [loading, setLoading] = useState(true);
    
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '', 
        city: '',    
        state: '',   
        avatar: ''
    });

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/loginad');
            return;
        }

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const config = { headers: { "Authorization": `Bearer ${token}` } };

                
                const userName = localStorage.getItem('auth_name');
                const userImage = localStorage.getItem('auth_image');
                setUser(prev => ({ 
                    ...prev, 
                    name: userName,
                    avatar: userImage !== 'null' && userImage ? `http://127.0.0.1:8000/${userImage}` : null 
                }));

                // Fetch User Orders
                const orderRes = await axios.get('http://127.0.0.1:8000/api/my-orders', config);
                if (orderRes.data.status === 200) {
                    setOrders(orderRes.data.orders);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('auth_token');
        axios.post(`http://127.0.0.1:8000/api/logout`, {}, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {
            localStorage.clear();
            navigate('/loginad');
        }).catch(err => {
            localStorage.clear();
            navigate('/loginad');
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    
    const getStatusText = (status) => {
      
        switch (parseInt(status)) {
            case 0: return 'Chờ xử lý';
            case 1: return 'Đã xác nhận';
            case 2: return 'Đang giao';
            case 3: return 'Đã giao';
            case 4: return 'Đã hủy';
            default: return 'Chờ xử lý'; 
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="dark" />
            </div>
        );
    }

    const NavItem = ({ eventKey, icon, label }) => (
        <Nav.Link 
            eventKey={eventKey} 
            className={`px-0 py-2 mb-1 text-start ${activeTab === eventKey ? 'text-black fw-bold' : 'text-secondary'}`}
            style={{ transition: 'all 0.2s', borderLeft: activeTab === eventKey ? '3px solid black' : '3px solid transparent', paddingLeft: '15px' }}
        >
            <i className={`${icon} me-3`} style={{ width: '20px' }}></i> {label}
        </Nav.Link>
    );

    return (
        <>
            <Header />
            <div className="py-5 bg-white">
                <div className="container">
                    <Row>
                        {/* Sidebar */}
                        <Col md={3} className="mb-5">
                            <div className="mb-4 d-flex align-items-center gap-3 ps-3">
                                <Image 
                                    src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                    roundedCircle 
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                                <div>
                                    <small className="text-muted d-block">Xin chào,</small>
                                    <span className="fw-bold">{user.name}</span>
                                </div>
                            </div>
                            
                            <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                <NavItem eventKey="orders" icon="fa-solid fa-box-open" label="Đơn hàng của tôi" />
                                <NavItem eventKey="profile" icon="fa-regular fa-id-card" label="Hồ sơ cá nhân" />
                                <NavItem eventKey="payment" icon="fa-regular fa-credit-card" label="Ngân hàng & Thanh toán" />
                                <NavItem eventKey="address" icon="fa-solid fa-map-location-dot" label="Sổ địa chỉ" />
                                <NavItem eventKey="password" icon="fa-solid fa-lock" label="Đổi mật khẩu" />
                                <NavItem eventKey="settings" icon="fa-solid fa-sliders" label="Thiết lập riêng tư" />
                                <NavItem eventKey="personal_info" icon="fa-solid fa-user-pen" label="Thông tin bổ sung" />
                                
                                <Nav.Link onClick={handleLogout} className="px-0 py-2 mt-3 text-danger ps-3">
                                    <i className="fa-solid fa-right-from-bracket me-3" style={{ width: '20px' }}></i> Đăng xuất
                                </Nav.Link>
                            </Nav>
                        </Col>

                      
                        <Col md={9}>
                            <div className="ps-md-5">
                                
                                {activeTab === 'orders' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Đơn hàng của tôi</h3>
                                        {orders.length > 0 ? (
                                            <Table hover responsive className="align-middle">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="border-1">Mã đơn</th>
                                                        <th className="border-1">Ngày đặt</th>
                                                        <th className="border-1">Tổng tiền</th>
                                                        <th className="border-1">Trạng thái</th>
                                                        <th className="border-1 text-end">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map(order => (
                                                        <tr key={order.ma_don_hang}>
                                                            <td className="fw-bold">#{order.ma_don_hang}</td>
                                                            <td>{new Date(order.ngay_tao).toLocaleDateString('vi-VN')}</td>
                                                            <td>{formatCurrency(order.tong_tien)}</td>
                                                         
                                                            <td>{getStatusText(order.trang_thai)}</td>
                                                            <td className="text-end">
                                                                <a href={`/my-order/${order.ma_don_hang}`} className="border-1">Chi tiết &rarr;</a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <div className="text-center py-5 bg-light rounded">
                                                <i className="fa-solid fa-box-open fs-1 text-muted mb-3"></i>
                                                <p>Bạn chưa có đơn hàng nào.</p>
                                                <Button variant="dark" href="/">Mua sắm ngay</Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                               
                                {activeTab === 'profile' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Hồ sơ cá nhân</h3>
                                        <Form>
                                            <Row className="mb-4">
                                                <Col md={12} className="text-center mb-3">
                                                     <Image 
                                                        src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                                        roundedCircle 
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        className="mb-2 shadow-sm"
                                                    />
                                                    <div>
                                                        <Button variant="outline-dark" size="sm">Chọn ảnh mới</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Họ và tên</Form.Label>
                                                        <Form.Control type="text" defaultValue={user.name} className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Email</Form.Label>
                                                        <Form.Control type="email" defaultValue={user.email} readOnly className="border-0 border-bottom rounded-0 px-0 bg-white" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Số điện thoại</Form.Label>
                                                        <Form.Control type="text" placeholder="Thêm số điện thoại" className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button variant="dark" className="mt-3 px-4 rounded-0">Lưu thay đổi</Button>
                                        </Form>
                                    </div>
                                )}

                               
                                {activeTab === 'payment' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Ngân hàng & Thanh toán</h3>
                                        <div className="p-3 border rounded mb-3 d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                                <i className="fa-brands fa-cc-visa fa-2x text-primary"></i>
                                                <div>
                                                    <div className="fw-bold">Visa **** 1234</div>
                                                    <small className="text-muted">Hết hạn 12/28</small>
                                                </div>
                                            </div>
                                            <Button variant="outline-danger" size="sm">Xóa</Button>
                                        </div>
                                        <Button variant="outline-dark" className="w-100 border-dashed py-3">
                                            <i className="fa-solid fa-plus me-2"></i> Thêm phương thức thanh toán mới
                                        </Button>
                                    </div>
                                )}

                                
                                {activeTab === 'address' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Sổ địa chỉ</h3>
                                        <Form>
                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Địa chỉ nhận hàng</Form.Label>
                                                        <Form.Control type="text" placeholder="Số nhà, tên đường..." defaultValue={user.address} className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Thành phố</Form.Label>
                                                        <Form.Control type="text" defaultValue={user.city} className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Tỉnh / Thành</Form.Label>
                                                        <Form.Control type="text" defaultValue={user.state} className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button variant="dark" className="mt-3 px-4 rounded-0">Cập nhật địa chỉ</Button>
                                        </Form>
                                    </div>
                                )}

                               
                                {activeTab === 'password' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Đổi mật khẩu</h3>
                                        <Form style={{ maxWidth: '500px' }}>
                                            <Form.Group className="mb-4">
                                                <Form.Control type="password" placeholder="Mật khẩu hiện tại" className="py-2" />
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Form.Control type="password" placeholder="Mật khẩu mới" className="py-2" />
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Form.Control type="password" placeholder="Xác nhận mật khẩu mới" className="py-2" />
                                            </Form.Group>
                                            <Button variant="dark" className="px-4 rounded-0">Đổi mật khẩu</Button>
                                        </Form>
                                    </div>
                                )}

                                
                                {activeTab === 'settings' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Thiết lập riêng tư</h3>
                                        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                                            <div>
                                                <h6 className="mb-1">Thông báo email</h6>
                                                <small className="text-muted">Nhận email về khuyến mãi và đơn hàng</small>
                                            </div>
                                            <Form.Check type="switch" id="email-switch" defaultChecked />
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                                            <div>
                                                <h6 className="mb-1">Hiển thị trạng thái online</h6>
                                                <small className="text-muted">Cho phép người khác thấy bạn đang hoạt động</small>
                                            </div>
                                            <Form.Check type="switch" id="online-switch" />
                                        </div>
                                        <div className="text-end">
                                             <Button variant="danger" className="rounded-0">Xóa tài khoản</Button>
                                        </div>
                                    </div>
                                )}

                                
                                {activeTab === 'personal_info' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Thông tin bổ sung</h3>
                                        <Form>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Ngày sinh</Form.Label>
                                                        <Form.Control type="date" className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Giới tính</Form.Label>
                                                        <Form.Select className="border-0 border-bottom rounded-0 px-0">
                                                            <option>Nam</option>
                                                            <option>Nữ</option>
                                                            <option>Khác</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button variant="dark" className="mt-3 px-4 rounded-0">Lưu thông tin</Button>
                                        </Form>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyAccount;