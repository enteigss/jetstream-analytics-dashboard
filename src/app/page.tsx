import { Suspense } from "react"
import DashboardHeader from "@/components/dashboard-header"
import PostsOverview from "@/components/posts-overview"
import PostsTable from "@/components/posts-table"
import PostsChart from "@/components/posts-chart"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Posts Dashboard</h2>
        </div>
        <Suspense fallback={<Skeleton className="h-[125px] w-full" />}>
          <PostsOverview />
        </Suspense>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <PostsChart />
            </Suspense>
          </div>
          <div className="col-span-3">
            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <PostsTable />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

