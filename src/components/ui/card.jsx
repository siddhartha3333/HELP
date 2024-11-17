import React from 'react';

// Card Component
export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

// Card Content Component
export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

// Card Header Component
export const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

// Card Footer Component
export const CardFooter = ({ children }) => {
  return <div className="card-footer">{children}</div>;
};

// Card Title Component
export const CardTitle = ({ title }) => {
  return <h3 className="card-title">{title}</h3>;
};

// Card Description Component
export const CardDescription = ({ description }) => {
  return <p className="card-description">{description}</p>;
};
