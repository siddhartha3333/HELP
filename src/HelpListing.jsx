"use client"

import React, { useState, useEffect } from 'react'
import { Search, TrendingDown } from 'lucide-react'
import { Input } from "@/components/ui/input"

const helpRequests = [
  { id: 1, task: "Help moving furniture", location: "Downtown", maxIncome: 60, minIncome: 40 },
  { id: 2, task: "Dog walking", location: "Central Park", maxIncome: 20, minIncome: 12 },
  { id: 3, task: "Grocery shopping for elderly", location: "Suburb", maxIncome: 35, minIncome: 25 },
  { id: 4, task: "Tech support for computer", location: "Remote", maxIncome: 40, minIncome: 20 },
  { id: 5, task: "Garden maintenance", location: "Westside", maxIncome: 50, minIncome: 35 },
  { id: 6, task: "Tutoring math for high school student", location: "Local library", maxIncome: 30, minIncome: 18 },
]

function AnimatedIncome({ maxIncome, minIncome }) {
  const [currentIncome, setCurrentIncome] = useState(maxIncome)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIncome((prevIncome) => {
        const newIncome = prevIncome - (1 / 3600)
        return newIncome > minIncome ? newIncome : maxIncome
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [maxIncome, minIncome])

  return (
    <div className="flex items-center">
      <span className="text-lg font-bold text-red-600" aria-live="polite">
        ${currentIncome.toFixed(2)}
      </span>
      <TrendingDown className="ml-1 text-red-600" size={16} />
    </div>
  )
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRequests = helpRequests.filter(request =>
    request.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search tasks or locations..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div 
              key={request.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative"
            >
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 text-gray-800">{request.task}</h3>
                <p className="text-gray-600 mb-4">{request.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Income Potential</p>
                    <AnimatedIncome maxIncome={request.maxIncome} minIncome={request.minIncome} />
                  </div>
                  <button 
                    className="w-20 h-20 bg-red-500 rounded-full shadow-lg transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 active:transform active:scale-95"
                    aria-label="Help with this task"
                  >
                    <span className="text-white font-bold text-lg">HELP</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
