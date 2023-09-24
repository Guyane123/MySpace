import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "../../components/NavMenu/NavMenu";
import Providers from "./Providers";
import CheckSession from "../../components/CheckSession/CheckSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PinkBerries",
    description: "Next js social media",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    CheckSession();
    return (
        <Providers>
            <html lang="fr">
                <body className={inter.className}>
                    <NavMenu />

                    {children}
                </body>
            </html>
        </Providers>
    );
}
