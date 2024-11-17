import React from 'react';

export const Select = ({ children }) => {
  return <select className="select">{children}</select>;
};

export const SelectContent = ({ children }) => {
  return <div className="select-content">{children}</div>;
};

export const SelectItem = ({ value }) => {
  return <option value={value}>{value}</option>;
};

export const SelectTrigger = ({ onClick }) => {
  return <div className="select-trigger" onClick={onClick}></div>;
};

export const SelectValue = ({ value }) => {
  return <div className="select-value">{value}</div>;
};
