import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/CommentModal.css';
import InputGroupForm from './InputGroupForm';

export default function CommentModal({ dataModal, addComment, deleteComment, comments, userComment, setUserComment }) {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const modalRef = useRef(null);
    const modalData = dataModal.data;

    useEffect(() => {
        const modalElement = document.getElementById('exampleModal');
        const handleModalOpen = () => {
            if (userComment) {
                setName(userComment.name);
                setTitle(userComment.title);
                setComment(userComment.comment);
            } else {
                setName('');
                setTitle('');
                setComment('');
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
            }
        };
        modalElement.addEventListener('show.bs.modal', handleModalOpen);
        modalElement.addEventListener('keydown', handleKeyDown);

        return () => {
            modalElement.removeEventListener('show.bs.modal', handleModalOpen);
            modalElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [comments]);

    const handleSubmit = () => {
        const name = document.getElementById('userName').value;
        const title = document.getElementById('userTitle').value;
        const comment = document.getElementById('userComment').value;
        if(!title || !comment)
            return;
        const newComment = {
            name: name,
            title: title,
            comment: comment,
        };
        // setName(name);
        // setTitle(title);
        // setComment(comment);
        addComment(newComment);
        setUserComment(newComment);
        const modalElement = document.getElementById('exampleModal');
        const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
        bootstrapModal.hide();
    };

    const handleDelete = () => {
        setName('');
        setTitle('');
        setComment('');
        setUserComment({
            name: '',
            title: '',
            comment: '',
        })
        deleteComment();
    }

    const handleModalClose = () => {
        if (userComment) {
            setName(userComment.name);
            setTitle(userComment.title);
            setComment(userComment.comment);
        }
    };

    return (
    <>
        <div className="modal fade" ref={modalRef} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog custom-modal custom-modal-width">
                <div className="modal-content custom-long-modal">
                    <div className="modal-header custom-modal-border">
                        <h5 className="modal-title" id="exampleModalLabel">{modalData}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body py-8">
                        <InputGroupForm name={name} setName={setName} title={title} setTitle={setTitle} comment={comment} setComment={setComment} modalData={modalData}></InputGroupForm>
                    </div>
                    <div className="modal-footer custom-modal-border gap-1">
                        <button type="button" className="btn close-comment-modal" data-bs-dismiss="modal" onClick={handleModalClose}>Close</button>
                        <button type="button" className="btn save-comment-modal" onClick={handleSubmit}>
                            {modalData === 'Edit your Comment' ? 'Save Changes' : 'Add Comment'}
                        </button>
                        {modalData === 'Edit your Comment' &&
                            <button type="button" className="btn delete-comment-modal" data-bs-dismiss="modal" onClick={handleDelete}>
                                Delete Comment
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};