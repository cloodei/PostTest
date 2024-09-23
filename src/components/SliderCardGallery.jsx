import '../assets/styles/SliderCardsGallery.css'
import SpecialSaleImg2 from '../assets/imgs/special-offer-2-removebg-preview.png'
import { useContext, useEffect, useRef } from 'react';
import { HandleTargetContext } from '../contexts/HandleTargetContext';
import { cartContext } from '../contexts/CartContext';

export default function SliderCard({ data, openModal }) {
    const { addProductToCart } = useContext(cartContext);
    const { target, setTarget } = useContext(HandleTargetContext);
    const cardImageHeight = 216;

    const animateButton = (e, data) => {
        clearTimeout;
        e.target.classList.remove('animate');
        e.preventDefault;
        addProductToCart(data);
        e.target.classList.add('animate');
        setTimeout(() => {
            e.target.classList.remove('animate');
        }, 300);
    };
    
    useEffect(() => {
        if(target) {
            const targetted = document.querySelector(target);
            if(targetted) {
                clearTimeout();
                targetted.classList.add('targetted')
                setTimeout(() => {
                    targetted.classList.remove('targetted')
                }, 3500);
                setTarget('');
            }
        }
        return () => {
            clearTimeout();
            setTarget('')
        }
    }, [target]);

    return (
    <>
        <div className={`card slide-card slide-card-gallery`} id={data.name.split(' ').join('-')}>
            { (data.id - 1) % 10 > 5 && (data.id < 41) ? <img src={SpecialSaleImg2} className='sale-img sale-img-gallery' alt="..." /> : null }
            <img src={data.image1} className="card-img-top" style={{
                height: `${cardImageHeight}px`,
                objectFit: 'cover'
            }} alt="..."/>
            <a type='button' className='image-cover' onClick={() => openModal(data)} style={{
                height: `${cardImageHeight}px`,
                fontSize: '30px'
            }}>See More</a>
            <div className="card-body card-gallery d-flex flex-column p-2">
                <p style={{
                    textAlign: "start",
                    fontSize: '16px',
                    height: '36px',
                    fontFamily: '"Chakra Petch", sans-serif',
                    marginBottom: '0'
                }}>{data.name}</p>
                <p style={{
                    textAlign: 'start',
                    marginTop: '4px'
                }}>
                    <span style={{
                        fontWeight: '500',
                        fontSize: '32px',
                        position: 'relative',
                        marginLeft: '18px',
                    }}>
                        <span style={{
                            position: 'absolute',
                            top: '6px',
                            left: '-14px',
                            fontSize: '21px',
                            fontWeight: '400',
                            fontFamily: '"Roboto", sans-serif'
                        }}>$</span>
                        {((data.id - 1) % 10 > 5) && (data.id < 41) ? ((data.price * 5) / 10).toFixed(2) : data.price.toFixed(2)}
                    </span>
                </p>
                <button className='gallery-buy-btn bubbly-button' onClick={(event) => {animateButton(event, data)}}>
                    Add to cart
                    <i className="fa-solid fa-cart-shopping ms-2"></i>
                </button>
            </div>
        </div>
    </>
    )
}