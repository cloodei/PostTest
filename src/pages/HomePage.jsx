import React, { useState, useEffect, useContext } from "react"
import '../assets/styles/Home.css'
import { HandleFilterContext } from "../contexts/HandleFilterContext";
import { Link } from "react-router-dom"
import BannerImage from '../assets/imgs/modal-black-forest-cake.jpg'
import Modal from "../components/Modal"
import Slider from "../components/Slider"
import FeedbackComment from "../components/FeedbackComment";
import data from "../Data/data"
import globalVar from "../globalVar";
import FeedbackImage2 from '../assets/imgs/—Pngtree—minimalistic character illustration simple personality_3785140.png'
import StarIcon from '../assets/imgs/star-icon-2-removebg-preview.png'
import HomeMenuCard from "../components/HomeMenuCard"
import ImageModal from "../components/ImageModal"
import CakeMenu from '../assets/imgs/mug-menu.png'
import PieMenu from '../assets/imgs/bag-menu.png'
import CookieMenu from '../assets/imgs/cap-menu.png'
import PastryMenu from '../assets/imgs/shirt-menu.png'

export default function HomePage() {
    const { sendDataToShop } = useContext(HandleFilterContext);
    let dataMerch = [];
    
    for (let i = 40; i < 56; i++) {
        dataMerch.push(globalVar.listData[i]);
    }
    const dataList = data;
    const [showModal, setShowModal] = useState(false)
    const [menuName, setMenuName] = useState('mugs')
    const openModal = (mName) => {
        setShowModal(true);
        setMenuName(mName);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    const slides = ['Cakes', 'Cookies', 'Pies', 'Pastries'];

    const handleMouseOverDropdown = () => {
        document.querySelector('.dropdown-menu').classList.add('d-block');
    }
    const handleMouseOutDropdown = () => {
        document.querySelector('.dropdown-menu').classList.remove('d-block');
    }

    const [hoveredStarValue, setHoveredStarValue] = useState(0);
    const [selectedStarValue, setSelectedStarValue] = useState(0);
    const handleMouseOverStar = (value) => {
        setHoveredStarValue(value);
    }
    const handleMouseOutStar = () => {
        setHoveredStarValue(0)
    }
    const handleClickStar = (value) => {
        setSelectedStarValue(value)
    }
    const handleClickLater = () => {
        handleMouseOutDropdown();
        setSelectedStarValue(0);
    }

    const [showImage, setShowImage] = useState(false);
    const [dataImage, setDataImage] = useState(null);
    const showImageModal = (image) => {
        setShowImage(true);
        setDataImage(image);
    }
    const closeImageModal = () => {
        setShowImage(false);
    }

    useEffect(() => {
        const applyInViewClass = () => {
            const homeBanner = document.querySelector('.home-banner');
            if (homeBanner) {
                homeBanner.classList.add('in-view');
                homeBanner.querySelectorAll('img, p, .banner-btns').forEach(innerElement => {
                    innerElement.classList.add('in-view');
                });
            }
            const options = {
                threshold: 0.2
            };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('sections') && entry.target.id !== 'menu') {
                            entry.target.classList.add('in-view');
                        }
                        if (entry.target.classList.contains('product')) {
                            entry.target.classList.add('in-view');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            const sections = document.querySelectorAll('.sections');
            sections.forEach(section => {
                observer.observe(section);
            });

            const products = document.querySelectorAll('.product');
            products.forEach(product => {
                observer.observe(product);
            });

            return () => {
                sections.forEach(section => {
                    observer.unobserve(section);
                });
                products.forEach(product => {
                    observer.unobserve(product);
                });
            };
        };
        if(window.scrollY === 0) {
            applyInViewClass();
        }
        else {
            window.scrollTo({ top: 0, behavior: 'auto' });
            const handleScrollEnd = () => {
                setTimeout(() => {
                    applyInViewClass();
                    document.removeEventListener("scrollend", handleScrollEnd);
                }, 250);
            };
            document.addEventListener("scrollend", handleScrollEnd);
        }
    }, []);

    return (
<>
    <div className="container-fluid home-banner">
        <img src={BannerImage} style={{
            height: '280px',
            margin: '0 28px',
            borderRadius: '250px'
        }}/>
        <p className="banner-description">
            Explore a world of exquisite flavors. Our bakers use only the finest ingredients, ensuring that each creation is a testament to the standards we uphold.
        </p>
        <div className="w-100 banner-btns">
            <a href="#offers" className="order-banner-btn">
                View Offers
            </a>
            <a href="#menu" className="menu-btn">
                Explore Menu
            </a>
        </div>
    </div>
    <div className="container-fluid position-relative">
        <div className="container bg-container">
            <div className="sections" id="menu">
                <div className="browse-menu">
                    <h2 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans, serif',
                        fontSize: '46px',
                        letterSpacing: '1px',
                        marginBottom: '12px'
                    }}>
                        Browse Our Menu
                    </h2>
                    <div className="gallery-container mb-0 gallery-container-homepage" style={{
                        paddingTop: '0',
                        paddingBottom : '12px',
                        gap: '0',
                    }}>
                        <div className="product product-home home-menu-bg" id='GalleryCakes'>
                            <div className="row px-2">
                                <div className="home-menu-header-container">
                                    <h1 style={{
                                        textAlign: 'center',
                                        fontSize: '42px',
                                        fontFamily: 'Pacifico',
                                    }}>
                                        Cakes
                                    </h1>   
                                    <Link aria-current="page" to={"/shop"} onClick={() => sendDataToShop("Cakes")}>View More</Link>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[7]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[4]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[1]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[0]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[9]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                            </div>
                        </div>
                        <div className="product product-home home-menu-bg position-relative" id='GalleryPies'>
                            <div className="row px-2">
                                <div className="home-menu-header-container">
                                    <h1 style={{
                                        textAlign: 'center',
                                        fontSize: '42px',
                                        fontFamily: 'Pacifico'
                                    }}>
                                        Pies
                                    </h1>
                                    <Link aria-current="page" to={"/shop"} onClick={() => sendDataToShop("Pies")}>View More</Link>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[14]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[15]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[11]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[16]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[13]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                            </div>
                        </div>
                        <div className="product product-home home-menu-bg position-relative" id='GalleryCookies'>
                            <div className="row px-2">
                                <div className="home-menu-header-container">
                                    <h1 style={{
                                        textAlign: 'center',
                                        fontSize: '42px',
                                        fontFamily: 'Pacifico'
                                    }}>Cookies</h1>
                                    <Link aria-current="page" to={"/shop"} onClick={() => sendDataToShop("Cookies")}>View More</Link>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[21]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[24]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[25]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[29]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[23]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                            </div>
                        </div>
                        <div className="product product-home home-menu-bg position-relative" id='GalleryPastries'>
                            <div className="row px-2">
                                <div className="home-menu-header-container">
                                    <h1 style={{
                                        textAlign: 'center',
                                        fontSize: '42px',
                                        fontFamily: 'Pacifico'
                                    }}>Pastries</h1>
                                    <Link aria-current="page" to={"/shop"} onClick={() => sendDataToShop("Pastries")}>View More</Link>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[37]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[39]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[31]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[36]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                                <div className="col" style={{
                                    padding: '0 12px',
                                }}>
                                    <HomeMenuCard data={data[34]} showImageModal={showImageModal}></HomeMenuCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sections" id="merch" style={{
                paddingTop: '8px'
            }}>
                <div className="browse-menu">
                    <h1 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans, serif',
                        fontSize: '46px',
                        letterSpacing: '1px',
                        marginBottom: '48px',
                    }}>
                        Our Merchandise
                    </h1>
                    <div className="row gap-3 px-12">
                        <div className="col-3 menu-card" onClick={() => {openModal('mugs')}}>
                            <div className="img-placeholder">
                                <img src={CakeMenu} alt="" style={{
                                    height:'72px',
                                    scale: '1.55'
                                }}/>
                            </div>
                            <h2 style={{
                                textAlign: 'center'
                            }}>Mugs</h2>
                            <span>View all of our current series merchandise sales and offers coming each purchase</span>
                            <button onClick={() => {openModal('mugs')}}>VIEW MERCH</button>
                        </div>
                        <div className="col-3 menu-card" onClick={() => {openModal('bags')}}>
                            <div className="img-placeholder">
                                <img src={PieMenu} alt="" style={{
                                    height:'72px'
                                }} />
                            </div>
                            <h2 style={{
                                textAlign: 'center'
                            }}>Bags</h2>
                            <span>View all of our current series merchandise sales and offers coming each purchase</span>
                            <button onClick={() => {openModal('bags')}}>VIEW MERCH</button>
                        </div>
                        <div className="col-3 menu-card" onClick={() => {openModal('caps')}}>
                            <div className="img-placeholder">
                                <img src={CookieMenu} alt="" style={{
                                    height:'68px'
                                }}/>
                            </div>
                            <h2 style={{
                                textAlign: 'center'
                            }}>Caps</h2>
                            <span>View all of our current series merchandise sales and offers coming each purchase</span>
                            <button onClick={() => {openModal('caps')}}>VIEW MERCH</button>
                        </div>
                        <div className="col-3 menu-card" onClick={() => {openModal('shirts')}}>
                            <div className="img-placeholder">
                                <img src={PastryMenu} alt="" style={{
                                    height: '68px'
                                }}/>
                            </div>
                            <h2 style={{
                                textAlign: 'center'
                            }}>T-Shirts</h2>
                            <span>View all of our current series merchandise sales and offers coming each purchase</span>
                            <button onClick={() => {openModal('shirts')}}>VIEW MERCH</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sections" id="offers">
                <div className="browse-menu slide-menu" style={{
                    padding: '16px 0px',
                    paddingBottom: '36px'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans, serif',
                        fontSize: '44px',
                        letterSpacing: '1px',
                        marginBottom: '4px',
                        marginTop: '12px'
                    }}>
                        Special Offers
                    </h1>
                    <Slider slides={slides} data={dataList}></Slider>
                </div>
            </div>
            <div className="section" id="feedback" style={{
                paddingTop: '0px'
            }}>
                <div className="browse-menu">
                    <h1 style={{
                        textAlign: 'center',
                        fontFamily: 'DM Sans, serif',
                        fontSize: '46px',
                        letterSpacing: '1px',
                        marginBottom: '44px',
                        marginTop: '0px'
                    }}>
                        Feedback
                    </h1>
                    <FeedbackComment></FeedbackComment>
                    <div className="feedback-section">
                        <img src={FeedbackImage2} alt="" className="feedback-img"/>
                        <div className="feedback-box">
                            <p className="feedback-header">Can we ask for your participation?</p>
                            <p className="feedback-body">Let us know which you prefer and what we're gotten done correctly and what we can still improve</p>
                            <a href="https://www.google.com/forms/" target="blank" className="feedback-btn">Answer Servey</a>
                        </div>
                        <div className="feedback-rating-box">
                            <p style={{
                                fontSize: '20px',
                                marginBottom: '8px'
                            }}>Give us a rating!</p>
                            <div className="feedback-rating dropdown" onMouseOver={handleMouseOverDropdown} onMouseOut={handleMouseOutDropdown}>
                                <div className="placeholder-star">
                                    <img src={StarIcon} alt="" className="star-img"/>
                                </div>
                                <ul className="dropdown-menu">
                                    <h4 style={{
                                        textAlign: 'center',
                                        fontFamily: '"DM Sans", serif'
                                    }}>Rate your experience</h4>
                                    <div className="star-ratings">
                                        <span key={1} className={`star ${1 <= (hoveredStarValue || selectedStarValue) ? 'active' : ''}`}
                                        onMouseOver={() => handleMouseOverStar(1)}
                                        onMouseOut={handleMouseOutStar}
                                        onClick={() => handleClickStar(1)}>
                                        &#9733;
                                        </span>
                                        <span key={2} className={`star ${2 <= (hoveredStarValue || selectedStarValue) ? 'active' : ''}`}
                                        onMouseOver={() => handleMouseOverStar(2)}
                                        onMouseOut={handleMouseOutStar}
                                        onClick={() => handleClickStar(2)}>
                                        &#9733;
                                        </span>
                                        <span key={3} className={`star ${3 <= (hoveredStarValue || selectedStarValue) ? 'active' : ''}`}
                                        onMouseOver={() => handleMouseOverStar(3)}
                                        onMouseOut={handleMouseOutStar}
                                        onClick={() => handleClickStar(3)}>
                                        &#9733;
                                        </span>
                                        <span key={4} className={`star ${4 <= (hoveredStarValue || selectedStarValue) ? 'active' : ''}`}
                                        onMouseOver={() => handleMouseOverStar(4)}
                                        onMouseOut={handleMouseOutStar}
                                        onClick={() => handleClickStar(4)}>
                                        &#9733;
                                        </span>
                                        <span key={5} className={`star ${5 <= (hoveredStarValue || selectedStarValue) ? 'active' : ''}`}
                                        onMouseOver={() => handleMouseOverStar(5)}
                                        onMouseOut={handleMouseOutStar}
                                        onClick={() => handleClickStar(5)}>
                                        &#9733;
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between ps-1">
                                        <span className="align-start" onClick={() => handleClickStar(1)}>
                                            Hate it...
                                        </span>
                                        <span className="align-end" onClick={() => handleClickStar(5)}>
                                            Love it!
                                        </span>
                                    </div>
                                    <button className="later-btn" onClick={handleClickLater}>Maybe Later</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Modal show={showModal} Close={closeModal} menuName={menuName} data={dataMerch} showImageModal={showImage}></Modal>
    <ImageModal imageUrl={dataImage} showImageModal={showImage} closeImageModal={closeImageModal} showModal={showModal}></ImageModal>
</>
    )
}