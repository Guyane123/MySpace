import { hash } from "@/app/api/auth/[...nextauth]/actions";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import Code from "@/components/QRCode/Code";
import QRCodeComponent from "@/components/QRCode/Qrcode";
import style from "./page.module.css";
import notp from "notp";
import { base32 } from "../../../../../lib/encodeToBase32";

export default async function Page() {
    const currentUser = await fetchCurrentUser();

    const hashedCode = await hash(currentUser?.email!);
    const code = hashedCode;

    const secret = base32.encode(code).slice(0, 16);

    const issuer = "PinkBerries";
    const label = currentUser?.email!;

    const totpURL = `otpauth://totp/${encodeURIComponent(
        issuer
    )}:${encodeURIComponent(
        label
    )}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;

    return (
        <>
            <Code code={secret} />
            <QRCodeComponent data={totpURL} />

            <ol className={style.instruction}>
                <li className={style.li}>
                    1. Installez une application d’authentification tierce sur
                    votre appareil. Nous vous recommandons d’installer
                    l’application sur l’appareil que vous utilisez
                    habituellement pour accéder à Pinkberries.
                </li>
                <li className={style.li}>
                    2. Grâce à l&apos;application d&apos;authentification,
                    scannez le QRCode ou créer une clé de configuration en
                    saisissant {secret} comme clé.
                </li>
            </ol>
        </>
    );
}
