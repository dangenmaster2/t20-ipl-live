export interface TeamStanding {
  position: string
  teamCode: string
  matches: string
  won: string
  lost: string
  noResult: string
  netRunRate: string
  runsFor: string
  runsAgainst: string
  points: string
  form: string[]
}

export interface UpcomingMatch {
  matchStatus: string
  matchOrder: string
  matchDate: string
  matchTime: string
  venue: string
  team1: {
    name: string
    logo: string
  }
  team2: {
    name: string
    logo: string
  }
}

export interface LiveMatch extends UpcomingMatch {
  team1Score?: {
    runs: number
    wickets: number
    overs?: string
  }
  team2Score?: {
    runs: number
    wickets: number
    overs?: string
  }
  currentStatus?: string
}

export interface Match {
  id: string
  matchNumber: string
  format: string
  venue: string
  status: string
  teams: {
    code: string
    name: string
    score?: {
      runs: number
      wickets: number
      overs?: string
      balls?: number
    }
  }[]
  liveText?: string
  result?: string
}
