import React, { useState, useEffect } from "react";
import '../assets/styles/About.css'
import aboutUsImage from '../assets/imgs/baked-products-banner.avif'
import aboutUsImage2 from '../assets/imgs/modal-caramel-beignets.jpg'
import aboutUsImage3 from '../assets/imgs/about-us-img.jpg'
import MapView from "../components/MapView";
import { useInView } from 'react-intersection-observer';

export default function AboutUs() {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true });
   const { ref: title2Ref, inView: title2InView } = useInView({ triggerOnce: true });
   const { ref: title3Ref, inView: title3InView } = useInView({ triggerOnce: true });
   const { ref: title4Ref, inView: title4InView } = useInView({ triggerOnce: true });
   const { ref: mapRef, inView: mapInView } = useInView({ triggerOnce: true });

   return (
   <>
      <div className="container-fluid about-banner-bg">
         <div className="about-titles">
            <h1>About Us</h1>
         </div>
         <div className="container about-banner-container">
            <div
                ref={titleRef}
                className={`about-banner-title image-container d-flex justify-content-between align-items-center ${titleInView ? 'in-view' : ''}`}
            >
               <img className="about-us-image" src={aboutUsImage} alt="" />
               <div className="about-contents">
                  <p className="content-title">
                     Our Products
                  </p>
                  <p className="content-body">
                     For more than 15 years, Bakerz Bite has been making America’s favorite baked goods the old-fashioned way: from scratch, in small batches, and using the finest ingredients.
                  </p>
                  <p className="content-body">
                  Bakerz Bite offers over 300 types of fresh cakes every day, from artistic cakes, exquisite cream cakes to premium desserts and handmade drinks. With the motto "Where smiles are served every day," we are committed to bringing quality and freshness to each product, using only safe and guaranteed ingredients such as real butter, fresh cream, and unbleached flour.
                  </p>
                  <p className="content-body">
                     We've always been trying to push the boundaries of whatever was expected of the sweets and baking world, pushing through with innovations and attention to details, and with the utmost determination of making our desserts known world-wide!
                  </p>
               </div>
            </div>
            <div
                ref={title2Ref}
                className={`about-banner-title image-container d-flex justify-content-between align-items-center ${title2InView ? 'in-view' : ''}`}
            >
               <div className="about-contents">
                  <p className="content-title">
                     Our History
                  </p>
                  <p className="content-body">
                     First opened since 2008, Bakerz Bite has been striving to compete as an established bakery in the fast and crowded towns of New Orleans, keeping up with every clients' needs and comments, attending to every desires.
                  </p>
                  <p className="content-body">
                     Only until 2010 did we have the chance and raised enough funds in order to open up another establishment, all the way west to sunny California which we've struggled to compete there, and had to shut down the original establishment to build up our hopes with this one!
                  </p>
                  <p className="content-body">
                     After our fortunate and prudent investment, the dream was paid off and we were able to rise up as the #1 bakery in the West Coast, eventually opening up 3 more establishments within 2 years and expand across the nation.
                  </p>
               </div>
               <img className="about-us-image about-us-image-2" src={aboutUsImage2} alt="" />
            </div>
            <div
                ref={title3Ref}
                className={`about-banner-title image-container d-flex justify-content-between align-items-center ${title3InView ? 'in-view' : ''}`}
            >
               <img className="about-us-image about-us-image-3" src={aboutUsImage3} alt="" />
               <div className="about-contents">
                  <p className="content-title">
                     Our Testimonials
                  </p>
                  <p className="content-body">
                     On out way to reach for the epitomy of culinary sublimity, we have still maintained our standards and will always continue to uphold every product and service to those standards for all future customers and clients alike.
                  </p>
                  <p className="content-body">
                     Our Rules and Responsibilities to our customers have never changed, we will always continue to serve, help and strive to accommodate for every client and every customer in need, no matter who they are.
                  </p>
                  <p className="content-body">
                     We will always uphold every customers' rights, as well as bring forth the best quality products and desserts deserving of every customers' love and appreciation, and we always hope that you will feel at home here at Bakerz Bite!
                  </p>
               </div>
            </div>
            <div
                ref={title4Ref}
                className={`about-banner-title image-container d-flex justify-content-between ${title4InView ? 'in-view' : ''}`}
            >
               <div className="about-contents w-100">
                  <p className="content-title">
                     Contacts and Help
                  </p>
                  <p className="content-body" style={{
                     fontWeight: '500',
                     textAlign: 'center',
                     fontSize: '22px'
                  }}>
                     For more information or if you're in need of assistance, here's our list of contacts up and available:
                  </p>
                  <div id="VeryUniqueID" className="w-100" style={{
                     paddingLeft: '30%'
                  }}>
                     <p className="content-body" style={{
                        marginBottom: '0px'
                     }}>
                        - Our Management department: 09-0909-0990.
                     </p>
                     <p className="content-body" style={{
                        marginBottom: '0px'
                     }}>
                        - Our HR department: 90-9090-9009.
                     </p>
                     <p className="content-body" style={{
                        marginBottom: '0px'
                     }}>
                        - Health-Related Issues line: 33-6699-0303.
                     </p>
                     <p className="content-body" style={{
                        marginBottom: '0px'
                     }}>
                        - Customer Services and Product Managements: 55-6677-8899.
                     </p>
                  </div>
                  
                  <p className="content-body" style={{
                     marginTop: '40px',
                     marginBottom: '0',
                     fontWeight: '500',
                     textAlign: 'center',
                     fontSize: '22px'
                  }}>
                     Here's a location of our headquarter venue and map:
                  </p>

               </div>
            </div>
            <MapView></MapView>
         </div>
      </div>
   </>
   )
}