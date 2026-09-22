export type CampaignStatus = "Active" | "Pending Budget" | "Ended" | "Archive" | "Locked"

export type Campaign = {
  id: number
  name: string
  budget: string
  spent: string
  progress: number
  views: string
  status: CampaignStatus
  applicants: number
  pending: number
  platforms: string[]
  special?: string
}

export const campaigns: Campaign[] = [
  { id: 1, name: "Abu Lahiya", budget: "$15k Budget", spent: "$14.9K", progress: 79, views: "10M total views", status: "Active", applicants: 42, pending: 18, platforms: ["Clipping", "Gaming", "$1.50 / 1k", "TikTok", "YouTube", "Instagram"] },
  { id: 2, name: "Abu Lahiya", budget: "$15k Budget", spent: "$14.9K", progress: 79, views: "10M total views", status: "Active", applicants: 38, pending: 12, platforms: ["Clipping", "Gaming", "$1.50 / 1k", "TikTok", "YouTube", "Instagram"] },
  { id: 3, name: "Abu Lahiya", budget: "$15k Budget", spent: "$14.9K", progress: 79, views: "10M total views", status: "Active", applicants: 35, pending: 9, platforms: ["Clipping", "Gaming", "$1.50 / 1k", "TikTok", "YouTube", "Instagram"] },
  { id: 4, name: "Abu Lahiya", budget: "$15k Budget", spent: "$14.9K", progress: 79, views: "10M total views", status: "Active", applicants: 42, pending: 6, special: "6 pending applicants", platforms: ["Clipping", "Gaming", "$1.50 / 1k", "TikTok", "YouTube", "Instagram"] },
]
