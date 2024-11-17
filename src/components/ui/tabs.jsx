import React from 'react';

export const Tabs = ({ children, defaultValue, ...props }) => (
  <div className="tabs" {...props}>
    {children}
  </div>
);

export const TabsList = ({ children, ...props }) => (
  <div className="tabs-list" {...props}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, ...props }) => (
  <button data-value={value} className="tabs-trigger" {...props}>
    {children}
  </button>
);

export const TabsContent = ({ value, children, ...props }) => (
  <div data-value={value} className="tabs-content" {...props}>
    {children}
  </div>
);
