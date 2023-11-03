import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import Login from "@/components/Login/Login";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import phone1 from "../../../../public/phone1.png";
import phone2 from "../../../../public/phone2.png";
import Image from "next/image";
export default async function SignInPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    return (
        <div className={styles.flex}>
            <div className={styles.imgContainer}>
                <Image
                    src={phone1}
                    width={250}
                    height={538}
                    alt="phone"
                    className={styles.img}
                />
                <Image
                    src={phone2}
                    width={250}
                    height={538}
                    alt="phone"
                    className={styles.img}
                />
            </div>
            <Login />
        </div>
    );
}
