'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, TrendingDown, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const selectedHelpbet = {
  id: 1,
  description: "Need assistance moving a couch and two chairs from my second-floor apartment to a moving truck. The furniture is heavy and I could use an extra pair of hands.",
  timeAway: "15 minutes",
  mediaType: "video",
  mediaUrl: "https://example.com/help-video.mp4",
  topBids: [
    { id: 'bid1', amount: 58, helperName: "Jane Smith", avatar: "/avatar1.png" },
    { id: 'bid2', amount: 56, helperName: "Emma Brown", avatar: "/avatar2.png" },
    { id: 'bid3', amount: 55, helperName: "John Doe", avatar: "/avatar3.png" },
    { id: 'bid4', amount: 54, helperName: "Bob Williams", avatar: "/avatar4.png" },
    { id: 'bid5', amount: 52, helperName: "Alice Johnson", avatar: "/avatar5.png" },
  ]
}

function AnimatedIncome({ startAmount }) {
  const [currentIncome, setCurrentIncome] = useState(startAmount)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIncome((prevIncome) => {
        const newIncome = prevIncome - (1 / 3600)
        return newIncome > 0 ? newIncome : 0
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-red-600" aria-live="polite">
        ${currentIncome.toFixed(2)}
      </span>
      <TrendingDown className="ml-1 text-red-600" size={20} />
    </div>
  )
}

function BidBox({ bid }) {
  return (
    <div className="w-24 flex flex-col items-center space-y-2">
      <Avatar className="w-12 h-12">
        <AvatarImage src={bid.avatar} alt={bid.helperName} />
        <AvatarFallback>{bid.helperName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <span className="font-semibold text-xs text-center truncate w-full">{bid.helperName}</span>
      <Button 
        size="sm" 
        className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-md text-white text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.2)'
        }}
        onClick={() => alert(`Requesting help from ${bid.helperName}`)}
      >
        ${bid.amount}
      </Button>
    </div>
  )
}

export default function HelpbetBiddingPage() {
  const [bidAmount, setBidAmount] = useState('')
  const [error, setError] = useState('')

  const handleBidSubmit = () => {
    const bid = parseFloat(bidAmount)
    if (isNaN(bid) || bid <= 0) {
      setError('Please enter a valid bid amount')
    } else if (bid > selectedHelpbet.topBids[0].amount) {
      setError(`Your bid cannot exceed the current highest bid of $${selectedHelpbet.topBids[0].amount}`)
    } else {
      alert(`Bid of $${bid} placed successfully!`)
      setBidAmount('')
      setError('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white rounded-xl shadow-md overflow-hidden">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" className="p-2">
                <ArrowLeft className="text-gray-600" size={24} />
              </Button>
              <AnimatedIncome startAmount={selectedHelpbet.topBids[0].amount} />
            </div>
            <p className="text-gray-600 mb-2 text-lg">{selectedHelpbet.timeAway} away</p>
            <p className="text-gray-800 text-2xl font-semibold leading-tight">{selectedHelpbet.description}</p>
          </CardHeader>
          <CardContent className="p-6">
            {selectedHelpbet.mediaType === "video" && (
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <Play className="text-gray-500" size={48} />
              </div>
            )}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-4">Top Bids:</h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {selectedHelpbet.topBids.map((bid) => (
                  <BidBox key={bid.id} bid={bid} />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold mb-2">Your Bid:</p>
              <div className="flex items-center">
                <span className="text-2xl mr-2">$</span>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="text-2xl"
                  placeholder="Enter your bid"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          </CardContent>
          <CardFooter className="p-6 flex justify-center">
            <Button 
              onClick={handleBidSubmit} 
              className="w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-[0_10px_20px_rgba(0,0,0,0.3)] text-white text-3xl font-bold tracking-wider transform transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.3)'
              }}
            >
              HELP
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}