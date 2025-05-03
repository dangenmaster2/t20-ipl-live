import Link from "next/link"
import type { Match } from "@/lib/types"

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <div className="flex items-center gap-2">
            {match.status === "LIVE" && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium">LIVE</span>
            )}
            {match.status === "RESULT" && <span className="text-gray-700 font-medium">RESULT</span>}
            <span>
              • {match.matchNumber} Match • {match.format}
            </span>
          </div>
          <span>{match.venue}</span>
        </div>

        <div className="space-y-4 mb-4">
          {match.teams.map((team, index) => (
            <div key={team.code} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-bold">{team.code.charAt(0)}</span>
                </div>
                <span className="font-medium">{team.name}</span>
              </div>

              {team.score && (
                <div className="text-right">
                  <div className="font-bold">
                    {team.score.runs}/{team.score.wickets}
                  </div>
                  {team.score.overs && (
                    <div className="text-xs text-gray-500">
                      {team.score.overs} ov{team.score.balls ? `, T:${team.score.balls}` : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-700">
          {match.status === "LIVE" && match.liveText}
          {match.status === "UPCOMING" && "Match yet to begin"}
          {match.status === "RESULT" && match.result}
        </div>
      </div>

      <div className="border-t flex text-sm">
        <Link href="#" className="flex-1 text-center py-2 hover:bg-gray-50">
          Schedule
        </Link>
        <Link href="#" className="flex-1 text-center py-2 hover:bg-gray-50 border-l">
          Table
        </Link>
        {match.status !== "UPCOMING" && (
          <Link href="#" className="flex-1 text-center py-2 hover:bg-gray-50 border-l">
            Report
          </Link>
        )}
        <Link href="#" className="flex-1 text-center py-2 hover:bg-gray-50 border-l">
          {match.status === "UPCOMING" ? "Series" : "Videos"}
        </Link>
      </div>
    </div>
  )
}
