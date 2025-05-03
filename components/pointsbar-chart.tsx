// components/PointsBarChart.tsx
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { TeamStanding } from '@/lib/types'

interface Props {
  data: TeamStanding[]
}

export default function PointsBarChart({ data }: Props) {
  const chartData = data.map((team) => ({
    name: team.teamCode,
    points: parseInt(team.points),
  }))

  return (
    <div className="w-full h-80 bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Team Points Comparison</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="points" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
