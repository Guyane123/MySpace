import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "../../components/NavMenu/NavMenu";
import Providers from "./Providers";
import CheckSession from "../../components/CheckSession/CheckSession";
import { getCookie } from "../../components/Categories/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PinkBerries",
    description: "Next js social media",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentCategory = await getCookie("currentCategory");
    CheckSession();
    return (
        <Providers>
            <html lang="fr">
                <body className={inter.className}>
                    <NavMenu currentCategory={currentCategory} />

                    {children}
                </body>
            </html>
        </Providers>
    );
}
