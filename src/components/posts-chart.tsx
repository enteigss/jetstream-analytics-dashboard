"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { fetchHourlyPosts } from "@/lib/api"

export default function PostsChart() {
  console.log("Rendering Posts Chart")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const hourlyData = await fetchHourlyPosts()
        // const hourlyData = hourlyDataFull.map(({ time, post_count}) => ({ time, post_count }))
        setData(hourlyData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hourly Post Distribution</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center">
          <div className="animate-pulse h-4 w-32 bg-muted rounded"></div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hourly Post Distribution</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center text-destructive">{error}</CardContent>
      </Card>
    )
  }

  console.log("Data:", data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Post Distribution</CardTitle>
        <CardDescription>Number of posts published each hour</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ChartContainer
          config={{
            posts: {
              label: "Posts",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" tickFormatter={(hour) => `${hour}:00`} tickLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="posts" fill="var(--color-posts)" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

