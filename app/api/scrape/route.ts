import { NextResponse } from "next/server"
import { getAllData } from "@/lib/data"

// Cache control constants
const CACHE_MAX_AGE = 60 * 5 // 5 minutes

export async function GET() {
  try {
    // Get all data from our data functions
    const data = await getAllData()

    // Return the data with cache headers
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}`,
      },
    })
  } catch (error) {
    console.error("Error fetching cricket data:", error)
    return NextResponse.json({ error: "Failed to fetch cricket data" }, { status: 500 })
  }
}
