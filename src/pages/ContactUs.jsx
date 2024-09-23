import React, { useEffect } from 'react';
import '../assets/styles/Contacts.css'

export default function ContactUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
     }, []);
    const prevDefault = (event) => {
        event.preventDefault();
    }
    return (
    <>   
        <div className="container-fluid contact-bg">
            <h1 style={{
                textAlign: 'center'
            }}>Contact Us</h1>
            <div className="container vw">
                <p className="subtitle">
                    We hope that our services has been of high value to you, and we hope that your stay at our shops has been wonderful. If you have any issues and problems in need of assistance, please contact us at our email: bakerz-bite@gmail.com, or send a request here for any complaints you plan on filing.
                </p>
                <div className="form-container">
                    <form onSubmit={prevDefault}>
                        <div className="form-group form-lable">
                            <label id='name' htmlFor='name'>Name</label>
                            <label id='email' htmlFor='email' className="email">Email</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                id="name"
                                required
                            />
                            <input
                            type="email"
                            placeholder="Enter email address"
                            name="email"
                            id="email"
                            required
                            />
                        </div>
                        <div className="form-group form-lable">
                            <label for="subject">Subject</label>
                        </div>
                        <div className="form-group">
                            <input
                            type="text"
                            placeholder="Write a subject"
                            name="subject"
                            id="subject"
                            />
                        </div>
                        <div className="form-group form-lable">
                            <label id='message' for="message">Message</label>
                        </div>
                        <div className="form-group">
                            <textarea
                            placeholder="Write your message"
                            name="message"
                            id="message"
                            required
                            ></textarea>
                        </div>
                        <button className="btn-send" type="submit" onClick={prevDefault}>Send</button>
                    </form>
                </div>

                <div className="contact-info row">
                    <div className='col-4'>
                        <h3>Call Us:</h3>
                        <a href="#" className="phone">+1-234-567-8900</a>
                        </div>
                    <div className='col-4'>
                        <h3>Hours:</h3>
                        <p>Mon - Fri: 9am - 10pm</p>
                        <p>Sat - Sun: 11am - 6pm</p>
                    </div>
                    <div className='col-4'>
                        <h3>Our Location:</h3>
                        <p>123 Bridge Street</p>
                        <p>Nowhere Land, LA 12345,</p>
                        <p>United States</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}