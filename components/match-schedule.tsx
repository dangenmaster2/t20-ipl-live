"use client"

import { useState } from "react"
import Image from "next/image"
import type { UpcomingMatch } from "@/lib/types"

interface MatchScheduleProps {
  matches: UpcomingMatch[]
}

export default function MatchSchedule({ matches }: MatchScheduleProps) {
  const [filter, setFilter] = useState<string>("all")

  // Group matches by date
  const groupedMatches: Record<string, UpcomingMatch[]> = {}

  matches.forEach((match) => {
    if (!groupedMatches[match.matchDate]) {
      groupedMatches[match.matchDate] = []
    }
    groupedMatches[match.matchDate].push(match)
  })

  // Filter matches if needed
  const filteredDates =
    filter === "all"
      ? Object.keys(groupedMatches)
      : Object.keys(groupedMatches).filter((date) => {
          return groupedMatches[date].some(
            (match) => match.team1.name.includes(filter) || match.team2.name.includes(filter),
          )
        })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Filter Controls */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="text-sm font-medium text-gray-500 mb-2">Filter by team:</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Teams
          </button>
          {["Mumbai", "Chennai", "Kolkata", "Delhi", "Punjab"].map((team) => (
            <button
              key={team}
              onClick={() => setFilter(team)}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === team ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="divide-y">
        {filteredDates.length > 0 ? (
          filteredDates.map((date) => (
            <div key={date} className="divide-y">
              <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700">{date}</div>

              {groupedMatches[date]
                .filter(
                  (match) => filter === "all" || match.team1.name.includes(filter) || match.team2.name.includes(filter),
                )
                .map((match) => (
                  <div key={match.matchOrder} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <span>{match.matchOrder}</span>
                      <span>{match.matchTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 relative">
                          <Image
                            src={match.team1.logo || "/placeholder.svg"}
                            alt={match.team1.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium text-sm md:text-base">{match.team1.name}</span>
                      </div>

                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full mx-2">vs</span>

                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-sm md:text-base text-right">{match.team2.name}</span>
                        <div className="w-10 h-10 relative">
                          <Image
                            src={match.team2.logo || "/placeholder.svg"}
                            alt={match.team2.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-gray-500 truncate">{match.venue}</div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">No matches found for the selected team.</div>
        )}
      </div>
    </div>
  )
}
