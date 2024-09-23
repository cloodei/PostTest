import React, { useState, useEffect, useContext, useRef } from 'react';
import { ModalGalleryContext } from '../contexts/ModalGalleryContext';
import { cartContext } from '../contexts/CartContext.jsx';
import globalVar from '../globalVar.js'

export default function ModalGallery({ show, Close, data, }) {
  const { addProductToCart } = useContext(cartContext);
  const { hoverStarArray, selectStarArray, setHoverStarArray, setSelectStarArray } = useContext(ModalGalleryContext);
  const [currentHover, setCurrentHover] = useState(hoverStarArray[data.id]);
  const [currentSelect, setCurrentSelect] = useState(selectStarArray[data.id]);
  const timeoutRef = useRef([null, null]);
  
  useEffect(() => {
    document.querySelector('.modal-body').scrollTop = 0;
  }, [show])

  const handleMouseOverStar = (id, value) => {
      hoverStarArray.splice(id, 1, value);
      const newStarArray = hoverStarArray;
      setCurrentHover(value);
      setHoverStarArray(newStarArray);
  }
  const handleMouseOutStar = (id) => {
      hoverStarArray.splice(id, 1, 0);
      const newStarArray = hoverStarArray;
      setCurrentHover(0);
      setHoverStarArray(newStarArray);
  }
  const handleClickStar = (id, value) => {
      selectStarArray.splice(id, 1, value);
      const newStarArray = selectStarArray;
      setCurrentSelect(value);
      setSelectStarArray(newStarArray);
  }

  const animateButton = (e, data) => {
    e.target.classList.remove('animate')
    e.preventDefault();
    const targetClasses = e.target.classList
    addProductToCart(data);
    targetClasses.add('animate');
    timeoutRef[0] = setTimeout(() => {
        targetClasses.remove('animate');
    }, 300);
  };

  const onClose = () => {
    clearTimeout(timeoutRef[1]);
    const modalClasses = document.querySelector('#modal-gallery-box').classList;
    modalClasses.remove('fade-in');
    modalClasses.add('fade-out');
    timeoutRef[1] = setTimeout(() => {
      Close();
      modalClasses.remove('fade-out')
      modalClasses.add('fade-in')
    }, 450);
  }

  useEffect(() => {
    setCurrentHover(hoverStarArray[data.id]);
    setCurrentSelect(selectStarArray[data.id]);
    const handleIfClickOutside = (event) => {
      const modal = document.querySelector('#modal-gallery-box')
      if(modal && event.button === 0 && !modal.contains(event.target)) {
        onClose();
      }
    }
    const handleEscapeClick = (event) => {
      if(event.key === 'Escape') {
        onClose();
      }
    }
    if(show) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${globalVar.scrollWidth}px`
      document.addEventListener('mouseup', handleIfClickOutside)
      document.addEventListener('keydown', handleEscapeClick)
    }
    else {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0'
      document.removeEventListener('mouseup', handleIfClickOutside)
      document.removeEventListener('keydown', handleEscapeClick)
    }
    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0'
      document.removeEventListener('mouseup', handleIfClickOutside)
      document.removeEventListener('keydown', handleEscapeClick)
    }
  }, [show, onClose]);
  
  const customModalTitle = () => {
      switch(data.category) {
      case 'cakes':
        return 'cakes-title'
      case 'cookies':
        return 'cookies-title'
      case 'pies':
        return 'pies-title'
      case 'pastries':
        return 'pastries-title'
      default:
        return 'merch-title';
    }
  }

  return (
    <>
      {show ? <div className={`modal-backdrop fade show`} onClick={onClose}></div> : null}

      <div className={`modal fade ${show ? 'show' : ''}`} style={{
        display: show ? 'block' : 'none',
      }} tabIndex="-1">
        <div className={`modal-dialog modal-dialog-scrollable modal-gallery-dialog fade-in`} id='modal-gallery-box'>
          <div className="modal-content">
            <div className="modal-header modal-header-gallery">
              <h4 className={`modal-title modal-title-gallery ${customModalTitle()}`}>{(data.id < 41) ? data.category[0].toUpperCase() + data.category.slice(1) + ' Category' : 'Merchandise'}</h4>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body d-flex flex-column gap-3">
                <div className="card bor-none w-100">
                    <div className="row g-3 modal-card-contents">
                      {data.id < 41 ? (
                      <>
                      <div className="col-md-4">
                        <img src={data.image1} className="img-fluid rounded" alt="..." style={{
                            width: '100%',
                            minHeight: '176px',
                            maxHeight: '220px'
                        }}/>
                      </div>
                      <div className="col-md-8">
                          <div className="card-body card-body-modal-gallery">
                              <h6 className="card-title card-title-modal-gallery">{data.name}</h6>
                              <p className="card-text">{data.description}</p>
                              <p className="card-text">
                                  <small className="text-muted">Currently available in stock and ready for order.</small>
                              </p>
                          </div>
                      </div>
                      <div className="home-modal-card"></div>
                      <div className="col-md-4">
                        <img src={data.image4} className="img-fluid rounded" alt="..." style={{
                            width: '100%',
                            minHeight: '140px',
                            maxHeight: '220px'
                        }}/>
                      </div>
                      <div className="col-md-8">
                          <div className="card-body card-body-modal-gallery">
                              <h5 className="card-title">Ingredients</h5>
                              {data.ingredients[1] ? <p className="card-text">- {data.ingredients[1]}</p> : null}
                              {data.ingredients[2] ? <p className="card-text">- {data.ingredients[2]}</p> : null}
                              {data.ingredients[3] ? <p className="card-text">- {data.ingredients[3]}</p> : null}
                              {data.ingredients[4] ? <p className="card-text">- {data.ingredients[4]}</p> : null}
                              {data.ingredients[5] ? <p className="card-text">- {data.ingredients[5]}</p> : null}
                              <p className="card-text">
                                  <small className="text-muted">Every ingredient is fresh and made to order!</small>
                              </p>
                          </div>
                      </div>
                      <div className="home-modal-card"></div>
                      <div className="col-md-4">
                        <img src={data.image2} className="img-fluid rounded" alt="..." style={{
                            width: '100%',
                            minHeight: '140px',
                            maxHeight: '220px'
                        }}/>
                      </div>
                      <div className="col-md-8">
                          <div className="card-body card-body-modal-gallery">
                              <p className="card-text">{data.title}</p>
                              <p className="card-text">
                                  <small className="text-muted">Comes with a reduction for Merchandise purchases!</small>
                              </p>
                          </div>
                      </div>
                      </>
                      ) : (
                      <>
                      <div className="col-md-4">
                        <img src={data.image1} className="img-fluid rounded" alt="..." style={{
                            width: '100%',
                            minHeight: '176px',
                            maxHeight: '220px'
                        }}/>
                      </div>
                      <div className="col-md-8">
                          <div className="card-body card-body-modal-gallery">
                              <h6 className="card-title card-title-modal-gallery">{data.name}</h6>
                              <p className="card-text">{data.description}</p>
                              <p className="card-text">
                                  <small className="text-muted">Currently available in stock and ready for order.</small>
                              </p>
                          </div>
                      </div>
                      <div className="home-modal-card"></div>
                      <div className="col-md-4">
                        <img src={data.image2} className="img-fluid rounded" alt="..." style={{
                            width: '100%',
                            minHeight: '140px',
                            maxHeight: '220px'
                        }}/>
                      </div>
                      <div className="col-md-8">
                          <ul className="card-body card-body-modal-gallery">
                              <h6 className="card-title card-title-modal-gallery">Product Details:</h6>
                              <li className="card-text">{data.content1}</li>
                              <li className="card-text">{data.content2}</li>
                              <li className="card-text">{data.content3}</li>
                              <li className="card-text">{data.content4}</li>
                              <li className="card-text">{data.content5}</li>
                              <p className="card-text" style={{
                                marginTop: '12px'
                              }}>
                                  <small className="text-muted">Readily available and refundable 24/7 everytime you need!</small>
                              </p>
                          </ul>
                      </div>
                      </>
                      )}
                    </div>
                </div>
            </div>
            <div className="modal-footer modal-gallery-footer">
              <button className="bubbly-button-modal-shop order-btn-modal-gallery" onClick={(event) => {animateButton(event, data)}}>Order Now: ${((data.id - 1) % 10 > 5) && (data.id < 41) ? (Math.round(data.price * 5) / 10 ).toFixed(2) : data.price.toFixed(2)}</button>
              <div className="star-ratings star-ratings-modal-gallery">
                <span
                onMouseOver={() => handleMouseOverStar(data.id, 0)}
                onMouseOut={handleMouseOutStar}
                onClick={() => handleClickStar(data.id, 0)}
                >
                  Rating: 
                </span> 
                <span key={1} thing={hoverStarArray} className={`star star-modal-gallery ${1 <= (currentHover || currentSelect) ? 'active-modal-gallery' : ''}`}
                onMouseOver={() => handleMouseOverStar(data.id, 1)}
                onMouseOut={() => handleMouseOutStar(data.id)}
                onClick={() => handleClickStar(data.id, 1)}
                style={{
                  marginLeft: '4px'
                }}>
                &#9733;
                </span>
                <span key={2} thing={hoverStarArray} className={`star star-modal-gallery ${2 <= (currentHover || currentSelect) ? 'active-modal-gallery' : ''}`}
                onMouseOver={() => handleMouseOverStar(data.id, 2)}
                onMouseOut={() => handleMouseOutStar(data.id)}
                onClick={() => handleClickStar(data.id, 2)}
                >
                &#9733;
                </span>
                <span key={3} thing={hoverStarArray} className={`star star-modal-gallery ${3 <= (currentHover || currentSelect) ? 'active-modal-gallery' : ''}`}
                onMouseOver={() => handleMouseOverStar(data.id, 3)}
                onMouseOut={() => handleMouseOutStar(data.id)}
                onClick={() => handleClickStar(data.id, 3)}
                >
                &#9733;
                </span>
                <span key={4} thing={hoverStarArray} className={`star star-modal-gallery ${4 <= (currentHover || currentSelect) ? 'active-modal-gallery' : ''}`}
                onMouseOver={() => handleMouseOverStar(data.id, 4)}
                onMouseOut={() => handleMouseOutStar(data.id)}
                onClick={() => handleClickStar(data.id, 4)}
                >
                &#9733;
                </span>
                <span key={5} thing={hoverStarArray} className={`star star-modal-gallery ${5 <= (currentHover || currentSelect) ? 'active-modal-gallery' : ''}`}
                onMouseOver={() => handleMouseOverStar(data.id, 5)}
                onMouseOut={() => handleMouseOutStar(data.id)}
                onClick={() => handleClickStar(data.id, 5)}
                >
                &#9733;
                </span>
              </div>
              <button type="button" className="btn btn-secondary close-btn" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};