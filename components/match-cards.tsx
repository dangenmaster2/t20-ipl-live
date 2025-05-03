import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface Team {
  name: string;
  code: string;
  logo: string;
  score: string;
  over: string;
}

interface Match {
  matchNumber: string;
  venue: string;
  matchDate: string;
  matchTime: string;
  matchCentreLink: string;
  toss: string;
  team1: Team;
  team2: Team;
}

interface MatchCardsProps {
  matches: Match[];
  isLive?: boolean;
}

export default function MatchCards({ matches, isLive = false }: MatchCardsProps) {
  const prevScoreTeam1Ref = useRef<string>('');
  const prevScoreTeam2Ref = useRef<string>('');

  useEffect(() => {
    if (!matches || matches.length === 0) return;

    const match = matches[0];
    const { team1, team2 } = match;

    const checkForEvent = (prevScore: string, currentScore: string, teamName: string) => {
      if (!prevScore || !currentScore) return;

      const [prevRuns, prevWkts] = prevScore.split('/').map(Number);
      const [currRuns, currWkts] = currentScore.split('/').map(Number);

      const runDiff = currRuns - prevRuns;
      const wktDiff = currWkts - prevWkts;

      if (wktDiff > 0) {
        toast(`${teamName} - WICKET! 🔥`, { icon: '', duration: 3000 });
      } else if ([4,6].includes(runDiff)) {
        toast(`${teamName} - ${runDiff === 4 ? 'FOUR' : 'SIX'}! 💥`, { icon: '', duration: 3000 });
      }
    };

    checkForEvent(prevScoreTeam1Ref.current, team1.score, team1.name);
    checkForEvent(prevScoreTeam2Ref.current, team2.score, team2.name);

    prevScoreTeam1Ref.current = team1.score;
    prevScoreTeam2Ref.current = team2.score;
  }, [matches[0]?.team1.score, matches[0]?.team2.score]);
  return (
    // Outer container (scrollable row)
<div className="overflow-x-auto">
  <div className="flex space-x-4 px-4 py-5">
    {matches.map((match, i) => (
      <div
        key={i}
        className="min-w-[300px] max-w-xs bg-white rounded-xl shadow-md overflow-hidden border flex-shrink-0"
      >
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
          <div>
            <div className="font-semibold text-gray-800">{match.matchNumber}</div>
            <div className="text-xs text-gray-600">{match.matchDate} • {match.matchTime}</div>
            <div className="text-xs text-gray-500 truncate">{match.venue}</div>
          </div>
          {isLive && (
            <span className="bg-red-500 text-white px-2 py-0.5 text-xs font-medium rounded-full animate-pulse">
              LIVE
            </span>
          )}
        </div>

        {/* Teams & Scores */}
        <div className="px-4 py-5 space-y-4">
          {[match.team1, match.team2].map((team, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <div>
                  <div className="font-medium text-sm">{team.name} {team.code}</div>
                  {isLive && (
                    <div className="text-sm text-gray-700">
                      {team.score} {team.over && <span className="text-xs text-gray-500">{team.over}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {
          isLive && <div className="px-4 py-3 bg-gray-50 border-t text-sm flex justify-between items-center">
          
            <div className="text-gray-700">{match.toss || "Toss info not available"}</div>
          
          {match.matchCentreLink && (
            <Link
              href={match.matchCentreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Match Centre
            </Link>
          )} 
        </div>
      }
      </div>
    ))}
  </div>
</div>

  );
}
