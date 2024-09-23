import React, { useState, useEffect } from 'react'
import '../assets/styles/Slider.css'
import SliderPage from './SliderPage'

export default function Slider({ slides, data }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const [pause, setPause] = useState(false)
  
  useEffect(() => {
    const updateSlideWidth = () => {
      const element = document.querySelector('.slider')
      if (element) {
        setSlideWidth(element.clientWidth - 56)
      }
    }
    updateSlideWidth()
    window.addEventListener('resize', updateSlideWidth)
    
    return () => {
      window.removeEventListener('resize', updateSlideWidth)
    }
  }, [])

  const showNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length)
  }
  const showPrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
  }

  let sortCakes = [], sortCookies = [], sortPies = [], sortPastries = [];
  data.forEach((item) => {
    const itemCategory = item.category;
    if(itemCategory === slides[0].toLowerCase()) {
      sortCakes.push(item);
    }
    else if(itemCategory === slides[1].toLowerCase()) {
      sortCookies.push(item);
    }
    else if(itemCategory === slides[2].toLowerCase()) {
      sortPies.push(item);
    }
    else {
      sortPastries.push(item);
    }
  });
  const slideList = [sortCakes, sortCookies, sortPies, sortPastries];
  
  useEffect(() => {
    if(!pause) {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3750);
        return () => clearInterval(interval);
    }
  }, [pause, slides.length]);

  const handleHoverPause = () => {
    setPause(true);
  }
  const handleHoverUnpause = () => {
    setPause(false);
  }

  return (
    <>
      <div className="slider official-slider">
          <div className="slider-container" style={{
              transform: `translateX(${- (currentIndex * slideWidth + 28 * currentIndex)}px)`,
              width: `${slides.length * slideWidth}px`,
          }}>
          {slides.map((slide, index) => (
              <div key={index} className="slide" style={{ width: slideWidth }}>
                  <h2 style={{
                      fontFamily: '"Chakra Petch", sans-serif',
                      fontSize: '38px',
                      fontWeight: '700',
                      marginTop: '16px',
                      marginBottom: '32px',
                      color: '#535353'
                  }}>
                    {slide}
                  </h2>
                  <SliderPage data={slideList[index]}></SliderPage>
              </div>
          ))}
        </div>
      </div>
      <button className="prev slide-btn" onClick={showPrevSlide} onMouseEnter={handleHoverPause} onMouseLeave={handleHoverUnpause}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button className="next slide-btn" onClick={showNextSlide} onMouseEnter={handleHoverPause} onMouseLeave={handleHoverUnpause}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </>
  );
};

//  → ←