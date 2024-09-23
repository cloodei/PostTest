import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import '../assets/styles/Cart.css';
import PaypalLogo from '../assets/imgs/paypal-logo2.png'
import ApplePayLogo from '../assets/imgs/applepay-logo6.png'
import VisaLogo from '../assets/imgs/visa-logo2.png';
import { cartContext } from "../contexts/CartContext";
import globalVar from "../globalVar";
import { Drawer, Button } from '@mui/material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

export default function CartCheckout() {
  const { cartProducts, setCartProducts, removeProductByID, changeQuantityByID, selectedPayment, setSelectedPayment, cardNumber, setCardNumber, cardName, setCardName, expiration, setExpiration, cvv, setCvv } = useContext(cartContext);
  const [isFading, setIsFading] = useState(false);
  const [isPointerFading, setIsPointerFading] = useState(false);
  const [currentInput, setCurrentInput] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [closeConfirmation, setCloseConfirmation] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPointers, setShowPointers] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const targetRef = useRef(null);
  const timeoutRef = useRef([null, null]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const validateCardNumber = (number) => {
    const regex = /^(\d{4} \d{4} \d{4} \d{4})$/;
    return (regex.test(number.trim()));
  };

  const validateCardName = (name) => {
    const regex = /^[a-zA-Z\s]{8,}$/;
    return (regex.test(name.trim()));
  };

  const validateExpiration = (date) => {
    const regex = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/((20[2-3][0-9])|2040)$/;
    if (!regex.test(date)) {
      return false;
    }
    const [day, month, year] = date.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const endDate = new Date(2040, 0, 1);
    return inputDate >= tomorrow && inputDate <= endDate;
  }

  const validateCVV = (cvv) => {
    const regex = /^\d{3}$/;
    return (regex.test(cvv.trim()));
  };

  const handleValidation = () => {
    let errors = {};
    let pointers = {};
    setShowPointers({});
    if (!validateCardNumber(cardNumber)) {
      errors.cardNumber = 'Invalid card number. (Format: 1111 2222 3333 4444)';
      pointers.cardNumber = true;
    }
    if (!validateCardName(cardName)) {
      errors.cardName = 'Invalid name. No special characters and length must be > 5.';
      pointers.cardName = true;
    }
    if (!validateExpiration(expiration)) {
      errors.expiration = 'Invalid expiration date. (Format: DD/MM/YY)';
      pointers.expiration = true;
    }
    if (!validateCVV(cvv)) {
      errors.cvv = 'Invalid CVV. Must be 3 digits.';
      pointers.cvv = true;
    }
    setValidationErrors(errors);
    setShowPointers(pointers);

    if (Object.keys(errors).length > 0) {
      setIsPointerFading(true);
      timeoutRef[0] = setTimeout(() => {
        setIsPointerFading(false);
      }, 3300);
      timeoutRef[1] = setTimeout(() => {
        setShowPointers({});
      }, 4000);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    clearTimeout(timeoutRef[1]);
    clearTimeout(timeoutRef[0]);
    if(!handleValidation())
      return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsFading(true);
    setShowConfirmation(true);
    setDrawerOpen(false);
    setSelectedPayment(null);
    setCardName('');
    setCardNumber('');
    setExpiration('');
    setCvv('');
    setTimeout(() => {
      setIsFading(false);
      setCartProducts([]);
    }, 1600);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2300);
  };

  const handlePaymentSelection = (paymentMethod) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedPayment(paymentMethod);
      setIsFading(false);
    }, 400);
  };

  const handleClearCheck = () => {
    setCloseConfirmation(true);
    setIsFading(true);
  }

  const clearAll = () => {
    clearTimeout();
    setIsFading(false)
    setCartProducts([]);
    setSelectedPayment(null);
    setCardName('');
    setCardNumber('');
    setExpiration('');
    setCvv('');
    setTimeout(() => {
      setIsFading(true);
      setCloseConfirmation(false);
    }, 450);
  }

  const handleCloseRefusal = () => {
    setIsFading(false);
    setTimeout(() => {
      setCloseConfirmation(false);
    }, 450);
  }

  const handleCloseConfirmation = () => {
    if(closeConfirmation) {
      clearAll();
      return;
    }
    setShowConfirmation(false);
    setIsFading(false);
    setCartProducts([]);
    setSelectedPayment(null);
    setCardName('');
    setCardNumber('');
    setExpiration('');
    setCvv('');
  };

  useEffect(() => {
    if(showConfirmation || closeConfirmation) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${globalVar.scrollWidth}px`;
    }
    else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = `0px`;
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = `0px`
    }
  }, [showConfirmation, closeConfirmation]);
    
  useEffect(() => {
    if(cartProducts) {
      let bakedProductPrices = 0, merchPrices = 0, total = 0, reduction = 0;
      cartProducts.forEach((item) => {
        item.itemCategory === "Merch" ? (merchPrices += item.product.price * item.quantity) : (bakedProductPrices += ( (((item.product.id - 1) % 10 > 5) ? (item.product.price / 2) : (item.product.price)) * item.quantity))
      });
      total = bakedProductPrices + merchPrices;
      const reduceMerchOnBakedProduct = Math.round(bakedProductPrices / 50);
      reduction = (0.03 * reduceMerchOnBakedProduct * merchPrices);
      if(selectedPayment === "Paypal" || selectedPayment === "ApplePay") {
        reduction = reduction + (0.15 * merchPrices)
      }
      setTotalPrice(total.toFixed(2));
      setDiscountPrice(reduction.toFixed(2));
    }
  }, [cartProducts, selectedPayment])

  const buttonAdd = (targettedID) => {
    changeQuantityByID(targettedID, cartProducts[targettedID - 1].quantity + 1);
  }
  const buttonTake = (targettedID) => {
    changeQuantityByID(targettedID, cartProducts[targettedID - 1].quantity - 1);
  }

  const handleBlur = (targettedID, event) => {
    let targetValue = parseInt(event.target.value);
    if(isNaN(targetValue) || targetValue < 1)
      targetValue = 1;
    else if(targetValue > 25)
      targetValue = 25;
    changeQuantityByID(targettedID, targetValue);
    setCurrentInput({});
  }
  const handleFocus = (id, quantity) => {
    setCurrentInput(({ [id]: quantity.toString() }));
  };
  const handleInputChange = (id, value) => {
    setCurrentInput(({  [id]: value }));
  };

  const handleRemove = (id) => {
    removeProductByID(id, false);
  }

  useEffect(() => {
    if (drawerOpen) {
      document.body.classList.add('no-scroll');
      clearTimeout(timeoutRef[1]);
      clearTimeout(timeoutRef[0]);
      setShowPointers({});
    }
    else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [drawerOpen]);
  
  return (
  <>
  {showConfirmation ? (
      <>
        <div className={`overlay ${isFading ? 'fade-in' : 'fade-out'}`}></div>
        <div className={`confirmation-popup ${isFading ? 'fade-in' : 'fade-out'}`}>
          <div className="confirmation-content">
            <h2>
              Transaction Successful
              <i className="fa-regular fa-circle-check" style={{
                color: '#2cb52e',
                marginLeft: '10px'
              }}></i>
            </h2>
            <button onClick={handleCloseConfirmation}>OK</button>
          </div>
        </div>
      </>
      )
  : (closeConfirmation) ? (
      <>
        <div className={`overlay ${isFading ? 'fade-in' : 'fade-out'}`}></div>
        <div className={`confirmation-popup ${isFading ? 'fade-in' : 'fade-out'}`}>
          <div className="confirmation-content">
            <h2 className="text-danger">
              Are you sure you want to clear the Cart?
              <i class="fa-solid fa-circle-exclamation" style={{
                marginLeft: '7px'
              }}></i>
            </h2>
            <div className="close-confirmation-btns">
              <button onClick={handleCloseConfirmation} style={{ backgroundColor: 'rgb(0, 209, 122)' }}>Yes</button>
              <button onClick={handleCloseRefusal} style={{ backgroundColor: '#e70f3e' }}>No</button>
            </div>
          </div>
        </div>
      </>
    )
    : null
  }
    <section className={`container-fluid ${cartProducts.length ? '' : 'pt-5'}`} style={{ backgroundColor: '#e9e9e9' }}>
      <div ref={targetRef} className="container h-100 pb-5">
        {cartProducts.length ?
        <div className="cart-redirect cart-redirect-header">
          <Link to={'/shop'}>
              <i className="fas fa-angle-left me-2"></i>
              Back to shopping
          </Link>
        </div> : null
        }
        <div className="card shopping-cart" style={{ borderRadius: '15px' }}>
          <div className="card-body">
            {cartProducts.length ? 
            <>
            <div className={`payment-form row ${isFading ? 'faster-fade-out' : 'faster-fade-in'}`}>
              <div className="px-4 pb-4 pt-4 bord">
                <h3 className="mb-3 pt-2 text-center position-relative">
                  <span variant="outlined" onClick={() => setDrawerOpen(true)} className="open-drawer-checkout-button">
                    Checkout
                    <CreditScoreIcon />
                  </span>
                  YOUR PRODUCTS
                  <span className="clear-all-btn" onClick={handleClearCheck}>
                    Clear All
                    <i className="fa-solid fa-trash-can"></i>
                  </span>
                </h3>
                <div className="row">
                {cartProducts.map((item, index) => (
                  <div key={index} className="d-flex col-lg-6 align-items-center mb-3 cart-product-card">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image1}
                        className="img-fluid"
                        style={{ 
                          width: '100px',
                          height: '100px',
                          borderRadius: '16px',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <a type="button" className="float-end">
                        <i className="fas fa-times" targetid={item.id} onClick={() => handleRemove(item.id)}></i>
                      </a>
                      <h5 className="text-primary pe-3 cart-product-name">{item.product.name}</h5>
                      <h6 style={{ color: '#9e9e9e' }}>{item.itemCategory}</h6>
                      <div className="d-flex align-items-center">
                        <p className="fw-bold mb-0 cash-tag">
                          <span style={{
                            fontFamily: 'Chakra Petch'
                          }}>$</span>
                          {( ((item.product.id - 1) % 10 > 5) && (item.itemCategory !== 'Merch') ? (item.product.price * 5 / 10) : item.product.price).toFixed(2)} / Per
                        </p>
                        <div className="def-number-input number-input-container safari_only">
                          <button
                            data-mdb-button-init
                            onClick={() => buttonTake(item.id)}
                            className="minus"
                          ></button>
                          <input
                            className="max-width-input user-input-number"
                            name="quantity"
                            type="number"
                            targetid={item.id}
                            value={currentInput[item.id] !== undefined ? currentInput[item.id] : item.quantity}
                            onFocus={() => handleFocus(item.id, item.quantity)}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            onKeyDown={(event) => {
                              if(event.key === "Enter") {
                                event.target.blur();
                              }
                            }}
                            onBlur={(event) => handleBlur(item.id, event)}
                          />
                          <button
                            data-mdb-button-init
                            onClick={() => buttonAdd(item.id)}
                            className="plus"
                          ></button>
                          <div className="final-price">
                            <span className="" pricingid={item.id}>${( (item.quantity) * ( ((item.product.id - 1) % 10 > 5) && (item.itemCategory !== 'Merch') ? item.product.price * 5 / 10 : item.product.price)).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <Button variant="outlined" onClick={() => setDrawerOpen(true)} className="open-drawer-button">
                TOTAL: ${(totalPrice - discountPrice).toFixed(2)} {selectedPayment ? `| ${selectedPayment}` : ''}
              </Button>
            </div>
            
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{
                style: {
                  backgroundColor: '#16171b'
                }
              }}
              >
              <h3 className="mb-0 pt-3 text-center text-uppercase" id="Payment-box">Payment</h3>
              <div className="payment-container">
                {!selectedPayment ? (
                  <div className={`payment-options ${isFading ? 'fade-out' : 'fade-in'}`}>
                    <div className="d-flex justify-content-between py-1 px-3 gap-4">
                      <button className="btn payment-btn col-4" onClick={() => handlePaymentSelection('Paypal')}>
                        <img src={PaypalLogo} alt="" style={{
                          width: '100%',
                          objectFit: 'cover'
                        }}/>
                      </button>
                      <button className="btn payment-btn col-4" onClick={() => handlePaymentSelection('ApplePay')}>
                        <img src={ApplePayLogo} alt="" style={{
                          height: '50%',
                          maxWidth: '100%',
                          borderRadius: '16px',
                          objectFit: 'cover'
                        }}/>
                      </button>
                      <button className="btn payment-btn col-4" onClick={() => handlePaymentSelection('Card')}>
                        <img src={VisaLogo} alt="" style={{
                          width: '100%',
                          objectFit: 'cover'
                        }}/>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`payment-form ${isFading ? 'fade-out' : 'fade-in'}`}>
                    {selectedPayment && (
                      <form className="mb-3">
                        <div data-mdb-input-init className="form-outline mt-2 mb-5 form-field position-relative">
                          {showPointers.cardNumber ? (
                            <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                              <div className="popup-wrapper">
                                {validationErrors.cardNumber}
                              </div>
                            </div>
                          ) : null }
                          <input
                            type="text"
                            id="typeText"
                            className="form-control form-control-lg form-input"
                            placeholder=" "
                            value={cardNumber}
                            autoComplete="off"
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                          <label className="form-label" htmlFor="typeText">
                            Card Number
                          </label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-5 form-field position-relative">
                          {showPointers.cardName ? (
                            <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                              <div className="popup-wrapper">
                                {validationErrors.cardName}
                              </div>
                            </div>
                          ) : null}
                          <input
                            type="text"
                            id="typeName"
                            className="form-control form-control-lg form-input"
                            placeholder=" "
                            value={cardName}
                            autoComplete="off"
                            onChange={(e) => setCardName(e.target.value)}
                          />
                          <label className="form-label" htmlFor="typeName">
                            Name on card
                          </label>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-5">
                            <div data-mdb-input-init className="form-outline form-field position-relative">
                              {showPointers.expiration ? (
                                <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                                  <div className="popup-wrapper">
                                    {validationErrors.expiration}
                                  </div>
                                </div>
                              ) : null}
                              <input
                                type="text"
                                id="typeExp"
                                className="form-control form-control-lg form-input"
                                placeholder=" "
                                value={expiration}
                                autoComplete="off"
                                onChange={(e) => setExpiration(e.target.value)}
                              />
                              <label className="form-label" htmlFor="typeExp">
                                Expiration
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6 mb-5">
                            <div data-mdb-input-init className="form-outline form-field position-relative">
                              {showPointers.cvv ? (
                                <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                                  <div className="popup-wrapper">
                                    {validationErrors.cvv}
                                  </div>
                                </div>
                              ) : null}
                              <input
                                type="password"
                                id="typeCVV"
                                className="form-control form-control-lg form-input"
                                placeholder=" "
                                value={cvv}
                                autoComplete="off"
                                onChange={(e) => setCvv(e.target.value)}
                              />
                              <label className="form-label" htmlFor="typeCVV">
                                CVV
                              </label>
                            </div>
                          </div>
                        </div>

                        <hr className="mb-4" style={{ height: '2px', backgroundColor: '#96a4ff', opacity: 1, marginTop: '0' }} />

                        <div className="d-flex justify-content-between px-1 cart-cost">
                          <p className="cart-discount">Cost:</p>
                          <p className="cart-discount">${totalPrice}</p>
                        </div>
                        <div className="d-flex justify-content-between px-1 cart-discount-price">
                          <p className="cart-discount">Discount:</p>
                          <p className="cart-discount">${discountPrice}</p>
                        </div>
                        <div className="d-flex justify-content-between pb-1 cart-total">
                          <h5 className="mb-0">Total:</h5>
                          <h4 className="mb-0">${(totalPrice - discountPrice).toFixed(2)}</h4>
                        </div>

                        <p className="mb-4 mt-2 text-center contact-redirect">
                          If there were issues during payment, contact us
                          <Link to={'/contactUs'} style={{ marginLeft: '5px' }}>here</Link>
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                          <button type="button" onClick={handleSubmit} data-mdb-button-init data-mdb-ripple-init className="btn btn-block btn-lg form-payment-btns">
                            Buy Now
                          </button>
                          <button type="button" onClick={() => handlePaymentSelection(null)} className="btn btn-block btn-lg ms-4 form-payment-btns">
                            Different Payment Method
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </Drawer>
          </>
          : <h1 className={`cart-redirect text-center empty-redirect ${isFading ? '' : 'slower-fade-in' }` }>
              Your cart is currently empty, head to 
              <Link to={'/shop'} style={{
                marginLeft: '6px'
              }}>
                  shop
              </Link>
            </h1>
          }
          </div>

        </div>
      </div>
    </section>
  </>
  );
};