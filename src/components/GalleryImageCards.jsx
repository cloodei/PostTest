import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function GalleryImageCards({ data, showImageModal }) {
    const { ref: cardRef1, inView: inView1 } = useInView({ triggerOnce: true });
    const { ref: cardRef2, inView: inView2 } = useInView({ triggerOnce: true });
    const { ref: cardRef3, inView: inView3 } = useInView({ triggerOnce: true });
    const { ref: cardRef4, inView: inView4 } = useInView({ triggerOnce: true });

    return (
    <>
        <div
            ref={cardRef1}
            className={`col mb-4 gp-card ${inView1 ? 'in-view' : ''}`}
        >
            <a type='button' className='gp-image-cover' onClick={() => showImageModal(data.image1)} style={{
                fontSize: '38px',
            }}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <img src={data.image1} alt="" style={{
                width: '100%',
                height: '208px',
                objectFit: 'cover',
                borderRadius: '12px'
            }}/>
        </div>

        <div
            ref={cardRef2}
            className={`col mb-4 gp-card ${inView2 ? 'in-view' : ''}`}
        >
            <a type='button' className='gp-image-cover' onClick={() => showImageModal(data.image2)} style={{
                fontSize: '38px',
            }}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <img src={data.image2} alt="" style={{
                width: '100%',
                height: '208px',
                objectFit: 'cover',
                borderRadius: '12px'
            }}/>
        </div>
        {(data.id < 41) ?
        <>
             <div
                ref={cardRef3}
                className={`col mb-4 gp-card ${inView3 ? 'in-view' : ''}`}
            >
                <a type='button' className='gp-image-cover' onClick={() => showImageModal(data.image3)} style={{
                    fontSize: '38px',
                }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </a>
                <img src={data.image3} alt="" style={{
                    width: '100%',
                    height: '208px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                }}/>
            </div>

            <div
                ref={cardRef4}
                className={`col mb-4 gp-card ${inView4 ? 'in-view' : ''}`}
            >
                <a type='button' className='gp-image-cover' onClick={() => showImageModal(data.image4)} style={{
                    fontSize: '38px',
                }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </a>
                <img src={data.image4} alt="" style={{
                    width: '100%',
                    height: '208px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                }}/>
            </div>
        </> : null
        }
    </>
    )
}