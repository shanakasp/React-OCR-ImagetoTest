import React, { useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="splash-screen">
      <h1>Image to Text Converter</h1>
    </div>
  );
};

export default SplashScreen;
