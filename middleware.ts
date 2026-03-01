import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Si no está logueado y no está en login, redirigir a login
    if (!isLoggedIn && nextUrl.pathname !== "/login") {
        // Permitir llamados a NextAuth internamente (GET/POST a /api/auth) sin bloquear
        if (!nextUrl.pathname.startsWith("/api/auth")) {
            return Response.redirect(new URL("/login", nextUrl));
        }
    }

    // Si está logueado e intentando ir a la raíz (/) o (/login), mandar a dashboard
    if (isLoggedIn && (nextUrl.pathname === "/" || nextUrl.pathname === "/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
    }
});

export const config = {
    // Coincide con todo excepto estáticos, imágenes, etc
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
