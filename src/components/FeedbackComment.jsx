import React, { useState, useEffect } from 'react'
import '../assets/styles/FeedbackComment.css'
import Commenter1 from '../assets/imgs/commenter1.webp'
import Commenter2 from '../assets/imgs/commenter2.jpg'
import Commenter3 from '../assets/imgs/commenter3.jpg'
import Commenter4 from '../assets/imgs/commenter4.png'
import CommentModal from './CommentModal'
import axios from 'axios';

export default function FeedbackComment() {
    const [modalData, setModalData] = useState({ show: false, data: '' });
    const [showSpan, setShowSpan] = useState(true);
    const [comments, setComments] = useState([1, 1, 1]);
    const [location, setLocation] = useState({ country: 'unknown', city: 'unknown' });
    const [userComment, setUserComment] = useState({ name: '', title: '', comment: '' });

    const handleShowModal = () => {
        if(showSpan) {
            setModalData({...modalData, data: 'Give us a Comment!'});
        }
        else {
            setModalData({...modalData, data: 'Edit your Comment'});
        }
        const myModal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show();
    };

    const addComment = (commentData) => {
        setShowSpan(false);
        setComments([1, 2, 3, commentData]);
    }

    const deleteComment = () => {
        setShowSpan(true);
        setComments([3, 2, 1]);
    }

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const apiKey = '5d17d6df60f4428cbbd8201876c1be33';
              const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    
              axios.get(url)
                .then(response => {
                  const { country_code, city } = response.data.results[0].components;
                  setLocation({ country: country_code.toUpperCase(), city });
                })
                .catch(error => {
                  console.error('Error fetching location data:', error);
                });
            },
            (error) => {
              console.error('Error getting geolocation:', error);
            }
          );
        }
      }, []);

    return (
    <>
        <div className="row mb-5 position-relative">
            <h3 style={{
                fontSize: '28px',
                textAlign: 'center',
                fontWeight: '400',
                letterSpacing: '-1px',
                fontFamily: '"DM Sans", serif',
                gap: '16px'
            }}>
                <span onClick={handleShowModal} className='comment-adder'>
                    {showSpan ? 'Add Comment' : 'Edit comment'}
                </span>
                Customer Comments and Replies
            </h3>
            <div className={`${comments.length === 4 ? 'col-3 margin-comments4' : 'col-4 margin-comments3'} comment-card`} style={{
                width: `${comments.length === 4 ? 'calc(100% / 4 - 24px)' : 'calc(100% / 3 - 36px)'}`
            }}>
                <p className='comment-title'>"Best in town"</p>
                <p className='comment-content'>There's no experience quite like this, very fast and enthusiastic service. Last time I went here, they even gave me a souvenir to cherish my stay at their store even more, what incredibly friendly and fantastic service!</p>
                <div className="comment-info">
                    <img src={Commenter1} alt="" />
                    <p className='commenter-profile'>
                        Johnny Dang
                        <br />
                        <span>Los Angeles, CA</span>
                    </p>
                </div>
            </div>
            <div className={`${comments.length === 4 ? 'col-3 margin-comments4' : 'col-4 margin-comments3'} comment-card`} style={{
                width: `${comments.length === 4 ? 'calc(100% / 4 - 24px)' : 'calc(100% / 3 - 36px)'}`
            }}>
                <p className='comment-title'>"Simply Delicious"</p>
                <p className='comment-content'>I don't think I've ever tasted such a perfectly baked chocolate cookie, with an utterly perfectly crunchy outer-crust then still a soft interior, with even some hints of fruit to compliment it even more. Absolutely sublime!</p>
                <div className="comment-info">
                    <img src={Commenter2} alt="" />
                    <p className='commenter-profile'>
                        Emily Whatson
                        <br />
                        <span>San Diego, CA</span>
                    </p>
                </div>
            </div>
            <div className={`${comments.length === 4 ? 'col-3 margin-comments4' : 'col-4 margin-comments3'} comment-card`} style={{
                width: `${comments.length === 4 ? 'calc(100% / 4 - 24px)' : 'calc(100% / 3 - 36px)'}`
            }}>
                <p className='comment-title'>"One of a kind"</p>
                <p className='comment-content'>Is there any place you can go that can get you a 3 feet tall black forest cake, the most stunning red velvet cake, but then still have a perfectly molten chocolate lava cake? I refuse to believe such a place even exists!</p>
                <div className="comment-info">
                    <img src={Commenter3} alt="" />
                    <p className='commenter-profile'>
                        Kris Sven
                        <br />
                        <span>Sacramento, CA</span>
                    </p>
                </div>
            </div>
            {comments[3] !== undefined && !showSpan && (userComment.name || userComment.title || userComment.title) ?
            <div className={`col-3 margin-comments4 comment-card`} style={{
                width: `${comments.length === 4 ? 'calc(100% / 4 - 24px)' : ''}`
            }}>
                <p className='comment-title' style={{
                    wordBreak: 'break-word'
                }}>"{userComment.title}"</p>
                <p className='comment-content' style={{
                    wordBreak: 'break-word'
                }}>{userComment.comment}</p>
                <div className="comment-info">
                    <img src={Commenter4} alt="" />
                    <p className='commenter-profile'>
                        {userComment.name}
                        <br />
                        <span>{location.country === 'unkown' && location.city === 'unkown' ? 'Undisclosed' : `${location.city}, ${location.country}`}</span>
                    </p>
                </div>
            </div> : null
            }
        </div>
        <CommentModal 
            dataModal={modalData} 
            addComment={addComment} 
            deleteComment={deleteComment} 
            comments={comments}
            userComment={userComment}
            setUserComment={setUserComment}
        >
        </CommentModal>
    </>
    )
}