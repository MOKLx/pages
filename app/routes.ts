import { type RouteConfig, index, route } from "@react-router/dev/routes"

const path = "pages/"

export default [
  index("routes/login.tsx"),
  route(path + "calendar", "routes/calendar.tsx"),
  route(path + "myappts", "routes/myappts.tsx"),
  route(path + "profile", "routes/profile.tsx"),
] satisfies RouteConfig
