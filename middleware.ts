import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname === "/register" || nextUrl.pathname === "/login" || nextUrl.pathname.startsWith("/api/auth");

    // Si no está logueado y no está en una ruta pública, redirigir a login
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    // Si está logueado e intentando ir a login o registro, mandar a dashboard
    if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
    }
});

export const config = {
    // Coincide con todo excepto estáticos, imágenes, etc
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
