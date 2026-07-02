import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/login.tsx"),
  route("calendar", "routes/calendar.tsx"),
  route("myappts", "routes/myappts.tsx"),
  route("profile", "routes/profile.tsx"),
] satisfies RouteConfig
