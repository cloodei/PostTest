import '../assets/styles/SliderCards.css'
import SpecialSaleImg2 from '../assets/imgs/special-offer-2-removebg-preview.png'
import BestSellerTag from '../assets/imgs/best-seller2-removebg-preview.png'
import { HashLink } from 'react-router-hash-link';
import { HandleTargetContext } from '../contexts/HandleTargetContext';
import { useContext } from 'react';

export default function SliderCard({ data }) {
    const { sendDataToGalleryCard } = useContext(HandleTargetContext);
    const cardImageHeight = 240;
    function customScroll(element) {
        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    return (
    <>
        <div className="card slide-card grid-container official-slide-card" style={{
            width: '100%',
            padding: '0'
        }}>
            { data.id % 11 === 7 ? <img src={BestSellerTag} className='best-seller-img'/> : null }
            <img src={SpecialSaleImg2} className='sale-img' alt="..." />
            <img src={data.image1} className="card-img-top" style={{
                height: `${cardImageHeight}px`,
            }} alt="..."/>
            <HashLink aria-current="page" smooth to={"/shop/#" + data.name.split(' ').join('-')} scroll={customScroll} onClick={() => sendDataToGalleryCard(`#` + data.name.split(' ').join('-'))} className='image-cover' style={{
                height: `${cardImageHeight}px`
            }}>Buy Now</HashLink>
            <div className="card-body p-2">
                <p className='item-title' style={{
                    textAlign: "start",
                    fontSize: '18px',
                    fontFamily: '"Chakra Petch", sans-serif',
                    marginBottom: '0px',
                    // height: '42px'
                }}>{data.name}</p>
                <p className='item-price' style={{
                    textAlign: 'start',
                    marginBottom: '0'
                }}>
                    <span style={{
                        fontWeight: '500',
                        fontSize: '34px',
                        position: 'relative',
                        marginLeft: '12px'
                    }}>
                        <span style={{
                            position: 'absolute',
                            top: '8px',
                            left: '-16px',
                            fontSize: '20px',
                            fontWeight: '400',
                            fontFamily: '"Roboto", sans-serif'
                        }}>$</span>
                        {(Math.round(data.price * 5) / 10).toFixed(2)}
                    </span>
                </p>
            </div>
        </div>
    </>
    )
}