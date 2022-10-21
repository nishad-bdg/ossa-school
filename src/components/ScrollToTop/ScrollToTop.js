import React, { useEffect, useState } from "react";
import arrowIcon from '../../containers/LandingPage/image/img/big-icon.svg';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bg-pink bottom-3 right-3  cursor-pointer">
      {isVisible && (

        <div
          onClick={scrollToTop}
          className="scroll-icon"
        >
          <div className="" onClick={scrollToTop}>
            <span>SCROLL</span> <img src={arrowIcon} alt="Arrow" />
          </div>
        </div>
      )}
    </div>
  );
}
