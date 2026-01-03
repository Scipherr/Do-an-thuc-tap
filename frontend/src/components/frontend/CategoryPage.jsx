import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './common/Header';
import Footer from './common/Footer';
import { Search, Filter } from 'lucide-react';

const CategoryPage = () => {
   
    const { id } = useParams(); 
    
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    
 
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 });

    const BACKEND_URL = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
               
                const res = await axios.get(`${BACKEND_URL}/api/products/category/${id}`);
                
                if (res.data.status === 200) {
                    setProducts(res.data.products);
                    setCategory(res.data.category);
                } else {
                    console.log("Category not found");
                }
            } catch (error) {
                console.error("Error fetching category products:", error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [id]); 

    
    const getFilteredProducts = () => {
        let filtered = [...products];

        // 1. Search Filter
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.ten_san_pham.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

      
        filtered = filtered.filter(item => 
            item.gia >= priceRange.min && item.gia <= priceRange.max
        );

      
        if (sortOption === 'price-asc') {
            filtered.sort((a, b) => a.gia - b.gia);
        } else if (sortOption === 'price-desc') {
            filtered.sort((a, b) => b.gia - a.gia);
        } else if (sortOption === 'newest') {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        return filtered;
    };

    const filteredList = getFilteredProducts();

    const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    
    const getImageUrl = (imagePath) => {
        if (!imagePath) return 'https://placehold.co/400x400/png?text=No+Image';
        if (imagePath.startsWith('http')) return imagePath;
        return `${BACKEND_URL}/${imagePath.startsWith('/') ? imagePath.substring(1) : imagePath}`;
    };

    return (
        <>
            <Header />
            <div className="container-fluid py-5 bg-light">
                <div className="container">
                    <div className="row">
                       
                        <div className="col-md-3 mb-4">
                            <div className="card shadow-sm border-0 rounded-4">
                                <div className="card-body p-4">
                                    <h4 className="mb-4 fw-bold"><Filter size={20}/> Bộ lọc</h4>
                                    
                                   
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Tìm kiếm</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white"><Search size={16}/></span>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Tên sản phẩm..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Sắp xếp</label>
                                        <select className="form-select" onChange={(e) => setSortOption(e.target.value)}>
                                            <option value="default">Mặc định</option>
                                            <option value="price-asc">Giá: Thấp đến Cao</option>
                                            <option value="price-desc">Giá: Cao đến Thấp</option>
                                            <option value="newest">Mới nhất</option>
                                        </select>
                                    </div>

                                  
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Khoảng giá</label>
                                        <div className="d-flex align-items-center gap-2">
                                            <input 
                                                type="number" 
                                                className="form-control form-control-sm" 
                                                placeholder="Min"
                                                onChange={(e) => setPriceRange({...priceRange, min: e.target.value || 0})}
                                            />
                                            <span>-</span>
                                            <input 
                                                type="number" 
                                                className="form-control form-control-sm" 
                                                placeholder="Max"
                                                onChange={(e) => setPriceRange({...priceRange, max: e.target.value || 100000000})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="fw-bold text-dark">
                                    {category ? category.ten_danh_muc : 'Danh mục sản phẩm'}
                                </h2>
                                <span className="text-muted">{filteredList.length} sản phẩm</span>
                            </div>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : (
                                <div className="row g-4">
                                    {filteredList.length > 0 ? (
                                        filteredList.map((item) => (
                                            <div className="col-md-4 col-sm-6" key={item.ma_san_pham}>
                                                <div className="card h-100 product-card-hover border-0 shadow-sm rounded-4 overflow-hidden">
                                                    <div className="position-relative">
                                                        <Link to={`/product/${item.ma_san_pham}`}>
                                                            <img 
                                                                src={getImageUrl(item.hinh_anh)} 
                                                                className="card-img-top p-3" 
                                                                style={{height: '250px', objectFit: 'contain'}}
                                                                alt={item.ten_san_pham} 
                                                                onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x400/png?text=No+Image"}}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <h5 className="card-title text-truncate">
                                                            <Link to={`/product/${item.ma_san_pham}`} className="text-decoration-none text-dark">
                                                                {item.ten_san_pham}
                                                            </Link>
                                                        </h5>
                                                        <p className="fw-bold text-primary fs-5 mb-2">{formatPrice(item.gia)}</p>
                                                        <button className="btn btn-dark w-100 rounded-pill">
                                                            <Link to={`/product/${item.ma_san_pham}`} className="text-white text-decoration-none">
                                                                Xem chi tiết
                                                            </Link>
                                                            </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12 text-center py-5">
                                            <p className="text-muted">Không tìm thấy sản phẩm nào.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CategoryPage;