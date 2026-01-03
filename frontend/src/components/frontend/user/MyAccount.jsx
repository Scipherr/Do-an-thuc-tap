import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Nav, Row, Col, Button, Form, Spinner, Table, Image } from 'react-bootstrap';
import Swal from 'sweetalert2';

const MyAccount = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [loading, setLoading] = useState(true);
    
    // Unified User State
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '', 
        city: '',    
        state: '',   
        avatar: '',
        previewAvatar: '',
        dob: '',
        gender: 'Nam'
    });

    // Password State
    const [pass, setPass] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    const [orders, setOrders] = useState([]);
    const [errorList, setErrorList] = useState({});

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/loginad');
            return;
        }
        fetchUserData();
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const config = { headers: { "Authorization": `Bearer ${token}` } };

            const res = await axios.get('http://127.0.0.1:8000/api/user-profile', config);
            if (res.data.status === 200) {
                const u = res.data.user;
                setUser({
                    name: u.name || '',
                    email: u.email || '',
                    phone: u.phone || '',
                    address: u.address || '',
                    city: u.city || '',
                    state: u.state || '',
                    avatar: u.avatar ? `http://127.0.0.1:8000/${u.avatar}` : null,
                    previewAvatar: null,
                    dob: u.dob || '',
                    gender: u.gender || 'Nam'
                });
                setOrders(res.data.orders);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser({
                ...user,
                imageFile: file,
                previewAvatar: URL.createObjectURL(file)
            });
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
       
        formData.append('ho_ten', user.name);
        formData.append('so_dien_thoai', user.phone);
        formData.append('duong', user.address);
        formData.append('thanh_pho', user.city);
        formData.append('tinh_thanh', user.state);
        formData.append('ngay_sinh', user.dob);
        formData.append('gioi_tinh', user.gender);
        
        if (user.imageFile) {
            formData.append('avatar', user.imageFile);
        }

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/update-user', formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.data.status === 200) {
                Swal.fire('Thành công', res.data.message, 'success');
                setErrorList({});
                
                localStorage.setItem('auth_name', user.name);
                fetchUserData(); // Refresh data
            } else if (res.data.status === 422) {
                setErrorList(res.data.errors);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/change-password', pass, {
                headers: { "Authorization": `Bearer ${localStorage.getItem('auth_token')}` }
            });
            if (res.data.status === 200) {
                Swal.fire('Thành công', res.data.message, 'success');
                setPass({ current_password: '', new_password: '', new_password_confirmation: '' });
                setErrorList({});
            } else if (res.data.status === 400) {
                Swal.fire('Lỗi', res.data.message, 'error');
            } else if (res.data.status === 422) {
                setErrorList(res.data.errors);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/logout`, {}, {
            headers: { "Authorization": `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(() => {
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

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="border" variant="dark" /></div>;

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
                        <Col md={3} className="mb-5">
                            <div className="mb-4 d-flex align-items-center gap-3 ps-3">
                                <Image 
                                    src={user.previewAvatar || user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
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
                                <NavItem eventKey="address" icon="fa-solid fa-map-location-dot" label="Sổ địa chỉ" />
                                <NavItem eventKey="password" icon="fa-solid fa-lock" label="Đổi mật khẩu" />
                                
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
                                                                <a href={`/my-order/${order.ma_don_hang}`} className="btn btn-sm btn-outline-dark">Chi tiết</a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <div className="text-center py-5 bg-light rounded">
                                                <p>Bạn chưa có đơn hàng nào.</p>
                                                <Button variant="dark" href="/">Mua sắm ngay</Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'profile' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Hồ sơ cá nhân</h3>
                                        <Form onSubmit={handleUpdateUser}>
                                            <Row className="mb-4">
                                                <Col md={12} className="text-center mb-3">
                                                     <Image 
                                                        src={user.previewAvatar || user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                                        roundedCircle 
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        className="mb-2 shadow-sm"
                                                    />
                                                    <div>
                                                        <Form.Label htmlFor="avatar-upload" className="btn btn-outline-dark btn-sm" style={{cursor: 'pointer'}}>
                                                            Chọn ảnh mới
                                                        </Form.Label>
                                                        <Form.Control type="file" id="avatar-upload" className="d-none" onChange={handleImageChange} accept="image/*" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Họ và tên</Form.Label>
                                                        <Form.Control type="text" name="name" value={user.name} onChange={handleInput} className="border-0 border-bottom rounded-0 px-0" />
                                                        <small className="text-danger">{errorList.ho_ten}</small>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Email</Form.Label>
                                                        <Form.Control type="email" value={user.email} readOnly className="border-0 border-bottom rounded-0 px-0 bg-white" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Số điện thoại</Form.Label>
                                                        <Form.Control type="text" name="phone" value={user.phone} onChange={handleInput} placeholder="Thêm số điện thoại" className="border-0 border-bottom rounded-0 px-0" />
                                                        <small className="text-danger">{errorList.so_dien_thoai}</small>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Ngày sinh</Form.Label>
                                                        <Form.Control type="date" name="dob" value={user.dob} onChange={handleInput} className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Giới tính</Form.Label>
                                                        <Form.Select name="gender" value={user.gender} onChange={handleInput} className="border-0 border-bottom rounded-0 px-0">
                                                            <option value="Nam">Nam</option>
                                                            <option value="Nữ">Nữ</option>
                                                            <option value="Khác">Khác</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button type="submit" variant="dark" className="mt-3 px-4 rounded-0">Lưu thay đổi</Button>
                                        </Form>
                                    </div>
                                )}

                                {activeTab === 'address' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Địa chỉ</h3>
                                        <Form onSubmit={handleUpdateUser}>
                                            <Row className="mb-3">
                                                <Col md={12}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Số nhà, Đường</Form.Label>
                                                        <Form.Control type="text" name="address" value={user.address} onChange={handleInput} placeholder="Số nhà, tên đường..." className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Quận</Form.Label>
                                                        <Form.Control type="text" name="city" value={user.city} onChange={handleInput} className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="text-muted small text-uppercase">Thành phố</Form.Label>
                                                        <Form.Control type="text" name="state" value={user.state} onChange={handleInput} className="border-0 border-bottom rounded-0 px-0" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Button type="submit" variant="dark" className="mt-3 px-4 rounded-0">Cập nhật địa chỉ</Button>
                                        </Form>
                                    </div>
                                )}

                                {activeTab === 'password' && (
                                    <div className="fade show">
                                        <h3 className="mb-4 fw-light">Đổi mật khẩu</h3>
                                        <Form onSubmit={handleChangePassword} style={{ maxWidth: '500px' }}>
                                            <Form.Group className="mb-4">
                                                <Form.Control 
                                                    type="password" 
                                                    name="current_password"
                                                    value={pass.current_password}
                                                    onChange={(e) => setPass({...pass, current_password: e.target.value})}
                                                    placeholder="Mật khẩu hiện tại" 
                                                    className="py-2" 
                                                />
                                                <small className="text-danger">{errorList.current_password}</small>
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Form.Control 
                                                    type="password" 
                                                    name="new_password"
                                                    value={pass.new_password}
                                                    onChange={(e) => setPass({...pass, new_password: e.target.value})}
                                                    placeholder="Mật khẩu mới" 
                                                    className="py-2" 
                                                />
                                                <small className="text-danger">{errorList.new_password}</small>
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Form.Control 
                                                    type="password" 
                                                    name="new_password_confirmation"
                                                    value={pass.new_password_confirmation}
                                                    onChange={(e) => setPass({...pass, new_password_confirmation: e.target.value})}
                                                    placeholder="Xác nhận mật khẩu mới" 
                                                    className="py-2" 
                                                />
                                            </Form.Group>
                                            <Button type="submit" variant="dark" className="px-4 rounded-0">Đổi mật khẩu</Button>
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