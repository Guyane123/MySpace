import styles from "./page.module.css";
import Login from "@/components/Login/Login";

import phone1 from "../../../../public/phone1.png";
import phone2 from "../../../../public/phone2.png";
import Image from "next/image";
export default async function SignInPage() {
    return (
        <div className={styles.flex}>
            <div className={styles.imgContainer}>
                <Image
                    src={phone1}
                    width={250}
                    height={538}
                    alt="phone"
                    className={styles.img1}
                />
                <Image
                    src={phone2}
                    width={250}
                    height={538}
                    alt="phone"
                    className={styles.img2}
                />
            </div>
            <Login />
        </div>
    );
}
