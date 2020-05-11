import { useState, useCallback } from 'react';

export function CameraRatio(initialratio) {
  const [aspectRatio, setAspectRatio] = useState(initialratio);

  const calculateRatio = useCallback((height, width) => {
    if (height && width) {
      const isLandscape = height <= width;
      const ratio = isLandscape ? width / height : height / width;

      setAspectRatio(ratio)
    }
  }, []);

  return [aspectRatio, calculateRatio];
}