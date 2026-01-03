import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
    Monitor, Star, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight, 
    Smartphone, Tv, Speaker, Snowflake, Zap, ShieldCheck, Truck, Headphones 
} from 'lucide-react';
import axios from 'axios';
import '../../assets/css/style.scss';
import Header from './common/Header.jsx';
import Footer from './common/Footer.jsx';

const Home = () => {
    const [topRated, setTopRated] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

  
    const BACKEND_URL = 'http://127.0.0.1:8000';

  
    const slides = [
        {
            id: 1,
            image: "/images/Galaxy-Z-Fold7_Home_Hero_PC_1920x1080_LTR.jpeg",
            title: "Galaxy Z Fold7",
            subtitle: "Quyền năng AI trong tay bạn",
            link: "/category/fold",
            color: "white"
        },
        {
            id: 2,
            image: "/images/7B69EB838C3346F-S25-Ultra-Banner1.jpg",
            title: "Galaxy S25 Ultra",
            subtitle: "Titanium đẳng cấp. Hiệu năng vô cực.",
            link: "/category/s25",
            color: "white"
        },
        {
            id: 3,
            image: "/images/Galaxy-S25-Ultra_Home_Feature_KV_PC_1440x810_LTR.jpeg",
            title: "Trải nghiệm AI",
            subtitle: "Kỷ nguyên mới của công nghệ di động",
            link: "/category/s25",
            color: "black"
        }
    ];

    const categories = [
        { name: "Điện thoại", icon: <Smartphone />, link: "/category/dien-thoai" },
        { name: "TV & AV", icon: <Tv />, link: "/category/tv" },
        { name: "Gia dụng", icon: <Snowflake />, link: "/category/gia-dung" },
        { name: "Phụ kiện", icon: <Headphones />, link: "/category/phu-kien" },
    ];

    const features = [
        { icon: <Truck size={32}/>, title: "Giao hàng miễn phí", desc: "Cho tất cả đơn hàng" },
        { icon: <ShieldCheck size={32}/>, title: "Bảo hành chính hãng", desc: "Cam kết 100%" },
        { icon: <Zap size={32}/>, title: "Hỗ trợ 24/7", desc: "Bất cứ khi nào bạn cần" },
    ];

  
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const topRes = await axios.get(`${BACKEND_URL}/api/products/top-rated`);
                if (topRes.data.status === 200) setTopRated(topRes.data.products);

                const newRes = await axios.get(`${BACKEND_URL}/api/products/new-arrivals`);
                if (newRes.data.status === 200) setNewArrivals(newRes.data.products);
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    
    const useOnScreen = (options) => {
        const ref = useRef(null);
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            }, options);
            if (ref.current) observer.observe(ref.current);
            return () => {
                if (ref.current) observer.unobserve(ref.current);
            };
        }, [ref, options]);
        return [ref, isVisible];
    };

    const [refSection1, isVisibleSection1] = useOnScreen({ threshold: 0.1 });
    const [refSection2, isVisibleSection2] = useOnScreen({ threshold: 0.1 });

    const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    
    
    const getImageUrl = (imagePath) => {
        if (!imagePath || imagePath === 'null' || imagePath === '') {
            return 'https://placehold.co/400x400/png?text=No+Image';
        }
        if (imagePath.startsWith('http')) return imagePath;
        
        
        const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
        return `${BACKEND_URL}/${cleanPath}`;
    };

    const nextSlide = () => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    const prevSlide = () => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);

    return (
        <>
            <Header />

            
            <div className="sub-nav-container sticky-sub-nav">
                <ul className="sub-nav">
                    {['Galaxy Z Fold7', 'Galaxy Z Flip7', 'Galaxy S25 Ultra', 'Galaxy Watch8', 'TV OLED'].map((item, index) => (
                        <li key={index}><Link to={`/category/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link></li>
                    ))}
                </ul>
            </div>

            {/* === 1. HERO SLIDER === */}
            <section className="hero-slider">
                {slides.map((slide, index) => (
                    <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={slide.id}>
                        <div className="slide-bg">
                            <img src={slide.image} alt={slide.title} />
                        </div>
                        <div className={`slide-content text-${slide.color}`}>
                            <h2 className="animate-reveal delay-1">{slide.title}</h2>
                            <p className="animate-reveal delay-2">{slide.subtitle}</p>
                            <Link to={slide.link} className={`btn btn-hero animate-reveal delay-3 ${slide.color === 'white' ? 'btn-white' : 'btn-black'}`}>
                                Mua ngay
                            </Link>
                        </div>
                    </div>
                ))}
                
                <button className="slider-btn prev" onClick={prevSlide}><ChevronLeft /></button>
                <button className="slider-btn next" onClick={nextSlide}><ChevronRight /></button>
                
                <div className="slider-dots">
                    {slides.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`dot ${idx === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(idx)}
                        ></div>
                    ))}
                </div>
            </section>

           
          
            

           
            <section className={`products section-padding fade-in-section ${isVisibleSection1 ? 'is-visible' : ''}`} ref={refSection1} id="new-arrivals">
                <div className="section-header">
                    <h2 className="section-heading">Mới ra mắt</h2>
                    <Link to="/category/all" className="view-all-link">Xem tất cả <ArrowRight size={16}/></Link>
                </div>
                
                <div className="grid-container">
                    {loading ? (
                        [1,2,3,4].map(n => <div key={n} className="skeleton-card"></div>)
                    ) : (
                        newArrivals.slice(0, 4).map((item) => (
                            <div className="card product-card-hover" key={item.ma_san_pham}>
                                <div className="card-image-wrapper">
                                    <span className="badge-new">New</span>
                                    <Link to={`/collections/all/product/${item.ma_san_pham}`}>
                                        <img 
                                            src={getImageUrl(item.hinh_anh)} 
                                            alt={item.ten_san_pham} 
                                            onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x400/png?text=No+Image"}}
                                        />
                                    </Link>
                                </div>
                                <div className="card-info">
                                    <h3><Link to={`/collections/all/product/${item.ma_san_pham}`}>{item.ten_san_pham}</Link></h3>
                                    <p className="price">{formatPrice(item.gia)}</p>
                                    <button className="btn-add-cart">Thêm vào giỏ</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <section className="products section-padding bg-light">
                <div className="section-header">
                    <h2 className="section-heading">Sản phẩm được yêu thích nhất</h2>
                    <Link to="/category/top-rated" className="view-all-link">Xem thêm <ArrowRight size={16}/></Link>
                </div>
                <div className="grid-container">
                    {loading ? (
                         [1,2,3,4].map(n => <div key={n} className="skeleton-card"></div>)
                    ) : (
                        topRated.slice(0, 4).map((item) => (
                            <div className="card clean-card" key={item.ma_san_pham}>
                                
                                <Link to={`/collections/all/product/${item.ma_san_pham}`}>
                                    <img 
                                        src={getImageUrl(item.hinh_anh)} 
                                        alt={item.ten_san_pham} 
                                        onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x400/png?text=No+Image"}}
                                    />
                                </Link>
                                
                                    
                               
                                <div className="clean-info">
                                    <h3>{item.ten_san_pham}</h3>
                                    <p className="price-bold">{formatPrice(item.gia)}</p>
                                    <p>{item.diem_danh_gia || 5} <Star size={12} fill="#FFD700" strokeWidth={0} /></p>
                                    
                                    <button className="btn-sm-buy">Mua ngay</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

           
            <section className="feature-section-cinematic">
                <div className="video-container">
                    <video autoPlay loop muted playsInline>
                        <source src="/images/videos25.webm" type="video/mp4" />
                        <img src="/images/s25.jpg" alt="Video Fallback" />
                    </video>
                    <div className="video-overlay">
                        <h2>Galaxy S25 Ultra</h2>
                        <h3>Trợ lý quyền năng Galaxy AI</h3>
                        <Link to="/category/s25" className="btn btn-outline-white">Khám phá ngay</Link>
                    </div>
                </div>
            </section>

           
            

         
             <section className={`stories-section section-padding fade-in-section ${isVisibleSection2 ? 'is-visible' : ''}`} ref={refSection2}>
                <h2 className="section-heading text-left">Hệ sinh thái Galaxy</h2>
                <div className="bento-grid">
                   
                    <div className="bento-item large-item" style={{backgroundImage: "url('/images/switchtogalaxy.avif')"}}>
                        <div className="bento-content">
                            <h3>Switch to Galaxy</h3>
                            <p>Chuyển đổi dữ liệu dễ dàng</p>
                        </div>
                    </div>

                    
                    <div className="bento-item medium-item" style={{backgroundColor: '#000'}}>
                        <div className="bento-content center">
                            <Monitor size={48} color="white" />
                            <h3>Smart TV</h3>
                            <p>Nâng tầm giải trí tại gia</p>
                        </div>
                    </div>

                    
                    <div className="bento-item medium-item gradient-blue">
                        <div className="bento-content center">
                            <h3>Galaxy AI ✨</h3>
                            <p>Quyền năng mới</p>
                        </div>
                    </div>

                   
                    <div className="bento-item wide-item" style={{backgroundImage: "url('/images/samsunghealth.avif')"}}>
                        <div className="bento-content dark-overlay">
                            <h3>Samsung Health</h3>
                            <p>Theo dõi sức khỏe toàn diện cùng Galaxy Watch</p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="sub-banner-section">
                <img src="/images/bannerphu.jpeg" alt="TV Banner" className="sub-banner-img" />
                <div className="sub-banner-content animate-up">
                    <h2>Kỷ nguyên màn hình AI</h2>
                    <p>Trải nghiệm hình ảnh chân thực đến từng chi tiết</p>
                    <Link to="/category/tv" className="btn btn-white-glass">Tìm hiểu thêm</Link>
                </div>
            </section>

             
             
            <Footer />
        </>
    )
}

export default Home;