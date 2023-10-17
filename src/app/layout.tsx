import { Inter } from "next/font/google";
import Providers, { colorContext } from "./Providers";

import "./globals.css";
import { useContext } from "react";
import { getCookie } from "@/components/Categories/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="fr">
                <body className={inter.className}>{children}</body>
            </html>
        </Providers>
    );
}
