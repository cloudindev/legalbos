import type { NextAuthConfig } from "next-auth"

export default {
    providers: [], // Empty for now. Database logic moved to auth.ts for Node.js runtime
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.tenantId = (user as any).tenantId
                token.role = (user as any).role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token.id && session.user) {
                session.user.id = token.id as string
            }

            if (token.tenantId) {
                session.user.tenantId = token.tenantId as string
                session.user.role = token.role as string
            }

            return session
        },
    },
} satisfies NextAuthConfig
