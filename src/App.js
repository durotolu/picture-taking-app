import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import Measure from 'react-measure'

import { Media } from './components/Media';
import { CameraRatio } from './components/CameraRatio';
import { Offset } from './components/Offset';

const PICTURE = {
  audio: false,
  video: { facingMode: "environment" }
};

function App() {
  const videoRef = useRef();
  const canvasRef = useRef()
  const mediaStream = Media(PICTURE);
  const [contain, setContain] = useState({ height: 0 });
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [aspectRatio, setAspectRatio] = CameraRatio(1.586);

  const offset = Offset(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    contain.width,
    contain.height
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  function onCanPlay() {
    setAspectRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    videoRef.current.play();
  }

  function onResize(contentRect) {
    setContain({
      height: Math.round(contentRect.bounds.width / aspectRatio),
      width: contentRect.bounds.width
    });
  }

  function handleCapture() {
    const context = canvasRef.current.getContext("2d");

    context.drawImage(
      videoRef.current,
      offset.x,
      offset.y,
      contain.width,
      contain.height,
      0,
      0,
      contain.width,
      contain.height
    );

    canvasRef.current.toBlob(blob => onCapture(blob), "image/jpeg", 1);
    setIsCanvasEmpty(false);
  }

  function handleClear() {
    const context = canvasRef.current.getContext("2d");
    context.clearReact(0, 0, canvasRef.current.width, canvasRef.current.height);
    onClear();
    setIsCanvasEmpty(true);
  }

  return (
    <Measure bounds onResize={onResize}>
      {({ measureRef }) => (
        <div>
          <div ref={measureRef} style={{ height: `${contain.height}px` }} className="App-header">
            <video ref={videoRef} style={{ top: `-${offset.y}px`, left: `-${offset.x}px` }} onCanPlay={onCanPlay} autoPlay playsInline muted />
          </div>
          <button onClick={isCanvasEmpty ? handleCapture : handleClear}>
            {isCanvasEmpty ? "Take a picture" : "Take another picture"}
          </button>
        </div>
      )}
    </Measure>
  );
}

export default App;
