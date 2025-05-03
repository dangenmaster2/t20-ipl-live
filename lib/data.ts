import type { TeamStanding, UpcomingMatch, LiveMatch } from "./types"

// Function to parse the points table data from the provided format
export async function getPointsTable(): Promise<TeamStanding[]> {
  // This would normally fetch from the API, but we'll use the provided data
  const rawData = [
    ["1", "", "MI", "11", "7", "4", "0", "1.274", "1962/202.2", "1846/219.1", "14", "W\nW\nW\nW\nW"],
    ["2", "", "RCB", "10", "7", "3", "0", "0.521", "1725/185.1", "1652/187.5", "14", "W\nW\nW\nL\nW"],
    ["3", "", "PBKS", "10", "6", "3", "1", "0.199", "1599/168.1", "1595/171.2", "13", "W\nN\nL\nW\nW"],
    ["4", "", "GT", "9", "6", "3", "0", "0.748", "1759/173.5", "1643/175.2", "12", "L\nW\nW\nL\nW"],
    ["5", "", "DC", "10", "6", "4", "0", "0.362", "1826/191.1", "1818/197.5", "12", "L\nL\nW\nL\nW"],
    ["6", "", "LSG", "10", "5", "5", "0", "-0.325", "1866/195.4", "1905/193.1", "10", "L\nL\nW\nL\nW"],
    ["7", "", "KKR", "10", "4", "5", "1", "0.271", "1442/167.4", "1409/169.1", "9", "W\nN\nL\nL\nW"],
    ["8", "", "RR", "11", "3", "8", "0", "-0.780", "2001/215.5", "2161/215.0", "6", "L\nW\nL\nL\nL"],
    ["9", "", "SRH", "9", "3", "6", "0", "-1.103", "1618/177.1", "1665/162.4", "6", "W\nL\nL\nW\nL"],
    ["10", "", "CSK", "10", "2", "8", "0", "-1.211", "1630/198.4", "1734/184.1", "4", "L\nL\nL\nW\nL"],
  ]

  // Transform the raw data into our TeamStanding type
  return rawData.map((team) => {
    const formString = team[11]
    const formArray = formString.split("\n")

    return {
      position: team[0],
      teamCode: team[2],
      matches: team[3],
      won: team[4],
      lost: team[5],
      noResult: team[6],
      netRunRate: team[7],
      runsFor: team[8],
      runsAgainst: team[9],
      points: team[10],
      form: formArray,
    }
  })
}

// Function to get upcoming matches
export async function getUpcomingMatches(): Promise<UpcomingMatch[]> {
  // This would normally fetch from the API, but we'll use the provided data
  const upcomingMatchesData = [
    {
      matchStatus: "upcoming",
      matchOrder: "Match 51",
      matchDate: "MAY, FRI 2",
      matchTime: "7:30 pm IST",
      venue: "Narendra Modi Stadium, Ahmedabad",
      team1: {
        name: "Gujarat Titans",
        logo: "https://scores.iplt20.com/ipl/teamlogos/GT.png?v=1",
      },
      team2: {
        name: "Sunrisers Hyderabad",
        logo: "https://scores.iplt20.com/ipl/teamlogos/SRH.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 52",
      matchDate: "MAY, SAT 3",
      matchTime: "7:30 pm IST",
      venue: "M Chinnaswamy Stadium, Bengaluru",
      team1: {
        name: "Royal Challengers Bengaluru",
        logo: "https://scores.iplt20.com/ipl/teamlogos/NVAlbtIyB81740555172aFPMviEPyJ1710927747rcb.png",
      },
      team2: {
        name: "Chennai Super Kings",
        logo: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 53",
      matchDate: "MAY, SUN 4",
      matchTime: "3:30 pm IST",
      venue: "Eden Gardens, Kolkata",
      team1: {
        name: "Kolkata Knight Riders",
        logo: "https://scores.iplt20.com/ipl/teamlogos/KKR.png",
      },
      team2: {
        name: "Rajasthan Royals",
        logo: "https://scores.iplt20.com/ipl/teamlogos/sSNjJEkBAx1742900310RR---New-Logo.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 54",
      matchDate: "MAY, SUN 4",
      matchTime: "7:30 pm IST",
      venue: "Himachal Pradesh Cricket Association Stadium, Dharamshala",
      team1: {
        name: "Punjab Kings",
        logo: "https://scores.iplt20.com/ipl/teamlogos/PBKS.png",
      },
      team2: {
        name: "Lucknow Super Giants",
        logo: "https://scores.iplt20.com/ipl/teamlogos/gPLvfvSC1X1711457972LSG.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 55",
      matchDate: "MAY, MON 5",
      matchTime: "7:30 pm IST",
      venue: "Rajiv Gandhi International Stadium, Hyderabad",
      team1: {
        name: "Sunrisers Hyderabad",
        logo: "https://scores.iplt20.com/ipl/teamlogos/SRH.png",
      },
      team2: {
        name: "Delhi Capitals",
        logo: "https://scores.iplt20.com/ipl/teamlogos/DC.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 56",
      matchDate: "MAY, TUE 6",
      matchTime: "7:30 pm IST",
      venue: "Wankhede Stadium, Mumbai",
      team1: {
        name: "Mumbai Indians",
        logo: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
      },
      team2: {
        name: "Gujarat Titans",
        logo: "https://scores.iplt20.com/ipl/teamlogos/GT.png?v=1",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 57",
      matchDate: "MAY, WED 7",
      matchTime: "7:30 pm IST",
      venue: "Eden Gardens, Kolkata",
      team1: {
        name: "Kolkata Knight Riders",
        logo: "https://scores.iplt20.com/ipl/teamlogos/KKR.png",
      },
      team2: {
        name: "Chennai Super Kings",
        logo: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 58",
      matchDate: "MAY, THU 8",
      matchTime: "7:30 pm IST",
      venue: "Himachal Pradesh Cricket Association Stadium, Dharamshala",
      team1: {
        name: "Punjab Kings",
        logo: "https://scores.iplt20.com/ipl/teamlogos/PBKS.png",
      },
      team2: {
        name: "Delhi Capitals",
        logo: "https://scores.iplt20.com/ipl/teamlogos/DC.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 59",
      matchDate: "MAY, FRI 9",
      matchTime: "7:30 pm IST",
      venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow",
      team1: {
        name: "Lucknow Super Giants",
        logo: "https://scores.iplt20.com/ipl/teamlogos/gPLvfvSC1X1711457972LSG.png",
      },
      team2: {
        name: "Royal Challengers Bengaluru",
        logo: "https://scores.iplt20.com/ipl/teamlogos/NVAlbtIyB81740555172aFPMviEPyJ1710927747rcb.png",
      },
    },
    {
      matchStatus: "upcoming",
      matchOrder: "Match 60",
      matchDate: "MAY, SAT 10",
      matchTime: "7:30 pm IST",
      venue: "Rajiv Gandhi International Stadium, Hyderabad",
      team1: {
        name: "Sunrisers Hyderabad",
        logo: "https://scores.iplt20.com/ipl/teamlogos/SRH.png",
      },
      team2: {
        name: "Kolkata Knight Riders",
        logo: "https://scores.iplt20.com/ipl/teamlogos/KKR.png",
      },
    },
  ]

  return upcomingMatchesData
}

// Function to get live matches
export async function getLiveMatches(): Promise<LiveMatch[]> {
  // This would normally fetch from the API, but we'll use the provided data
  // Currently there are no live matches as per the data
  return []
}

// Function to fetch all data at once (for API route)
export async function getAllData() {
  const pointsTable = await getPointsTable()
  const upcomingMatches = await getUpcomingMatches()
  const liveMatches = await getLiveMatches()

  return {
    pointsTable,
    upcomingMatches,
    liveMatches,
  }
}
