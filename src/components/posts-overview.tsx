import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchPostsStats } from "@/lib/api"

export default async function PostsOverview() {
  const stats = await fetchPostsStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalToday}</div>
          <p className="text-xs text-muted-foreground">
            {stats.todayChange > 0 ? "+" : ""}
            {stats.todayChange}% from yesterday
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Posts Per Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averagePerHour}</div>
          <p className="text-xs text-muted-foreground">
            {stats.averageChange > 0 ? "+" : ""}
            {stats.averageChange}% from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.peakHour}:00</div>
          <p className="text-xs text-muted-foreground">{stats.peakPosts} posts</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.currentHourPosts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.currentHourChange > 0 ? "+" : ""}
            {stats.currentHourChange}% from same hour yesterday
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

