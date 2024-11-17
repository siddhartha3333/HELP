import React from 'react';

export const RadioGroup = ({ children }) => {
  return <div className="radio-group">{children}</div>;
};

export const RadioGroupItem = ({ value, onChange }) => {
  return (
    <input
      type="radio"
      value={value}
      onChange={onChange}
      className="radio-item"
    />
  );
};
