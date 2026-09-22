export type SubmissionStatus = "Pending" | "Approved" | "Rejected" | "Flagged"

export type Submission = {
  id: number
  creator: string
  initial: string
  campaign: string
  submitted: string
  views: string
  followers: string
  score: number
  status: SubmissionStatus
  avatarClass: string
  platform: string
}

export const submissions: Submission[] = [
  { id: 1, creator: "xKaizen", initial: "X", campaign: "Caffeine AI", submitted: "1d ago", views: "1.2M views", followers: "564K", score: 23, status: "Flagged", avatarClass: "bg-amber-500", platform: "TikTok" },
  { id: 2, creator: "Cryptoclipz", initial: "C", campaign: "Caffeine AI", submitted: "1d ago", views: "1.1M views", followers: "560K", score: 92, status: "Pending", avatarClass: "bg-red-500", platform: "TikTok" },
  { id: 3, creator: "ViralVee", initial: "V", campaign: "FitTrack Pro", submitted: "1d ago", views: "890K views", followers: "142K", score: 78, status: "Pending", avatarClass: "bg-violet-500", platform: "TikTok" },
  { id: 4, creator: "TechTalksDaily", initial: "T", campaign: "NovaPay", submitted: "1d ago", views: "2.4M views", followers: "1.2K", score: 45, status: "Flagged", avatarClass: "bg-blue-500", platform: "Instagram" },
]
