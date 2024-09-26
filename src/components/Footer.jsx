import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { HandleFilterContext } from '../contexts/HandleFilterContext';
import '../assets/styles/Footer.css'
import GitHub from '../assets/imgs/logo-github 1.png'
import Instagram from '../assets/imgs/logo-instagram 1.png'
import Facebook from '../assets/imgs/logo-fb-simple 2.png'
import Twitter from '../assets/imgs/logo-twitter 2.png'
import CakeLogo from '../assets/imgs/stock-cake-logo-icon.png'
import Cake1 from '../assets/imgs/stock-cake-1.jpg'
import Cake2 from '../assets/imgs/stock-cake-2.jpg'
import Cake3 from '../assets/imgs/stock-cake-3.jpg'
import Cake4 from '../assets/imgs/stock-cake-4.jpg'

export default function Footer() {
    const { sendDataToShop } = useContext(HandleFilterContext);
    const [dateTime, setDateTime] = useState(new Date().toLocaleString());
    const [location, setLocation] = useState('Loading location...');
    
    const page = useLocation();

    const scrollToTop = (target) => {
        if(page && page.pathname.includes(target)) {
            window.scroll(0, 0);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
          setDateTime(new Date().toLocaleString());
        }, 1000);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5d17d6df60f4428cbbd8201876c1be33`);
                const address = response.data.results[0].formatted;
                setLocation(address);
              }
              catch (error) {
                setLocation('Unable to retrieve location');
              }
            },
            (error) => {
              setLocation('Location not available');
            }
          );
        }
        else {
          setLocation('Geolocation is not supported by this browser.');
        }
        return () => clearInterval(interval);
      }, []);

   return (
    <>
        <footer className="container-fluid footer-bg-color">
            <div className="container d-flex justify-content-between align-items-center footer-container">
                <div className="d-flex flex-column">
                    <div className="logo">
                        <img src={CakeLogo} alt="" style={{
                            width: '48px',
                            borderRadius: '100%',
                            marginRight: '12px'
                        }}/>
                        <p className='brand-title m-0'>
                            Bakerz Bite
                        </p>
                    </div>
                    <div className="title-body">
                        Our plan is to revolutionize and press on with the adventureful world of desserts, and our mission is to bring to each and everyone the highest quality baked pastries and products you'll have ever seen!
                    </div>
                    <div className='d-flex m-0 mt-2 py-2'>
                        <a href="https://www.twitter.com/" target='blank' className="social-icons socials-for-footer">
                            <img src={Twitter} alt="" />
                        </a>
                        <a href="https://www.facebook.com/" target='blank' className="social-icons socials-for-footer">
                            <img src={Facebook} alt="" />
                        </a>
                        <a href="https://www.instagram.com/" target='blank' className="social-icons socials-for-footer">
                            <img src={Instagram} alt="" />
                        </a>
                        <a href="https://github.com/cloodei/PostTest" target='blank' className="social-icons socials-for-footer">
                            <img src={GitHub} alt="" />
                        </a>
                    </div>
                </div> 
                <div className="footer-pages-section">
                    <div className='footer-pages'>
                        <p>Pages</p>
                        <Link onClick={() => scrollToTop('/')} className='nav-link' aria-current="page" to={"/"}>Home</Link>
                        <Link onClick={() => scrollToTop('/shop')} className='nav-link' aria-current="page" to={"/shop"}>Store</Link>
                        <Link onClick={() => scrollToTop('/gallery')} className='nav-link' aria-current="page" to={"/gallery"}>Gallery</Link>
                        <Link onClick={() => scrollToTop('/aboutUs')} className='nav-link' aria-current="page" to={"/aboutUs"}>About</Link>
                        <Link onClick={() => scrollToTop('/contactUs')} className='nav-link' aria-current="page" to={"/contactUs"}>Contacts</Link>
                    </div>
                    <div className="footer-pages">
                        <h4>Products</h4>
                        <Link aria-current="page" to={"/shop"} className='nav-link' onClick={() => sendDataToShop("Cakes")}>Cakes</Link>
                        <Link aria-current="page" to={"/shop"} className='nav-link' onClick={() => sendDataToShop("Pastries")}>Pastries</Link>
                        <Link aria-current="page" to={"/shop"} className='nav-link' onClick={() => sendDataToShop("Cookies")}>Cookies</Link>
                        <Link aria-current="page" to={"/shop"} className='nav-link' onClick={() => sendDataToShop("Pies")}>Pies</Link>
                        <Link aria-current="page" to={"/shop"} className='nav-link'>View More</Link>
                    </div>
                </div>
                <div className="promotions">
                    <p style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '22px',
                        width: '276px',
                    }}>Follow Instagram For More</p>
                    <div className="row mt-4">
                        <div className="col-6 p-0 cake-div">
                            <a href='https://www.instagram.com/' target='blank' className='cake-popup'></a>
                            <img src={Cake1} alt="" className='cake-imgs'/>
                        </div>
                        <div className="col-6 p-0 cake-div">
                            <a href='https://www.instagram.com/' target='blank' className='cake-popup'></a>
                            <img src={Cake2} alt="" className='cake-imgs'/>
                        </div>
                        <div className="col-6 p-0 cake-div">
                            <a href='https://www.instagram.com/' target='blank' className='cake-popup'></a>
                            <img src={Cake3} alt="" className='cake-imgs'/>
                        </div>
                        <div className="col-6 p-0 cake-div">
                            <a href='https://www.instagram.com/' target='blank' className='cake-popup'></a>
                            <img src={Cake4} alt="" className='cake-imgs'/>
                        </div>
                    </div>
                </div>
            </div>
            <p className='footer-copyright'>
                Copyright © 2024 Hashtag Developer. All Rights Reserved
            </p>
            <div className="scroll-container">
                <div className="scroll-text">
                    Current Time: {dateTime} | {location}
                </div>
            </div>
        </footer>
    </>
   )
}