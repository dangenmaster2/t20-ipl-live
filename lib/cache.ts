let cachedData: {
    pointsTable: string[][],
    upcomingMatches: any[],
    timestamp: number
  } | null = null;
  
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
  