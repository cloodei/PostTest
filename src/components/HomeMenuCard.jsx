import '../assets/styles/SliderCardsGallery.css'
import '../assets/styles/HomeMenuCard.css'
import { HashLink } from 'react-router-hash-link';
import { HandleTargetContext } from '../contexts/HandleTargetContext';
import { useContext } from 'react';

export default function HomeMenuCard({ data, showImageModal }) {
    const { sendDataToGalleryCard } = useContext(HandleTargetContext);
    const cardImageHeight = 200;
    function customScroll(element) {
        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    return (
    <>
        <div className="card slide-card home-menu-card">
            <img src={data.image1} className="card-img-top" style={{
                height: `${cardImageHeight}px`,
            }} alt="..."/>
            <a type='button' className='image-cover' onClick={() => showImageModal(data.image1)} style={{
                height: `${cardImageHeight}px`,
                fontSize: '30px',
            }}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <div className="card-body card-gallery d-grid" style={{
                paddingBottom: '8px',
                height: '136px',
                paddingLeft: '5px'
            }}>
                <p style={{
                    textAlign: "start",
                    fontSize: '16px',
                    fontFamily: '"Chakra Petch", sans-serif',
                    marginBottom: '0'
                }}>{data.name}</p>
                <p style={{
                    textAlign: 'start',
                    marginBottom: '4px',
                    alignSelf: 'start'
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
                        {(data.id - 1) % 10 > 5 ? (Math.round(data.price * 5) / 10 ).toFixed(2) : data.price.toFixed(2)}
                    </span>
                </p>
                <HashLink aria-current="page" to={"/shop/#" + data.name.split(' ').join('-')} scroll={customScroll} onClick={() => sendDataToGalleryCard(`#` + data.name.split(' ').join('-'))} className='home-menu-buy-btn'>
                    View Item
                </HashLink>
            </div>
        </div>
    </>
    )
}