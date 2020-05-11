import { useState, useEffect } from 'react';

export function Offset (videoWidth, videoHeight, containerWidth, containerHeight) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    if (videoWidth && videoHeight && containerWidth, containerHeight) {
      const x = videoWidth > containerWidth ? Math.round((videoWidth - containerWidth) / 2) : 0;
      const y = videoHeight > containerHeight ? Math.round((videoHeight - containerHeight) / 2) : 0;
      
      setOffset({ x, y });
    }
  }, [videoWidth, videoHeight, containerWidth, containerHeight]);

  return offset;
}