import type { NextAuthConfig } from "next-auth"

export default {
    providers: [], // Empty for now. Database logic moved to auth.ts for Node.js runtime
} satisfies NextAuthConfig
