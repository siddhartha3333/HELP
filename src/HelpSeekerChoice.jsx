'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, TrendingDown, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

const selectedHelpTask = {
  id: 1,
  description: "Need assistance moving a couch and two chairs from my second-floor apartment to a moving truck. The furniture is heavy and I could use an extra pair of hands.",
  timeAway: "15 minutes",
  mediaType: "video",
  mediaUrl: "https://example.com/help-video.mp4",
  topHelpers: [
    { id: 'helper1', points: 58, helperName: "Jane Smith", avatar: "/avatar1.png" },
    { id: 'helper2', points: 56, helperName: "Emma Brown", avatar: "/avatar2.png" },
    { id: 'helper3', points: 55, helperName: "John Doe", avatar: "/avatar3.png" },
    { id: 'helper4', points: 54, helperName: "Bob Williams", avatar: "/avatar4.png" },
    { id: 'helper5', points: 52, helperName: "Alice Johnson", avatar: "/avatar5.png" },
    { id: 'helper6', points: 50, helperName: "Charlie Davis", avatar: "/avatar6.png" },
    { id: 'helper7', points: 49, helperName: "Diana Miller", avatar: "/avatar7.png" },
    { id: 'helper8', points: 48, helperName: "Frank Wilson", avatar: "/avatar8.png" },
    { id: 'helper9', points: 47, helperName: "Grace Taylor", avatar: "/avatar9.png" },
    { id: 'helper10', points: 46, helperName: "Henry Moore", avatar: "/avatar10.png" },
  ]
}

function AnimatedPoints({ startPoints }) {
  const [currentPoints, setCurrentPoints] = useState(startPoints)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoints((prevPoints) => {
        const newPoints = prevPoints - (1 / 3600)
        return newPoints > 0 ? newPoints : 0
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-red-600" aria-live="polite">
        {currentPoints.toFixed(2)}
      </span>
      <TrendingDown className="ml-1 text-red-600" size={20} />
    </div>
  )
}

function HelperBox({ helper, isSelected, onSelect }) {
  return (
    <div className="w-24 flex flex-col items-center space-y-2">
      <Avatar className="w-12 h-12">
        <AvatarImage src={helper.avatar} alt={helper.helperName} />
        <AvatarFallback>{helper.helperName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <span className="font-semibold text-xs text-center truncate w-full">{helper.helperName}</span>
      <Button 
        size="sm" 
        className={`w-16 h-16 rounded-full ${isSelected ? 'bg-green-500' : 'bg-gradient-to-br from-red-500 to-red-600'} shadow-md text-white text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95`}
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.2)'
        }}
        onClick={onSelect}
      >
        {helper.points}
      </Button>
    </div>
  )
}

export default function TaskPosterView() {
  const [selectedHelper, setSelectedHelper] = useState(null)
  const { toast } = useToast()

  const handleHelperSelect = (helperId) => {
    if (selectedHelper === helperId) {
      setSelectedHelper(null)
      toast({
        title: "Helper Unselected",
        description: "You've unselected this helper.",
      })
    } else {
      setSelectedHelper(helperId)
      const helper = selectedHelpTask.topHelpers.find(h => h.id === helperId)
      if (helper) {
        toast({
          title: "Helper Selected",
          description: `You've chosen ${helper.helperName} to assist you with your task.`,
        })
      }
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
                <span className="sr-only">Go back</span>
              </Button>
              <AnimatedPoints startPoints={selectedHelpTask.topHelpers[0].points} />
            </div>
            <p className="text-gray-600 mb-2 text-lg">{selectedHelpTask.timeAway} away</p>
            <p className="text-gray-800 text-2xl font-semibold leading-tight">{selectedHelpTask.description}</p>
          </CardHeader>
          <CardContent className="p-6">
            {selectedHelpTask.mediaType === "video" && (
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <Play className="text-gray-500" size={48} />
              </div>
            )}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-4">Top Helpers:</h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {selectedHelpTask.topHelpers.map((helper) => (
                  <HelperBox 
                    key={helper.id} 
                    helper={helper} 
                    isSelected={selectedHelper === helper.id}
                    onSelect={() => handleHelperSelect(helper.id)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}