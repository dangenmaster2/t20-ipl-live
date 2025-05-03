"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import MatchCards from "@/components/match-cards";
import PointsTable from "@/components/points-table";
import MatchSchedule from "@/components/match-schedule";
import TabView from "@/components/tab-view";
import { Toaster } from "react-hot-toast";
import PointsBarChart from "@/components/pointsbar-chart";
import { getAllData } from "@/lib/data";
import Loading from "./loading";
import DashboardContent from "./matches";

type RawPointsData = string[][];

interface TeamStanding {
  position: string;
  teamCode: string;
  matches: string;
  won: string;
  lost: string;
  noResult: string;
  netRunRate: string;
  runsFor: string;
  runsAgainst: string;
  points: string;
  form: string[];
}

const transformPointData = (rawData: RawPointsData): TeamStanding[] => {
  return rawData.map((team) => {
    const formArray = team[11].split("\n");
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
    };
  });
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(false);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/scrape/ipl", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch from API, using dummy data instead:", err);
      const fallbackData = await getAllData();
      setData(fallbackData);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!data) return <div className="p-4 text-gray-600"><Loading /></div>;

  const { pointsTable, upcomingMatches, liveMatches } = data;
  let formattedPointTable = [];
  if(!error) {
    formattedPointTable = transformPointData(pointsTable as RawPointsData);
  }
  else formattedPointTable = pointsTable;

  return (
    <DashboardContent
      liveMatches={data.liveMatches}
      upcomingMatches={data.upcomingMatches}
      formattedPointTable={formattedPointTable}
    />
  )
}
