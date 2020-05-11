import React, { useState, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera';

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();

  return (
    <Fragment>
      <div>
        {isCameraOpen && (
          <Camera
            onCapture={blob => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}
        
        {cardImage && (
          <div>
            <image src={cardImage }></image>
          </div>
        )} => (
          <div className="App-header">
            <div ref={measureRef} style={{ height: `${contain.height}px` }}>
              <video ref={videoRef} style={{ top: `-${offset.y}px`, left: `-${offset.x}px` }} onCanPlay={onCanPlay} autoPlay playsInline muted />
            </div>
            <button onClick={isCanvasEmpty ? handleCapture : handleClear}>
              {isCanvasEmpty ? "Take a picture" : "Take another picture"}
            </button>
            <Canvas ref={canvasRef} width={contain.width} height={contain.height} />
          </div>
        )}
      </div>
    </Fragment>
  );
}

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

export default App;