export const performanceTabs = ["Views", "Engagement", "Likes", "Comments", "Shares"] as const;

export const chartPoints = [
  { label: "Jan 7", views: 52, engagement: 71, likes: 64, comments: 69, shares: 66 },
  { label: "Jan 10", views: 69, engagement: 66, likes: 73, comments: 76, shares: 68 },
  { label: "Jan 13", views: 31, engagement: 22, likes: 42, comments: 54, shares: 38 },
  { label: "Jan 16", views: 24, engagement: 19, likes: 37, comments: 48, shares: 33 },
  { label: "Jan 19", views: 27, engagement: 22, likes: 39, comments: 51, shares: 35 },
  { label: "Jan 23", views: 52, engagement: 48, likes: 56, comments: 66, shares: 58 },
  { label: "Jan 28", views: 66, engagement: 61, likes: 62, comments: 71, shares: 63 },
  { label: "Feb 1", views: 43, engagement: 49, likes: 50, comments: 69, shares: 57 },
  { label: "Feb 5", views: 38, engagement: 51, likes: 56, comments: 64, shares: 59 },
  { label: "Feb 9", views: 57, engagement: 63, likes: 68, comments: 67, shares: 64 },
  { label: "Feb 13", views: 78, engagement: 77, likes: 76, comments: 77, shares: 75 },
];

export const totals = [
  { label: "Total Views", value: "5.14M", detail: "+18.3% vs prev", bars: [46, 62, 72, 86, 100] },
  { label: "Total Payouts", value: "$4,218", detail: "$832 pending", bars: [44, 56, 67, 82, 96] },
  { label: "Effective CPM", value: "$0.84", detail: "Running efficiently", bars: [62, 69, 63, 58, 52] },
  { label: "Submissions", value: "847", detail: "680 approved - 80.3%", bars: [35, 48, 60, 74, 91] },
];

export const legend = [
  { name: "Views", value: "5.14M", color: "#25d97b" },
  { name: "Engagement", value: "4.8%", color: "#60a5fa" },
  { name: "Likes", value: "465K", color: "#74df8f" },
  { name: "Comments", value: "629K", color: "#f4b84a" },
  { name: "Shares", value: "213K", color: "#aeb4bd" },
];

export const audiencesByCountry = [
  { label: "United States", value: "2.10M", percent: "41%", marker: "🇺🇸", width: 41, barColor: "#25bd6d" },
  { label: "United Kingdom", value: "920K", percent: "18%", marker: "🇬🇧", width: 18, barColor: "#168950" },
  { label: "Canada", value: "610K", percent: "12%", marker: "🇨🇦", width: 12, barColor: "#23734e" },
  { label: "Other", value: "1.51M", percent: "29%", marker: "🌐", width: 29, barColor: "#173f35" },
];

export const audiencesByView = [
  { label: "Instagram", value: "3.14M", percent: "61%", width: 61, barColor: "#25bd6d", markerColor: "#25c878" },
  { label: "TikTok", value: "1.02M", percent: "20%", width: 20, barColor: "#168950", markerColor: "#25c878" },
  { label: "YouTube", value: "612K", percent: "12%", width: 12, barColor: "#23734e", markerColor: "#25c878" },
  { label: "X", value: "354K", percent: "7%", width: 7, barColor: "#173f35", markerColor: "#185d42" },
];

export const leaderboard = [
  { rank: 1, platform: "Instagram", views: "3.14M", posts: 345, engagement: "1.8%", cpm: "$0.12" },
  { rank: 2, platform: "TikTok", views: "1.02M", posts: 289, engagement: "4.2%", cpm: "$0.04" },
  { rank: 3, platform: "YouTube", views: "612K", posts: 123, engagement: "3.1%", cpm: "$0.06" },
  { rank: 4, platform: "X", views: "354K", posts: 61, engagement: "0.9%", cpm: "$0.22" },
];

export const clusters = [
  { label: "Reaction", value: "500K", className: "bg-[#24B46A]" },
  { label: "Meme Edits", value: "200K", className: "bg-[#286E51]" },
  { label: "POV / Skit", value: "180K", className: "bg-[#286B53]" },
  { label: "Transformation", value: "150K", className: "bg-[#28634F]" },
  { label: "Tutorial", value: "92K", className: "bg-[#285A50]" },
  { label: "Unboxing", value: "24K", className: "bg-[#274A4D]" },
];

export const heatmap = [
  [20, 28, 35, 30, 34, 29, 39, 43, 48, 51, 55, 70, 75, 68, 56, 51, 63, 79, 83, 86, 76, 55, 47, 38],
  [38, 45, 52, 46, 41, 51, 56, 60, 62, 59, 66, 80, 87, 78, 71, 67, 74, 88, 94, 91, 81, 63, 56, 48],
  [44, 53, 60, 55, 50, 46, 52, 57, 61, 66, 69, 76, 83, 72, 68, 61, 70, 84, 90, 86, 75, 66, 55, 44],
  [31, 39, 48, 42, 36, 43, 50, 54, 56, 68, 77, 83, 88, 81, 70, 65, 72, 86, 92, 89, 78, 67, 58, 50],
  [24, 35, 40, 44, 42, 48, 51, 55, 60, 67, 76, 82, 85, 78, 66, 58, 69, 81, 87, 82, 72, 61, 52, 44],
  [18, 25, 31, 35, 29, 34, 38, 41, 46, 52, 60, 68, 74, 65, 54, 49, 56, 66, 73, 69, 59, 49, 42, 35],
  [12, 20, 26, 28, 24, 29, 33, 37, 42, 50, 58, 64, 70, 62, 51, 46, 52, 61, 68, 65, 55, 44, 36, 29],
];

export const postBars = [42, 55, 68, 61, 73, 82, 90, 76, 95, 87, 99, 84, 100, 91, 96, 106];
