import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {ThemeProvider} from "@/app/ui/theme-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Andy's Steigerbouw"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" className="h-full group/html" suppressHydrationWarning>

        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] h-full`}
        >

        <ThemeProvider
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        > {children}</ThemeProvider>

        </body>
        </html>
    );
}
