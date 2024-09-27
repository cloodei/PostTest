import CakeLogo from '../assets/imgs/stock-cake-logo-icon.png'
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.css'
import Phone from '../assets/imgs/phone-icon.png'
import Gmail from '../assets/imgs/gmail-icon.png'
import GitHub from '../assets/imgs/logo-github 1.png'
import Instagram from '../assets/imgs/logo-instagram 1.png'
import Facebook from '../assets/imgs/logo-fb-simple 2.png'
import Twitter from '../assets/imgs/logo-twitter 2.png'
import { cartContext } from '../contexts/CartContext';
import { useContext } from 'react';

function Header() {
    const { cartProducts } = useContext(cartContext);
    const location = useLocation();
    const scrollToTop = (target) => {
        if(location && location.pathname.includes(target)) {
            window.scroll(0, 0);
        }
    }
    return (
<>
    <nav className="navbar sticky-top navbar-expand-lg bg-light p-0">
        <div className="container-fluid p-0 d-flex flex-column">
            <div className="header-contacts w-100">
                <div className='container d-flex justify-content-between'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className="d-flex align-items-center justify-content-between">
                            <img src={Phone} alt="" />
                            <p className='text-line'>
                                (420) 100 - 0101
                            </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between ms-3">
                            <img src={Gmail} alt="" />
                            <p className='text-line'>
                                bakerz-bite@gmail.com
                            </p>
                        </div>
                    </div>
                    <ul className='d-flex align-items-center justify-content-between m-0 p-1'>
                        <Link className='social-icons' to={'/addProduct'}>
                            <img src={Twitter} alt="" />
                        </Link>
                        <Link className='social-icons' to={'/productsView'}>
                            <img src={Facebook} alt="" />
                        </Link>
                        <li className='social-icons'>
                            <img src={Instagram} alt="" />
                        </li>
                        <a href='https://github.com/cloodei/PostTest' target='_blank' className='social-icons' style={{ textDecoration: 'none' }}>
                            <img src={GitHub} alt="" />
                        </a>
                    </ul>
                </div>
            </div>
            <div className="header-bg w-100 ">
                <div className="container d-flex justify-content-between">
                    <div className="p-1 d-flex justify-content-between">
                        <img src={CakeLogo} style={{
                            height: '42px',
                            borderRadius: '100%',
                            marginRight: '12px'
                        }} alt="" />
                        <Link aria-current="page" to={"/"} onClick={() => scrollToTop('/')} className='d-flex align-items-center text-center font-pacifico logo-font'>Bakerz Bite</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-8" style={{
                            padding: '4px',
                            paddingBottom: '6px',
                        }}>
                            <li className="nav-item fw-semibold">
                                <Link onClick={() => scrollToTop('/')} className={`nav-link page-titles ${location.pathname === '/' ? 'page-titles-focus' : ''}`} aria-current="page" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item fw-semibold">
                                <Link onClick={() => scrollToTop('/')} className={`nav-link page-titles ${location.pathname.includes('/shop') ? 'page-titles-focus' : ''}`} aria-current="page" to={"/shop"}>Products</Link>
                            </li>
                            <li className="nav-item fw-semibold">
                                <Link onClick={() => scrollToTop('/')} className={`nav-link page-titles ${location.pathname === '/gallery' ? 'page-titles-focus' : ''}`} aria-current="page" to={"/gallery"}>Gallery</Link>
                            </li>
                            <li className="nav-item fw-semibold">
                                <Link onClick={() => scrollToTop('/')} className={`nav-link page-titles ${location.pathname === '/aboutUs' ? 'page-titles-focus' : ''}`} aria-current="page" to={"/aboutUs"}>About Us</Link>
                            </li>
                            <li className="nav-item fw-semibold">
                                <Link onClick={() => scrollToTop('/')} className={`nav-link page-titles ${location.pathname === '/contactUs' ? 'page-titles-focus' : ''}`} aria-current="page" to={"/contactUs"}>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='d-flex align-items-center gap-3'>
                        <Link onClick={() => scrollToTop('/')} className={`nav-link position-relative cart-titles ${location.pathname.includes('/cart') ? 'cart-titles-focus' : ''}`} aria-current="page" to={"/cart"}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className={`bg-danger alert-cart  ${!cartProducts.length || location.pathname.includes('/cart') ? 'd-none' : ''}`}>
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        </Link>
                        <button className='order-btn order-btn-header'>
                            Order now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</>
)
}

export default Header;