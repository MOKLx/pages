import { type RouteConfig, index, route } from "@react-router/dev/routes"
import { basePath } from "../vite.config"

export default [
  index("routes/login.tsx"),
  route(basePath + "calendar", "routes/calendar.tsx"),
  route(basePath + "myappts", "routes/myappts.tsx"),
  route(basePath + "profile", "routes/profile.tsx"),
] satisfies RouteConfig
