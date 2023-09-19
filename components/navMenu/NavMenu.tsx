import Link from "next/link";
import Image from "next/image";
import Messages from "../../public/message.svg";
import Logo from "../../public/logo.svg";
import styles from "./NavMenu.module.css";
import { SignInButton, SignOutButton } from "../Buttons/Buttons";
import { Inter } from "next/font/google";

export default async function NavMenu() {
    return (
        <nav className={styles.nav}>
            <Link href={"/"}>
                <Image src={Logo} alt="logo" height={50} width={100} />
            </Link>

            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href={"/about"}>About</Link>
                </li>
                <li className={styles.li}>
                    <Link href={"/blog"}>Blog</Link>
                </li>
                <li className={styles.li}>
                    <Link href={"/users"}>Users</Link>
                </li>
            </ul>

            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href={"/messages"} className={styles.li}>
                        <Image
                            src={Messages}
                            style={{ display: "inline" }}
                            alt="logo"
                            height={32}
                            width={32}
                        />
                    </Link>
                </li>
                <li className={styles.li}>
                    <SignInButton className={styles.btn} />
                </li>
                <li className={styles.li}>
                    <SignOutButton className={styles.btn} />
                </li>
            </ul>
        </nav>
    );
}
