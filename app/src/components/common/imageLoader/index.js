import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';

const ImageWithLoading = ({ src, alt, shape = "rectangular", className, style, ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  return imageLoaded ? (
    <img src={src} alt={alt || ""} {...props} />
  ) : (
    <Skeleton variant={shape} width={60} height={40} className={className} style={style}/>
  );
};

export default ImageWithLoading;
