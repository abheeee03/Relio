type WebsiteResponse = {
    id: string,
    ticks: {
        status: "Up" | "Down" | "Unknown"
    }[],
    url: string
}