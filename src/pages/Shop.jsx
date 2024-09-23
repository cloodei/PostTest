import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import globalVar from "../globalVar";
import '../assets/styles/Gallery.css'
import ModalGallery from "../components/ModalGallery";
import SliderCard from "../components/SliderCardGallery";
import { HandleFilterContext } from "../contexts/HandleFilterContext";
import { Button, Typography, Container, Card, CardContent, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

export default function Shop() {
    const data = [...globalVar.listData]
    const { state, setState } = useContext(HandleFilterContext);
    const [filterer, setFilterer] = useState({
        Cakes: false,
        Pies: false,
        Cookies: false,
        Pastries: false,
        Offers: false,
        Merch: false,
    });
    const [typeData, setTypeData] = useState("")
    const [filteredData, setFilteredData] = useState(data);
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState(data[0]);

    const openModal = (data) => {
        setShowModal(true);
        setModalData(data);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        document.querySelectorAll('.gallery-product-container .col').forEach((col) => {
            col.classList.add('shop-col');
        });
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    useEffect(() => {
        const applyInViewClass = () => {
            const options = {
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            const cards = document.querySelectorAll('.col.shop-col');
            cards.forEach(card => {
                observer.observe(card);
            });

            return () => {
                cards.forEach(card => {
                    observer.unobserve(card);
                });
            };
        };
        applyInViewClass();
    }, [filteredData]);

    useEffect(() => {
        doFilter();
    }, [filterer]);

    const handleUserInput = (event) => {
        setTypeData(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const tDataTrim = typeData.trim();
        if(tDataTrim) {
            if(!(filterer.Cakes + filterer.Cookies + filterer.Pies + filterer.Pastries + filterer.Offers + filterer.Cakes.Merch)) {
                const filtered = data.filter((item) => {
                    return item.name.trim().toLowerCase().includes(tDataTrim.toLowerCase())
                });
                setFilteredData(filtered);
            }
            else if(!filterer.Offers) {
                const filtered = data.filter((item) => {
                    return item.name.toLowerCase().includes(tDataTrim.toLowerCase())
                      && ((filterer.Cakes && item.category === 'cakes') ||
                         (filterer.Pies && item.category === 'pies') ||
                         (filterer.Cookies && item.category === 'cookies') ||
                         (filterer.Pastries && item.category === 'pastries') ||
                         (filterer.Merch && item.category === 'mugs') ||
                         (filterer.Merch && item.category === 'bags')||
                         (filterer.Merch && item.category === 'caps') ||
                         (filterer.Merch && item.category === 'shirts'));
                });
                setFilteredData(filtered);
            }
            else {
                const filtered = data.filter((item) => {
                    const lowerCaseName = item.name.toLowerCase().includes(tDataTrim.toLowerCase());
                    return (lowerCaseName && ((item.id - 1) % 10 > 5)
                              && (
                                    (filterer.Cakes && item.category === 'cakes')
                                    || (filterer.Pies && item.category === 'pies')
                                    || (filterer.Cookies && item.category === 'cookies') 
                                    || (filterer.Pastries && item.category === 'pastries')
                                )
                            ) || 
                            (lowerCaseName && (
                                (filterer.Merch && item.category === 'mugs') ||
                                (filterer.Merch && item.category === 'bags')||
                                (filterer.Merch && item.category === 'caps') ||
                                (filterer.Merch && item.category === 'shirts')
                            ))
                });
                setFilteredData(filtered);
            }
        }
        else {
            doFilter();
        }
        setTypeData('');
    };

    const handleChangeFilter = (event) => {
        document.querySelector('.custom-dropdown-content').classList.add('hidden');
        document.querySelector(`#${event.target.id}`).classList.toggle('custom-dropdown-content-active');
        setFilterer((prevFilterer) => ({
            ...prevFilterer,
            [event.target.id]: !prevFilterer[event.target.id],
        }))
    }

    useEffect(() => {
        if(state) {
            document.querySelector('.custom-dropdown-content').classList.add('hidden');
            document.querySelector(`#${state}`).classList.toggle('custom-dropdown-content-active');
            setFilterer((prevFilterer) => ({
                ...prevFilterer,
                [state]: !prevFilterer[state],
            }))
            setState('');
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, [state])
    
    const handleShowDropdown = () => {
        document.querySelector('.custom-dropdown-content').classList.remove('hidden')
    }

    const getFilterText = () => {
        const activeFilters = Object.keys(filterer).filter((key) => filterer[key]);
        const nonOfferFilters = activeFilters.filter((key) => key !== 'Offers');
        const hasOffers = filterer.Offers;

        if (activeFilters.length === 0) {
            return "Filter by: All";
        }
        if (hasOffers && nonOfferFilters.length === 0) {
            return "Filter by: Offers";
        }
        const filterText = nonOfferFilters.join(", ");
    
        return hasOffers ? `Filter by: ${filterText} with Offers` : `Filter by: ${filterText}`;
    };

    const doFilter = () => {
        setFilteredData(() => {
            if(!(filterer.Cakes + filterer.Pies + filterer.Cookies + filterer.Pastries + filterer.Offers + filterer.Merch)) {
                return data;
            }
            if (filterer.Offers) {
                if(!(filterer.Cakes + filterer.Pies + filterer.Cookies + filterer.Pastries)) {
                    return data.filter((item) => {
                        return ((item.id - 1) % 10 > 5)
                            || item.category === 'mugs' 
                            || item.category === 'bags' 
                            || item.category === 'caps'
                            || item.category === 'shirts';
                    })
                }
                return data.filter((item) => {
                    const matchesCategory =
                        (filterer.Cakes && item.category === 'cakes') ||
                        (filterer.Pies && item.category === 'pies') ||
                        (filterer.Cookies && item.category === 'cookies') ||
                        (filterer.Pastries && item.category === 'pastries');
                    return ((item.id - 1)%10 > 5 && matchesCategory) ||
                        (filterer.Merch && item.category === 'mugs') ||
                        (filterer.Merch && item.category === 'bags') ||
                        (filterer.Merch && item.category === 'caps') ||
                        (filterer.Merch && item.category === 'shirts');
                });
            }
            else {
                return data.filter((item) => {
                    return (
                        (filterer.Cakes && item.category === 'cakes')
                            ||
                        (filterer.Pies && item.category === 'pies')
                            ||
                        (filterer.Cookies && item.category === 'cookies')
                            ||
                        (filterer.Pastries && item.category === 'pastries')
                            ||
                        (filterer.Merch && item.category === 'mugs')
                            ||
                        (filterer.Merch && item.category === 'bags')
                            ||
                        (filterer.Merch && item.category === 'caps') 
                            ||
                        (filterer.Merch && item.category === 'shirts')
                    );
                });
            }
        })
    }

    return (
    <>
        <div className="container-fluid full-gallery-container">
            <div className="container-bg">
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '64px',
                    letterSpacing: '-1px',
                    fontWeight: '500',
                    margin: '16px 0',
                    fontFamily: '"Kalnia Glaze", cursive',
                    textShadow: '-4px 6px 7px rgba(178, 96, 255, 0.85)'
                }}>Our Shop</h1>
                <div className="container gallery-container">
                    <div className="product row gallery-product-container" id='GalleryCakes'>
                        <div className="custom-search-container">
                            <form onSubmit={handleSearch} className="custom-search-form custom-search-bar custom-form-field">
                                <input
                                    type="text"
                                    className={`custom-search-input`}
                                    placeholder=" "
                                    value={typeData}
                                    onChange={handleUserInput}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            handleSearch(event);
                                        }
                                    }}
                                />
                                <i type='submit' onClick={handleSearch} className="fa-solid fa-magnifying-glass"></i>
                                <label htmlFor="search" className={`custom-form-label${typeData.trim() ? ' has-content' : ''}`}></label>
                            </form>
                            <div className="custom-dropdown" onMouseEnter={handleShowDropdown}>
                                <button className="custom-dropdown-button">
                                    <i id="filterAnnounce" className="fa-solid fa-right-left"></i>
                                        {getFilterText()}
                                    <i className="fa-solid fa-sort"></i>
                                </button>
                                <div className="custom-dropdown-content">
                                    <a id="Cakes" className="btn dropdown-placeholder" onClick={handleChangeFilter} style={{
                                        borderTopLeftRadius: '8px',
                                        borderTopRightRadius: '8px',
                                    }}>Cakes</a>
                                    <a id="Pies" className="btn dropdown-placeholder" onClick={handleChangeFilter}>Pies</a>
                                    <a id="Cookies" className="btn dropdown-placeholder" onClick={handleChangeFilter}>Cookies</a>
                                    <a id="Pastries" className="btn dropdown-placeholder" onClick={handleChangeFilter}>Pastries</a>
                                    <a id="Offers" className="btn dropdown-placeholder" onClick={handleChangeFilter}>Offers</a>
                                    <a id="Merch" className="btn dropdown-placeholder" onClick={handleChangeFilter}>Merch</a>
                                </div>
                            </div>
                            <Link to={'/cart'} className="gallery-checkout-btn">
                                Checkout
                                <ShoppingCart />
                            </Link>
                        </div>
                        {
                            (filteredData.length) ? filteredData.map((item, index) => (
                                <div key={index} className="col shop-col pt-2 mb-4">
                                    <SliderCard data={item} openModal={openModal}></SliderCard>
                                </div>
                            )) : <h1 className="text-center no-result">It seems your search has returned no result...</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
        <ModalGallery show={showModal} Close={closeModal} data={modalData}></ModalGallery>
    </>
    )
}