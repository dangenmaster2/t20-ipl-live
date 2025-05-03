import type { TeamStanding } from "@/lib/types"

interface PointsTableProps {
  data: TeamStanding[]
}

export default function PointsTable({ data }: PointsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Pos
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Team
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                P
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                W
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                L
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NR
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Pts
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NRR
              </th>
              <th
              scope="col"
              className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Form
            </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((team) => (
              <tr key={team.position} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.position}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{team.teamCode}</div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.matches}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.won}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.lost}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.noResult}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                  {team.points}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.netRunRate}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <div className="flex space-x-1 justify-center">
                  {team.form.map((result, index) => (
                    <span
                      key={index}
                      className={`inline-block w-5 h-5 text-xs flex items-center justify-center rounded-full ${
                        result === "W"
                          ? "bg-green-100 text-green-800"
                          : result === "L"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
