import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, Video } from 'lucide-react';

export default function HelpRequest() {
  const [request, setRequest] = useState('');
  const navigate = useNavigate();

  const handleHelpClick = () => {
    localStorage.setItem('helpRequest', request); // Save the request locally
    navigate('/declare-amount'); // Navigate to the next route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-between p-4">
      {/* Input Textarea */}
      <div className="w-full max-w-xl space-y-8 flex-grow flex flex-col justify-center">
        <div className="relative">
          <Textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="w-full min-h-[300px] text-lg p-6 pb-36 rounded-lg shadow-md resize-none"
          />
          <div className="absolute bottom-0 right-0 flex space-x-2">
            <Button
              className="p-6"
              aria-label="Record audio"
            >
              <Mic className="h-12 w-12 text-gray-500" />
            </Button>
            <Button
              className="p-6"
              aria-label="Record video"
            >
              <Video className="h-12 w-12 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <div className="w-full max-w-md flex flex-col items-center mb-12">
        <Button
          onClick={handleHelpClick}
          className="w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-[0_10px_20px_rgba(0,0,0,0.3)] text-white text-4xl font-bold tracking-wider transform transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.3)',
          }}
        >
          $HELP
        </Button>
      </div>
    </div>
  );
}
