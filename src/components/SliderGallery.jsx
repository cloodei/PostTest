import React, { useState, useEffect } from 'react'
import '../assets/styles/Slider.css'
import '../assets/styles/SliderGallery.css'
import SliderPage from './SliderPageGallery.jsx'

export default function SliderGallery({ slides, data }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  
  useEffect(() => {
    const element = document.querySelector('.slider')
    if(element) {
      setSlideWidth(element.clientWidth)
    }
  }, [])

  const showNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length)
  }
  const showPrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
  }

  const sortCakes = data.filter((item) => {
    return item.category === slides[0].toLowerCase();
  })
  let cakeData1 = [], cakeData2 = [];
  sortCakes.forEach((item, index) => {
    if(index < 5) {
        cakeData1.push(item)
    }
    else {
        cakeData2.push(item);
    }
  });
  const cakeData = [cakeData1, cakeData2];
  return (
    <>
      <div className="slider">
          <div className="slider-container" style={{
              transform: `translateX(${- (currentIndex * slideWidth)}px)`,
              width: `${slides.length * slideWidth}px`,
          }}>
          {slides.map((slide, index) => (
              <div key={index} className="slide" style={{ width: slideWidth }}>
                  <SliderPage data={cakeData[index]}></SliderPage>
              </div>
          ))}
        </div>
      </div>
      <button className="prev-gallery slide-btn slide-btn-gallery" onClick={showPrevSlide}>
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <button className="next-gallery slide-btn slide-btn-gallery" onClick={showNextSlide}>
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </>
  );
};
