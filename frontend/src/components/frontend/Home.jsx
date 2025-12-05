import React from 'react';
import { Search, ShoppingCart, User, Menu, Star, Smartphone, Monitor, Watch } from 'lucide-react';
// Styles are already imported in App.jsx, so we don't strictly need them here, 
// but if needed, use absolute path:
// import '/src/assets/css/style.scss'; 

import Header from '/src/components/frontend/common/Header.jsx';
import Footer from '/src/components/frontend/common/Footer.jsx';

// Importing Images using absolute paths from /src to avoid relative path resolution errors
import HeroBannerImg from '/src/assets/images/Galaxy-Z-Fold7_Home_Hero_PC_1920x1080_LTR.jpeg';
import S25UltraCardImg from '/src/assets/images/s25xin.webp';
import ZFlip7CardImg from '/src/assets/images/Galaxy-Z-Flip7.avif';
import WatchCardImg from '/src/assets/images/dongho.jpg';
import TVCardImg from '/src/assets/images/TV2.avif';
import S25FeatureImg from '/src/assets/images/Galaxy-S25-Ultra_Home_Feature_KV_PC_1440x810_LTR.jpeg';
import SubBannerImg from '/src/assets/images/neoQled.jpg';
import TVFeatureImg from '/src/assets/images/TV.jpg';
import NeoItemImg from '/src/assets/images/TV2.avif';
import OledItemImg from '/src/assets/images/tv55inch.avif';
import LoaItemImg from '/src/assets/images/loa.webp';
import FrameItemImg from '/src/assets/images/frame.avif';

const Home = () => {
return (
    <>
    <Header/>
    
    <div className="sub-nav-container">
        <ul className="sub-nav">
            <li><a href="#">Galaxy Z Fold7</a></li>
            <li><a href="#">Galaxy Z Flip7</a></li>
            <li><a href="#">Galaxy S25 Ultra</a></li>
            <li><a href="#">Galaxy Watch8</a></li>
            <li><a href="#">Galaxy Tab S11</a></li>
        </ul>
    </div>

    {/* HERO SECTION */}
    <section className="hero-section">
        <div className="hero-bg">
            <img src={HeroBannerImg} alt="Galaxy Z Fold7 Banner"/>
        </div>
        <div className="hero-content">
            <h2 className="animate-text">Galaxy Z Fold7</h2>
            <h3 className="gradient-text">Galaxy AI ✨</h3>
            <p>Quyền năng AI trong tay bạn</p>
            <div className="btn-group">
                <a href="#" className="btn btn-dark">Mua ngay</a>
                <a href="#" className="btn btn-light">Tìm hiểu thêm</a>
            </div>
        </div>
    </section>

    {/* PRODUCT GRID */}
    <section className="products">
        <h2 className="section-heading">Khám phá sản phẩm mới</h2>
        <div className="grid-container">
            <div className="card dark-card">
                <span className="badge">Siêu phẩm</span>
                <img src={S25UltraCardImg} alt="Galaxy S25 Ultra"/>
                <h3>Galaxy S25 Ultra</h3>
                <div className="color-options">
                    <span className="dot black"></span><span className="dot grey"></span>
                </div>
                <p className="price" style={{color: '#ccc'}}>33.372.000 ₫</p>
                <button className="buy-btn" style={{background: 'white', color: 'black'}}>Mua ngay</button>
            </div>

            <div className="card dark-card">
                <span className="badge">Bán chạy</span>
                <img src={ZFlip7CardImg} alt="Galaxy Z Flip7"/>
                <h3>Galaxy Z Flip7</h3>
                <div className="color-options">
                    <span className="dot blue"></span><span className="dot mint"></span>
                </div>
                <p className="price">28.990.000 ₫</p>
                <button className="buy-btn" style={{background: 'white', color: 'black'}}>Mua ngay</button>
            </div>

            <div className="card dark-card">
                <img src={WatchCardImg} alt="Galaxy Watch8"/>
                <h3>Galaxy Watch8</h3>
                <div className="color-options">
                    <span className="dot black"></span>
                </div>
                <p className="price">11.189.000 ₫</p>
                <button className="buy-btn" style={{background: 'white', color: 'black'}}>Mua ngay</button>
            </div>

            <div className="card dark-card">
                <img src={TVCardImg} alt="Neo QLED TV"/>
                <h3>Neo QLED 8K</h3>
                <div className="color-options">
                    <span className="dot black"></span>
                </div>
                <p className="price">14.900.000 ₫</p>
                <button className="buy-btn" style={{background: 'white', color: 'black'}}>Mua ngay</button>
            </div>
        </div>
    </section>

    {/* FEATURE SECTION 1 (S25 Ultra) */}
    <section className="feature-section">
        <div className="feature-container">
            <div className="feature-image">
                 <img src={S25FeatureImg} alt="Galaxy S25 Ultra Feature" className="rounded-4 shadow" style={{width: '100%', height: 'auto', borderRadius: '30px'}} />
            </div>
            <div className="feature-text">
                <h2>Galaxy S25 Ultra</h2>
                <h3>Trợ lý quyền năng Galaxy AI</h3>
                <p>Khai phóng tiềm năng sáng tạo và hiệu suất làm việc với sức mạnh AI đỉnh cao ngay trên thiết bị của bạn.</p>
                <a href="#" className="btn btn-black">Khám phá ngay</a> &nbsp;
                <a href="#" className="btn btn-black">Mua ngay</a>
            </div>
        </div>  
    </section>

    {/* SUB BANNER */}
    <section className="sub-banner-section">
        <img src={SubBannerImg} alt="Neo QLED Banner" className="sub-banner-img"/>
        <div className="sub-banner-content">
            <h2>Kỷ nguyên màn hình AI</h2>
            <p>Trải nghiệm hình ảnh chân thực đến từng chi tiết với Neo QLED 8K</p>
            <a href="#" className="btn btn-white" style={{color: 'black', background: 'white', border: 'none'}}>Khám phá ngay</a>
        </div>
    </section>

    {/* FEATURE SECTION 2 (TV AI) */}
     <section className="feature-section">
        <div className="feature-container">
            <div className="feature-image">
                 <img src={TVFeatureImg} alt="Samsung Vision AI" className="rounded-4 shadow" style={{width: '100%', height: 'auto', borderRadius: '30px'}} />
            </div>
            <div className="feature-text">
                <h2>Kỷ nguyên màn hình AI</h2>
                <h3>Trợ lý quyền năng Galaxy AI</h3>
                <p>Trải nghiệm hình ảnh chân thực đến từng chi tiết với Neo QLED 8K.</p>
                <a href="#" className="btn btn-black">Khám phá ngay</a> &nbsp;
                <a href="#" className="btn btn-black">Mua ngay</a>
            </div>
        </div>
    </section>

    {/* HIGHLIGHT PRODUCTS */}
    <section className="highlight-products">
        <h3 className="highlight-heading">Sản phẩm nổi bật</h3>
        <div className="grid-container">
            <div className="card">
                <img src={NeoItemImg} alt="Neo QLED 8K"/>
                <h3>Neo QLED 8K</h3>
                <p className="price">49.900.000 ₫</p>
                <button className="buy-btn">Mua ngay</button>
            </div>
            <div className="card">
                <img src={OledItemImg} alt="OLED 4K S95D"/>
                <h3>OLED 4K S95D</h3>
                <p className="price">39.900.000 ₫</p>
                <button className="buy-btn">Mua ngay</button>
            </div>
            <div className="card">
                <img src={LoaItemImg} alt="Loa Q-Series"/>
                <h3>Loa Q-Series</h3>
                <p className="price">14.990.000 ₫</p>
                <button className="buy-btn">Mua ngay</button>
            </div>
            <div className="card">
                <img src={FrameItemImg} alt="Music Frame"/>
                <h3>Music Frame</h3>
                <p className="price">7.990.000 ₫</p>
                <button className="buy-btn">Mua ngay</button>
            </div>
        </div>
    </section>

    {/* STORIES SECTION */}
    <section className="stories-section">
        <h2 className="section-heading" style={{textAlign: 'left', marginBottom: '30px'}}>Khám phá những câu chuyện</h2>
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
                    <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
                        <div style={{width:'15px', height:'15px', border:'2px solid white', borderRadius:'50%'}}></div>
                        <div style={{width:'30px', height:'30px', border:'2px solid white', borderRadius:'50%'}}></div>
                        <div style={{width:'15px', height:'15px', border:'2px solid white', borderRadius:'50%'}}></div>
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

    <Footer/>
    </>
)
}

export default Home;