import { Lato, Montserrat, Roboto, Work_Sans } from "next/font/google";
import Providers from "./Providers";

import "./globals.css";

// const lato = Lato({ weight: "700", subsets: ["latin"] });
// const montSerrat = Montserrat({ weight: "700", subsets: ["latin"] });
// const workSans = Work_Sans({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="fr">
                <body className={roboto.className}>{children}</body>
            </html>
        </Providers>
    );
}
