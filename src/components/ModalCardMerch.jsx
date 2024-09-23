import '../assets/styles/ModalCard.css'
import { useState, useContext } from 'react'
import { cartContext } from '../contexts/CartContext'

export default function ModalCardMerch({ data }) {
    const { addProductToCart } = useContext(cartContext);

    const animateButton = (e, data) => {
      e.preventDefault;
      const targetClasses = e.target.classList
      targetClasses.remove('animate');
      addProductToCart(data);
      targetClasses.add('animate');
      setTimeout(() => {
          targetClasses.remove('animate');
      }, 250);
    };
    
    return (
    <>
        <div className={`card w-100 px-3 py-2 pt-0 ${data.id % 4 === 0 ? 'bor-none' : 'home-modal-card'}`}>
            <div className="row g-0 modal-card-contents">
                <div className="col-md-4">
                <img src={data.image1} className="img-fluid rounded" alt="..." style={{
                    width: '100%',
                    maxHeight: '240px',
                    minHeight: '150px'
                }}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-title">{data.name}</h6>
                        <p className="card-text position-relative">
                            <span className='card-dollar-tag'>$</span>
                            <span className='card-price'>{data.price}</span>
                            <span> - Discount on product purchases</span>
                        </p>
                        <p className="card-text">{data.content2}</p>
                        <p className="card-text mb-2">{data.content3}</p>
                        <p className="card-text">
                            <small className="text-muted">{data.discount}</small>
                        </p>
                        <div className="w-100 d-flex mt-4 justify-content-center">
                            <button className='modal-item-btn bubbly-button-modal-home' onClick={(event) => animateButton(event, data)}>Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}