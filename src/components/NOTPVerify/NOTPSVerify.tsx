import notp from "notp";
import base32 from "thirty-two";

export default function NOTPSVerify(token: string) {
    const key = "12345";
    const base32Encoded = base32.encode(key).toString().replace(/=/g, "");

    const login = notp.totp.verify(token, base32Encoded);

    if (login) {
        return true;
    }
}
