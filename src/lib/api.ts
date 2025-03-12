export async function fetchHourlyPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/metrics/hourly?days=1", {
      next: { revalidate: 3600 }, // Revalidate every hour
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error("Failed to fetch hourly posts data")
    }

    const data = await response.json()

    console.log("Returning data from API")
    return data.map(item => ({
      hour: parseInt(item.time.split(' ')[1].split(':')[0]),
      posts: item.post_count
    }))
  } catch (error) {
    console.error("Error fetching hourly posts:", error)

    console.log("Returning mock data")
    // Return mock data for demonstration
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      posts: Math.floor(Math.random() * 50) + 10,
    }))
  }
}

// Fetch latest posts

export async function fetchLatestPosts() {
  try {
    const response = await fetch("https://api.example.com/posts/latest", {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch latest posts")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching latest posts:", error)

    // Return mock data for demonstration
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Sample Post ${i + 1}`,
      author: `Author ${Math.floor(Math.random() * 5) + 1}`,
      time: `${new Date().getHours()}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    }))
  }
}

// Fetch posts statistics
export async function fetchPostsStats() {
  try {
    const response = await fetch("https://api.example.com/posts/stats", {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch posts statistics")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching posts stats:", error)

    // Return mock data for demonstration
    const totalToday = Math.floor(Math.random() * 500) + 200
    const peakHour = Math.floor(Math.random() * 24)

    return {
      totalToday,
      todayChange: Math.floor(Math.random() * 20) - 5,
      averagePerHour: Math.floor(totalToday / 24),
      averageChange: Math.floor(Math.random() * 15) - 3,
      peakHour,
      peakPosts: Math.floor(Math.random() * 50) + 30,
      currentHourPosts: Math.floor(Math.random() * 40) + 10,
      currentHourChange: Math.floor(Math.random() * 25) - 10,
    }
  }
}


