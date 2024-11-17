import React from 'react';

export const Avatar = ({ src, alt }) => {
  return <img src={src} alt={alt} className="avatar" />;
};

export const AvatarFallback = ({ fallbackText }) => {
  return <div className="avatar-fallback">{fallbackText}</div>;
};

export const AvatarImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="avatar-image" />;
};
