import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    // State form
    const [formData, setFormData] = useState({
        ten_san_pham: '',
        gia: '',
        so_luong_ton: 10,
        mo_ta: '',
        ma_danh_muc: 1
    });

    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // --- 1. LOAD DATA ---
    const fetchProducts = () => {
        fetch('http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/products.php')
            .then(res => res.json())
            .then(data => { 
                if (Array.isArray(data)) {
                    setProducts(data);
                    setFilteredProducts(data);
                }
            })
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchProducts(); }, []);

    // --- 2. TÌM KIẾM ---
    useEffect(() => {
        const result = products.filter(p => 
            p.ten_san_pham.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(result);
    }, [searchTerm, products]);

    // Hàm fix ảnh
    const getSafeImage = (imgUrl) => {
        if (!imgUrl || imgUrl.trim() === "") return "https://placehold.co/400x300?text=No+Img";
        if (imgUrl.startsWith("http")) return imgUrl;
        if (imgUrl.includes("uploads") || imgUrl.includes("TNTStore")) return `http://localhost${imgUrl}`;
        return imgUrl;
    };

    // --- 3. CÁC HÀM XỬ LÝ (Input, Edit, Add, Save, Delete) ---
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'hinh_anh_upload') {
            const file = files[0];
            if (file) {
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleEditClick = (product) => {
        setFormData({
            ten_san_pham: product.ten_san_pham,
            gia: product.gia,
            so_luong_ton: product.so_luong_ton || 0,
            mo_ta: product.mo_ta || '',
            ma_danh_muc: product.ma_danh_muc || 1
        });
        setPreviewUrl(getSafeImage(product.hinh_anh));
        setSelectedFile(null);
        setIsEditMode(true);
        setEditId(product.ma_san_pham);
        setShowModal(true);
    };

    const handleAddClick = () => {
        setFormData({ ten_san_pham: '', gia: '', so_luong_ton: 10, mo_ta: '', ma_danh_muc: 1 });
        setPreviewUrl(null);
        setSelectedFile(null);
        setIsEditMode(false);
        setEditId(null);
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formData.ten_san_pham || !formData.gia) {
            alert("Vui lòng nhập tên và giá sản phẩm!");
            return;
        }
        const dataToSend = new FormData();
        dataToSend.append('ten_san_pham', formData.ten_san_pham);
        dataToSend.append('gia', formData.gia);
        dataToSend.append('so_luong_ton', formData.so_luong_ton);
        dataToSend.append('ma_danh_muc', formData.ma_danh_muc);
        dataToSend.append('mo_ta', formData.mo_ta);
        if (selectedFile) dataToSend.append('hinh_anh', selectedFile);

        let apiUrl = isEditMode 
            ? 'http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/update_product.php'
            : 'http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/add_product_with_image.php';

        if (isEditMode) dataToSend.append('ma_san_pham', editId);

        fetch(apiUrl, { method: 'POST', body: dataToSend })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                setShowModal(false);
                fetchProducts();
            } else {
                alert("Lỗi: " + data.message);
            }
        })
        .catch(() => alert("Lỗi kết nối server!"));
    };

    const handleDelete = (id) => {
        if (window.confirm("⚠️ Xóa là mất luôn đó nha đại ca?")) {
            fetch(`http://localhost/TNTStore/Do-an-thuc-tap-main/api-react/delete_product.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') fetchProducts();
                else alert("Lỗi: " + data.message);
            });
        }
    };

    return (
        <div className="container-fluid py-5" style={{backgroundColor: '#f0f2f5', minHeight: '100vh'}}>
            {/* --- HEADER --- */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                        <div>
                            <h3 className="fw-bold text-dark mb-1">📦 Kho Hàng</h3>
                            <p className="text-muted mb-0">Quản lý <span className="fw-bold text-primary">{products.length}</span> sản phẩm</p>
                        </div>
                        
                        <div className="d-flex gap-2 w-100 w-md-auto">
                            <InputGroup className="shadow-sm" style={{maxWidth: '300px'}}>
                                <InputGroup.Text className="bg-white border-end-0 rounded-start-3 ps-3">
                                    <i className="bi bi-search text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control 
                                    className="border-start-0 rounded-end-3 bg-white" 
                                    placeholder="Tìm kiếm..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{boxShadow: 'none'}}
                                />
                            </InputGroup>

                            <button className="btn btn-primary rounded-3 px-4 fw-bold shadow hover-up" onClick={handleAddClick}>
                                <i className="bi bi-plus-lg me-2"></i>Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- GRID VIEW (DẠNG THẺ) - KHÔNG BAO GIỜ BỊ DỒN CỤC --- */}
            <div className="row g-4">
                {filteredProducts.map((p) => {
                    const sl = p.so_luong_ton ? parseInt(p.so_luong_ton) : 0;
                    const gia = p.gia ? Number(p.gia) : 0;

                    return (
                        <div key={p.ma_san_pham} className="col-12 col-md-6 col-lg-4 col-xl-3">
                            <div className="card h-100 border-0 shadow-sm rounded-4 hover-card overflow-hidden">
                                {/* Ảnh Sản Phẩm */}
                                <div className="position-relative text-center bg-white border-bottom" style={{height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img 
                                        src={getSafeImage(p.hinh_anh)} 
                                        alt={p.ten_san_pham}
                                        className="w-100 h-100 object-fit-contain p-3"
                                    />
                                    <span className="position-absolute top-0 start-0 m-3 badge rounded-3 bg-dark opacity-75">#{p.ma_san_pham}</span>
                                    
                                    {/* Nút Sửa/Xóa nổi trên ảnh */}
                                    <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                                        <button className="btn btn-light btn-sm rounded-3 shadow-sm text-primary action-btn" onClick={() => handleEditClick(p)}>
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                        <button className="btn btn-light btn-sm rounded-3 shadow-sm text-danger action-btn" onClick={() => handleDelete(p.ma_san_pham)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Thông Tin Chi Tiết */}
                                <div className="card-body d-flex flex-column">
                                    <div className="mb-2">
                                        <span className={`badge border rounded-3 fw-normal ${
                                            p.ma_danh_muc == 1 ? "bg-primary-subtle text-primary border-primary-subtle" : 
                                            p.ma_danh_muc == 2 ? "bg-info-subtle text-info border-info-subtle" : 
                                            p.ma_danh_muc == 3 ? "bg-warning-subtle text-warning-emphasis border-warning-subtle" : "bg-secondary-subtle text-secondary"
                                        }`}>
                                            {p.ma_danh_muc == 1 ? "📱 Di động" : p.ma_danh_muc == 2 ? "📺 TV" : p.ma_danh_muc == 3 ? "❄️ Gia dụng" : "🎧 Phụ kiện"}
                                        </span>
                                    </div>
                                    
                                    <h5 className="card-title fw-bold text-dark text-truncate mb-3" title={p.ten_san_pham}>
                                        {p.ten_san_pham}
                                    </h5>
                                    
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-danger fw-bold fs-5">
                                                {new Intl.NumberFormat('vi-VN').format(gia)} ₫
                                            </span>
                                            <small className={sl > 0 ? "text-success fw-bold" : "text-danger fw-bold"}>
                                                {sl > 0 ? `Sẵn hàng: ${sl}` : 'Hết hàng'}
                                            </small>
                                        </div>
                                        
                                        {/* Thanh Progress Tồn Kho */}
                                        <div className="progress" style={{height: '6px', backgroundColor: '#e9ecef'}}>
                                            <div 
                                                className={`progress-bar rounded-pill ${sl > 10 ? 'bg-success' : sl > 0 ? 'bg-warning' : 'bg-danger'}`} 
                                                role="progressbar" 
                                                style={{width: `${Math.min(sl, 100)}%`}}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <div className="text-muted opacity-50">
                            <i className="bi bi-box-seam display-1"></i>
                            <p className="mt-3 fs-5">Không tìm thấy sản phẩm nào!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered backdrop="static" className="fade-modal">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold fs-4">
                        {isEditMode ? "✏️ Cập Nhật Sản Phẩm" : "✨ Thêm Sản Phẩm Mới"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-4">
                    <Form>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card border-dashed bg-light text-center h-100 d-flex justify-content-center align-items-center position-relative overflow-hidden rounded-3" style={{minHeight: '200px'}}>
                                    {previewUrl ? (
                                        <img src={previewUrl} className="w-100 h-100 object-fit-contain" alt="Preview" />
                                    ) : (
                                        <div className="text-muted">
                                            <i className="bi bi-cloud-upload fs-1"></i>
                                            <div className="small mt-2">Tải ảnh lên</div>
                                        </div>
                                    )}
                                    <input type="file" name="hinh_anh_upload" accept="image/*" onChange={handleInputChange} 
                                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer" />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" name="ten_san_pham" placeholder="Tên sản phẩm" value={formData.ten_san_pham} onChange={handleInputChange} className="rounded-3" />
                                    <label>Tên sản phẩm</label>
                                </Form.Floating>
                                
                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <Form.Floating>
                                            <Form.Control type="number" name="gia" placeholder="Giá bán" value={formData.gia} onChange={handleInputChange} className="rounded-3" />
                                            <label>Giá bán (VNĐ)</label>
                                        </Form.Floating>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Floating>
                                            <Form.Control type="number" name="so_luong_ton" placeholder="Số lượng" value={formData.so_luong_ton} onChange={handleInputChange} className="rounded-3" />
                                            <label>Số lượng tồn</label>
                                        </Form.Floating>
                                    </div>
                                </div>

                                <Form.Floating className="mb-3">
                                    <Form.Select name="ma_danh_muc" value={formData.ma_danh_muc} onChange={handleInputChange} className="rounded-3">
                                        <option value="1">📱 Điện thoại & Tablet</option>
                                        <option value="2">📺 TV & Âm thanh</option>
                                        <option value="3">❄️ Điện gia dụng</option>
                                        <option value="4">🎧 Phụ kiện công nghệ</option>
                                    </Form.Select>
                                    <label>Danh mục</label>
                                </Form.Floating>

                                <Form.Floating>
                                    <Form.Control as="textarea" style={{height: '100px'}} name="mo_ta" placeholder="Mô tả" value={formData.mo_ta} onChange={handleInputChange} className="rounded-3" />
                                    <label>Mô tả chi tiết</label>
                                </Form.Floating>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0 pb-4 pe-4">
                    <Button variant="light" className="rounded-3 px-4 fw-bold" onClick={() => setShowModal(false)}>Đóng</Button>
                    <Button variant="primary" className="rounded-3 px-5 fw-bold shadow-sm" onClick={handleSave}>
                        {isEditMode ? "Lưu Thay Đổi" : "Hoàn Tất"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* CSS Tùy chỉnh */}
            <style>{`
                .hover-up:hover { transform: translateY(-3px); transition: all 0.3s ease; }
                .hover-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; transition: all 0.3s ease; }
                .border-dashed { border: 2px dashed #dee2e6; }
                .cursor-pointer { cursor: pointer; }
                .action-btn:hover { background-color: #e9ecef; transform: scale(1.1); transition: all 0.2s; }
            `}</style>
        </div>
    );
};

export default AdminProducts;