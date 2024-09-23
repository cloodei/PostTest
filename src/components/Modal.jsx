import React, { useState, useEffect } from 'react';
import '../assets/styles/Modal.css'
import ModalCardMerch from './ModalCardMerch';
import globalVar from '../globalVar';

export default function Modal({ show, Close, menuName, data, showImageModal }) {
  const [fade, setFade] = useState(true);
  
  // useEffect(() => {
  //   document.querySelector('.modal-body').scrollTop = 0;
  // }, [show])

  const onClose = () => {
    setFade(false);
    setTimeout(() => {
      setFade(true);
      Close();
    }, 450);
  }

  useEffect(() => {
    document.querySelector('.modal-body').scrollTop = 0;
    const handleIfClickOutside = (event) => {
      const modal = document.querySelector('#modal-box')
      if(modal && event.button === 0 && !modal.contains(event.target)) {
        onClose();
      }
    }
    const handleEscapeClick = (event) => {
      if(event.key === 'Escape') {
        onClose();
      }
    }
    if(show || showImageModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${globalVar.scrollWidth}px`;
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
  }, [show, onClose]);

  const sort = data.filter((item) => {
    return item.category === menuName.toLowerCase();
  })
  
  return (
    <>
      {show ? <div className="modal-backdrop fade show" onClick={onClose}></div> : null}

      <div className={`modal fade ${show ? 'show' : ''}`} style={{
        display: show ? 'block' : 'none',
      }} tabIndex="-1">
        <div className={`modal-dialog custom-modal-dialog modal-dialog-scrollable ${fade ? 'fade-in' : 'fade-out'}`} id='modal-box'>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{menuName[0].toUpperCase() + menuName.slice(1)} Merch</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body d-flex flex-column p-0 gap-4">
              <ModalCardMerch key={sort[0].id} data={sort[0]}></ModalCardMerch>
              <ModalCardMerch key={sort[1].id} data={sort[1]}></ModalCardMerch>
              <ModalCardMerch key={sort[2].id} data={sort[2]}></ModalCardMerch>
              <ModalCardMerch key={sort[3].id} data={sort[3]}></ModalCardMerch>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary close-btn" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};