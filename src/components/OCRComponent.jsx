import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import "./OCRComponent.css"; // Import the CSS file

const OCRComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePaste = (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData)
        .items;
      for (let index in items) {
        const item = items[index];
        if (item.kind === "file") {
          const blob = item.getAsFile();
          if (blob.type.includes("image")) {
            processImage(blob);
            event.preventDefault();
            break;
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    setSelectedImage(URL.createObjectURL(file));
    setLoading(true);
    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setOcrText(text);
      setLoading(false);
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
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

  const handleCopyText = () => {
    navigator.clipboard.writeText(ocrText).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  return (
    <div className="ocr-container">
      <h2 className="title">OCR Application</h2>
      <div
        className="upload-card"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <p>Upload, Drag & Drop, or Paste an Image</p>
      </div>
      {selectedImage && (
        <div className="image-preview">
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", maxWidth: "300px", marginTop: "20px" }}
          />
          <button className="ocr-button" onClick={handleOCR} disabled={loading}>
            {loading ? "Processing..." : "Extract Text"}
          </button>
        </div>
      )}
      {ocrText && (
        <div className="text-output">
          <h3>Extracted Text:</h3>
          <p>{ocrText}</p>
          <button className="copy-button" onClick={handleCopyText}>
            Copy All Text
          </button>
        </div>
      )}
    </div>
  );
};

export default OCRComponent;
