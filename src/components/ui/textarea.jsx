// textarea.jsx
import React from 'react';

export const Textarea = ({ placeholder, value, onChange, className, ...rest }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      {...rest}
    />
  );
};
