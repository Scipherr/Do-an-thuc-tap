import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Star, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import '../../assets/css/style.scss';
import Header from './common/Header';
import Footer from './common/Footer';

const Home = () => {
    const [topRated, setTopRated] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Top Rated (Highlight Products)
                const topRes = await axios.get('http://127.0.0.1:8000/api/products/top-rated');
                if (topRes.data.status === 200) {
                    setTopRated(topRes.data.products);
                }

                // Fetch New Arrivals (New Products)
                const newRes = await axios.get('http://127.0.0.1:8000/api/products/new-arrivals');
                if (newRes.data.status === 200) {
                    setNewArrivals(newRes.data.products);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to format currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Helper to check image path (handles full URLs vs relative paths)
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/images/placeholder.jpg'; // Fallback
        if (imagePath.startsWith('http')) return imagePath;
        // Ensure it doesn't have double slash if DB has slash prefix
        return imagePath.startsWith('/') ? imagePath : `/${imagePath}`; 
    };

    return (
        <>
            <Header />

            <div className="sub-nav-container">
                <ul className="sub-nav">
                    <li><Link to="/category/fold">Galaxy Z Fold7</Link></li>
                    <li><Link to="/category/flip">Galaxy Z Flip7</Link></li>
                    <li><Link to="/category/s25">Galaxy S25 Ultra</Link></li>
                    <li><Link to="/category/watch">Galaxy Watch8</Link></li>
                    <li><Link to="/category/tab">Galaxy Tab S11</Link></li>
                </ul>
            </div>

            {/* HERO SECTION - Keeping this static for visual impact, or you can fetch banner from DB later */}
            <section className="hero-section">
                <div className="hero-bg">
                    {/* Ensure this image exists in public/images/ */}
                    <img src="/images/zflip7.jpg" alt="Galaxy Banner" onError={(e) => e.target.src = 'https://placehold.co/1920x800?text=Banner'} />
                </div>
                <div className="hero-content">
                    <h2 className="animate-text">Galaxy Z Fold7</h2>
                    <h3 className="gradient-text">Galaxy AI ✨</h3>
                    <p>Quyền năng AI trong tay bạn</p>
                    <div className="btn-group">
                        <Link to="/product/2" className="btn btn-dark">Mua ngay</Link>
                        <a href="#new-arrivals" className="btn btn-light">Tìm hiểu thêm</a>
                    </div>
                </div>
            </section>

            {/* NEW ARRIVALS GRID (Khám phá sản phẩm mới) */}
            <section className="products" id="new-arrivals">
                <h2 className="section-heading">Khám phá sản phẩm mới</h2>
                <div className="grid-container">
                    {loading ? (
                        <p className="text-center">Đang tải sản phẩm...</p>
                    ) : (
                        newArrivals.slice(0, 4).map((item) => (
                            <div className="card dark-card" key={item.ma_san_pham}>
                                <span className="badge">Mới</span>
                                <Link to={`/product/${item.ma_san_pham}`}>
                                    <img 
                                        src={getImageUrl(item.hinh_anh)} 
                                        alt={item.ten_san_pham} 
                                        onError={(e) => e.target.src = 'https://placehold.co/300x300?text=No+Image'}
                                    />
                                </Link>
                                <h3>
                                    <Link to={`/product/${item.ma_san_pham}`}>{item.ten_san_pham}</Link>
                                </h3>
                                {/* Color dots simulation - DB doesn't have colors yet, keeping static for UI */}
                                <div className="color-options">
                                    <span className="dot black"></span><span className="dot grey"></span>
                                </div>
                                <p className="price">{formatPrice(item.gia)}</p>
                                <Link to={`/product/${item.ma_san_pham}`} className="buy-btn btn-white-text">
                                    Mua ngay
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* FEATURE VIDEO 1 */}
            <section className="feature-section">
                <div className="feature-container">
                    <div className="feature-image">
                        <video width="100%" autoPlay loop muted playsInline className="rounded-4 shadow">
                            <source src="/images/videos25.webm" type="video/mp4" />
                            {/* Fallback if video missing */}
                            <img src="/images/s25.jpg" alt="Video Fallback" />
                        </video>
                    </div>
                    <div className="feature-text">
                        <h2>Galaxy S25 Ultra</h2>
                        <h3>Trợ lý quyền năng Galaxy AI</h3>
                        <p>Khai phóng tiềm năng sáng tạo và hiệu suất làm việc với sức mạnh AI đỉnh cao ngay trên thiết bị của bạn.</p>
                        <div className="btn-group" style={{justifyContent: 'flex-start'}}>
                            <Link to="/product/1" className="btn btn-black">Mua ngay</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SUB BANNER */}
            <section className="sub-banner-section">
                <img src="/images/bannerphu.jpeg" alt="TV Banner" className="sub-banner-img" onError={(e) => e.target.style.backgroundColor = '#000'}/>
                <div className="sub-banner-content">
                    <h2>Kỷ nguyên màn hình AI</h2>
                    <p>Trải nghiệm hình ảnh chân thực đến từng chi tiết với Neo QLED 8K</p>
                    <Link to="/category/tv" className="btn btn-white">Khám phá ngay</Link>
                </div>
            </section>

            {/* HIGHLIGHT PRODUCTS (Sản phẩm nổi bật - Top Rated) */}
            <section className="highlight-products">
                <h3 className="highlight-heading">Sản phẩm được yêu thích nhất</h3>
                <div className="grid-container">
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : (
                        topRated.map((item) => (
                            <div className="card" key={item.ma_san_pham}>
                                <div className="rating-badge">
                                    {item.diem_danh_gia} <Star size={12} fill="white" strokeWidth={0} />
                                </div>
                                <Link to={`/product/${item.ma_san_pham}`}>
                                    <img 
                                        src={getImageUrl(item.hinh_anh)} 
                                        alt={item.ten_san_pham} 
                                        onError={(e) => e.target.src = 'https://placehold.co/300x300?text=No+Image'}
                                    />
                                </Link>
                                <h3>
                                    <Link to={`/product/${item.ma_san_pham}`}>{item.ten_san_pham}</Link>
                                </h3>
                                <p className="price">{formatPrice(item.gia)}</p>
                                <Link to={`/product/${item.ma_san_pham}`} className="buy-btn">
                                    Xem chi tiết
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* STORIES SECTION */}
            <section className="stories-section">
                <h2 className="section-heading" style={{ textAlign: 'left', marginBottom: '30px' }}>Khám phá những câu chuyện</h2>
                <div className="stories-grid">
                    <div className="story-item">
                        <div className="story-card card-tv">
                            <Monitor size={60} color="white" strokeWidth={1.5} />
                        </div>
                        <p>Why Samsung Smart TV</p>
                    </div>
                    <div className="story-item">
                        <div className="story-card card-bespoke">
                            <span className="story-text-center">Bespoke AI <Star size={20} fill="white" /></span>
                        </div>
                        <p>Bespoke AI</p>
                    </div>
                    <div className="story-item">
                        <div className="story-card card-smartthings">
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <div style={{ width: '15px', height: '15px', border: '2px solid white', borderRadius: '50%' }}></div>
                                <div style={{ width: '30px', height: '30px', border: '2px solid white', borderRadius: '50%' }}></div>
                                <div style={{ width: '15px', height: '15px', border: '2px solid white', borderRadius: '50%' }}></div>
                            </div>
                        </div>
                        <p>SmartThings</p>
                    </div>
                    <div className="story-item">
                        <div className="story-card card-galaxy">
                            <span className="story-text-center">Galaxy AI <Star size={20} fill="white" /></span>
                        </div>
                        <p>Galaxy AI</p>
                    </div>
                    <div className="story-item">
                        <div className="story-card card-shop">
                            <ShoppingCart size={60} color="white" strokeWidth={1.5} />
                        </div>
                        <p>Buy Direct Get More</p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home;