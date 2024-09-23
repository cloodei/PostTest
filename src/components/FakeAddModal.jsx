import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

export default function FakeAddModal({ product, open, handleClose }) {
    const cardPadding = 6;

    return (
        <div className='the-modal-thing'>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        style: { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
                    },
                }}
            >
                <Fade in={open}>
                    <div className='d-flex align-items-center' style={{
                        border: 'none',
                        minWidth: '35%',
                        maxWidth: '50%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <div className="products-view-card d-flex position-relative" style={{ width: '100%' }}>
                            <span className='preview-info' style={{ top: '-5%', transform: 'translate(-50%, -100%)' }}>Previewing Item</span>
                            <div className="row g-0" style={{ flex: 1, gap: '16px' }}>
                                <div className="col-md-4 d-flex" style={{
                                    width: 'calc(500% / 12)',
                                    padding: `${cardPadding}px`,
                                }}>
                                    <img src={product.image} style={{
                                        height: '100%',
                                        objectFit: 'cover',
                                        flex: '1',
                                        borderRadius: '6px',
                                    }} className="img-fluid" alt="Oops, picture missing..." />
                                </div>
                                <div className="col-md-8 d-flex flex-column justify-content-between" style={{
                                    width: 'calc(700% / 12 - 16px)',
                                }}>
                                    <div className="card-body pt-1 pb-0 pe-0 d-flex flex-column justify-content-center" style={{ height: 'fit-content', }}>
                                        <h5 className="card-title">Name: {product.name}</h5>
                                        <p className="card-text card-description">Description: {product.description}</p>
                                        <p className="card-text card-description">Category: {product.category.name ? product.category.name : 'None'} - {product.category.id}</p>
                                        <p className="card-text" style={{ marginBottom: '0px', }}>Pricing: ${product.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}