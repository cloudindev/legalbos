import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcrypt"
import prisma from "@/lib/db/prisma"
import authConfig from "./auth.config"

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(1) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await prisma.user.findUnique({ where: { email } })

                    if (!user) return null

                    const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

                    if (passwordsMatch) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            tenantId: user.tenantId,
                            role: user.role
                        }
                    }
                }

                return null
            },
        }),
    ],
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
})
