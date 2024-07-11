import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleOCR = () => {
    if (!selectedImage) return;

    setLoading(true);
    Tesseract.recognize(selectedImage, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setOcrText(text);
      setLoading(false);
    });
  };

  return (
    <div>
      <h2>OCR Application</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "300px", marginTop: "20px" }}
          />
          <button onClick={handleOCR} disabled={loading}>
            {loading ? "Processing..." : "Extract Text"}
          </button>
        </div>
      )}
      {ocrText && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{ocrText}</p>
        </div>
      )}
    </div>
  );
};

export default OCRComponent;
