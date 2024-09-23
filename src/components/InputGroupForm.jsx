import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/InputGroupForm.css';

export default function InputGroupForm({ name, setName, title, setTitle, comment, setComment, modalData }) {
    const mode = (modalData === 'Edit your Comment' ? 'edit' : 'add');
    const handleInputKeyDown = (type, event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };
    return (
    <>
        {mode === 'add' ? (
        <>
            <div data-mdb-input-init className="form-outline mb-4 form-field position-relative">
                <input
                    type="text"
                    id="userName"
                    className="form-control form-control-lg form-input form-input-text"
                    placeholder=" "
                    maxLength={20}
                    value={name}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(event) => setName(event.target.value)}
                />
                <label className="form-label igf-label" htmlFor="typeText">
                    Your Name
                </label>
            </div>
            
            <div data-mdb-input-init className="form-outline mb-4 form-field position-relative">
                <input
                    type="text"
                    id="userTitle"
                    maxLength={28}
                    className="form-control form-control-lg form-input form-input-text"
                    placeholder=" "
                    value={title}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label className={`form-label igf-label form-label-title-add`} htmlFor="typeText">
                </label>
            </div>
            
            <div data-mdb-input-init className="form-outline form-field position-relative">
                <textarea
                    type="text"
                    id="userComment"
                    maxLength={160}
                    className="form-control form-input form-textarea form-input-text"
                    placeholder=' '
                    value={comment}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(event) => setComment(event.target.value)}
                    onKeyDown={(e) => handleInputKeyDown('comment', e)}
                />
                <label className={`form-label igf-label form-label-comment-add`} htmlFor="typeText">
                </label>
            </div>
        </>
        ) : (
        <>
            <div data-mdb-input-init className="form-outline mb-4 form-field position-relative">
                <input
                    type="text"
                    id="userTitle"
                    maxLength={28}
                    className="form-control form-control-lg form-input form-input-text"
                    placeholder=" "
                    value={title}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label className='form-label igf-label form-label-title-edit' htmlFor="typeText">
                </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4 form-field position-relative">
                <textarea
                    type="text"
                    id="userComment"
                    maxLength={160}
                    className="form-control form-input form-textarea form-input-text"
                    placeholder=' '
                    value={comment}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(event) => setComment(event.target.value)}
                    onKeyDown={(e) => handleInputKeyDown('comment', e)}
                />
                <label className='form-label igf-label form-label-comment-edit' htmlFor="typeText">
                </label>
            </div>

            <div data-mdb-input-init className="form-outline form-field position-relative">
                <input
                    type="text"
                    id="userName"
                    className="form-control form-control-lg form-input form-input-text"
                    placeholder=" "
                    maxLength={20}
                    value={name}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(event) => setName(event.target.value)}
                />
                <label className="form-label igf-label" htmlFor="typeText">
                    Your Name
                </label>
            </div>
        </>
        )}
    </>
    );
};