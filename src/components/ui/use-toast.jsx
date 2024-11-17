import React from 'react';
export function useToast() {
    return {
      show: (message) => alert(message),
    };
  }
  