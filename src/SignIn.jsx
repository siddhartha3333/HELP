import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Check if path is correct

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Sign In Simulated");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          className="p-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 mb-4"
          required
        />
        <Button
          type="submit"
          className="w-full p-4 bg-blue-500 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
