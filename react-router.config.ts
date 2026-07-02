import type { Config } from "@react-router/dev/config"

export default {
  ssr: false,
  basename: "/pages",
  async prerender() {
    return ["/"];
  },
} satisfies Config;
