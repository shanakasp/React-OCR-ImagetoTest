// App.js
import React, { useState } from "react";
import "./App.css";
import OCRComponent from "./components/OCRComponent";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleAnimationEnd = () => {
    setShowSplash(false);
  };

  return (
    <div className="App">
      {showSplash && <SplashScreen onAnimationEnd={handleAnimationEnd} />}
      {!showSplash && <OCRComponent />}
    </div>
  );
}

export default App;
