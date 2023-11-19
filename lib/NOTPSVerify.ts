import notp from "notp";
import { base32 } from "./encodeToBase32";
import fetchUser from "@/app/api/fetchUser";
import { encrypt } from "./encrypt";

export default async function NOTPSVerify(token: string, email: string) {
    const hashedCode = await encrypt.hash(email);
    const code = hashedCode;

    if (!code) {
        return false;
    }
    const secret = base32
        .encode(code)
        .slice(0, 16)
        .toString()
        .replace(/=/g, "");

    const login = notp.totp.verify(token, secret);

    // console.log("TOKEN: " + token);
    // console.log("SECRET: " + secret);
    // console.log("SECRET SHOULD BE: " + totp.gen(secret, { time: 30 }));
    // console.log("LOGIN" + login);
    // console.log("LOGIN DELTA" + login?.delta);

    if (login) {
        return true;
    } else {
        return false;
    }
}
