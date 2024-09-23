import React, { useState, useEffect } from 'react';
import '../assets/styles/Modal.css'
import globalVar from '../globalVar';

export default function ImageModal({ imageUrl, showImageModal, closeImageModal, showModal }) {
    const [fade, setFade] = useState(true);
  
    useEffect(() => {
      document.querySelector('.modal-body').scrollTop = 0;
    }, [showModal])

    const onClose = () => {
      setFade(false);
      setTimeout(() => {
        setFade(true);
        closeImageModal();
      }, 400);
    }

    useEffect(() => {
        const handleIfClickOutside = (event) => {
            const modal = document.querySelector('#modal-image-box')
            if(modal && event.button === 0 && !modal.contains(event.target)) {
                onClose();
            }
        }
        const handleEscapeClick = (event) => {
            if(event.key === 'Escape') {
                onClose();
            }
        }
        if(showImageModal || showModal) {
            document.body.style.overflow = 'hidden'
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
            document.removeEventListener('mouseup', handleIfClickOutside)
            document.removeEventListener('keydown', handleEscapeClick)
        }
    }, [showImageModal, onClose]);

  return (
    <>
    {showImageModal ? <div className="modal-backdrop fade show" onClick={onClose}></div> : null}

    <div className={`modal fade ${showImageModal ? 'show' : ''}`} style={{
      display: showImageModal ? 'block' : 'none',
    }} tabIndex="-1">
      <div className={`image-modal-dialog modal-dialog ${fade ? 'fade-in' : 'fade-out'}`} id='modal-image-box'>
        <div className="modal-content position-relative">
            <button type="button" className="btn-close img-modal-btn" onClick={onClose} style={{
                marginLeft: 'auto',
                padding: '8px'
            }}></button>
            <div className="modal-body p-1">
                <img src={imageUrl} alt="" style={{
                    width: '100%',
                    height: '70vh',
                    objectFit: 'cover'
                }}/>
            </div>
        </div>
      </div>
    </div>
  </>
  );
};