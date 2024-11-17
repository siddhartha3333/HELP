import React from 'react';

export const Input = React.forwardRef(({ type = 'text', ...props }, ref) => (
  <input
    type={type}
    className="input border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
    ref={ref}
    {...props}
  />
));

Input.displayName = 'Input';
