// components/DashboardContent.tsx
import MatchCards from "@/components/match-cards";
import PointsTable from "@/components/points-table";
import MatchSchedule from "@/components/match-schedule";
import PointsBarChart from "@/components/pointsbar-chart";
import TabView from "@/components/tab-view";
import Navigation from "@/components/navigation";
import { Toaster } from "react-hot-toast";

interface DashboardContentProps {
  liveMatches: any[];
  upcomingMatches: any[];
  formattedPointTable: any[];
}

export default function DashboardContent({
  liveMatches,
  upcomingMatches,
  formattedPointTable,
}: DashboardContentProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">IPL 2025 Dashboard</h1>

        {liveMatches.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Live Matches</h2>
            <MatchCards matches={liveMatches} isLive />
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
          <MatchCards matches={upcomingMatches.slice(0, 6)} isLive={false} />
        </section>

        <section>
          <TabView
            tabs={[
              {
                id: "points",
                label: "Points Table",
                content: <PointsTable data={formattedPointTable} />,
              },
              {
                id: "schedule",
                label: "Match Schedule",
                content: <MatchSchedule matches={upcomingMatches} />,
              },
              {
                id: "insights",
                label: "Insights",
                content: <PointsBarChart data={formattedPointTable} />,
              },
            ]}
          />
        </section>
      </div>
    </main>
  );
}
