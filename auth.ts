import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db/prisma"
import authConfig from "./auth.config"

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    debug: true,
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                console.log("AUTH [credentials]: received login attempt");
                try {
                    const parsedCredentials = z
                        .object({ email: z.string().email(), password: z.string().min(1) })
                        .safeParse(credentials)

                    if (!parsedCredentials.success) {
                        console.log("AUTH [credentials]: zod validation failed", parsedCredentials.error.message);
                        return null;
                    }

                    const { email, password } = parsedCredentials.data
                    console.log("AUTH [credentials]: validated email:", email);

                    const user = await prisma.user.findUnique({ where: { email } })

                    if (!user) {
                        console.log("AUTH [credentials]: user not found in DB.");
                        return null
                    }

                    console.log("AUTH [credentials]: user found.", user.id);
                    const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

                    if (passwordsMatch) {
                        console.log("AUTH [credentials]: password match successful.");
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            tenantId: user.tenantId,
                            role: user.role
                        }
                    } else {
                        console.log("AUTH [credentials]: wrong password.");
                    }
                } catch (e: any) {
                    console.error("AUTH [credentials] DB FATAL ERROR:", e);
                }

                return null
            },
        }),
    ],

})
