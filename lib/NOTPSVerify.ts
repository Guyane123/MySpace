import notp from "notp";
import { base32 } from "./encodeToBase32";
import { hash } from "@/app/api/auth/[...nextauth]/actions";
import fetchUser from "@/app/api/fetchUser";

export default async function NOTPSVerify(token: string, email: string) {
    const user = await fetchUser(email);

    const hashedCode = await hash(user?.email!);
    const code = hashedCode;

    const secret = base32
        .encode(code)
        .slice(0, 16)
        .toString()
        .replace(/=/g, "");

    console.log("TOKEN: " + token);
    console.log("SECRET: " + secret);

    const login = notp.totp.verify(token, secret);

    console.log("dd");

    if (login) {
        return true;
    } else {
        return false;
    }
}
