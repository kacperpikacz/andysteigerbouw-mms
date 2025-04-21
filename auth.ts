import NextAuth from "next-auth"
import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";
import {NextResponse} from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        MicrosoftEntraID({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        }),
    ],
    callbacks: {
        authorized: async ({ auth, request }) => {
            const pathname = request.nextUrl.pathname;
            if ((pathname === "/signin" || pathname === "/") && auth) return NextResponse.redirect(new URL("/dashboard", request.url));

            return !!auth;
        },
        redirect: ({baseUrl, url}) => {

            return url;
        }
    },
    pages: {
        signIn: "/signin",
    },
    debug: false
})