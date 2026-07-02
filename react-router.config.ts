import type { Config } from "@react-router/dev/config"

export default {
  ssr: false,
  async prerender() {
    return ["/", "/calendar", "/myappts", "/profile"];
  },
} satisfies Config;
