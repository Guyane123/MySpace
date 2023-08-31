import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "../../components/navMenu/NavMenu";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Myspace",
    description: "Next js social media",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <html lang="fr">
                <body className={inter.className}>
                    <NavMenu />

                    {children}
                </body>
            </html>
        </AuthProvider>
    );
}
