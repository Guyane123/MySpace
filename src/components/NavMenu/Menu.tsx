/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./NavMenu.module.css";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export default function Menu({ currentUserId }: { currentUserId: String }) {
    const ref = useRef<HTMLDivElement>(null);
    const menu = useRef<HTMLDivElement>(null);

    useEffect(() => {
        menu.current!.style.right = "16px";
        menu.current!.style.top = "16px";
        const handleOutSideClick = (event: any) => {
            if (!ref.current?.contains(event.target)) {
                menu.current!.style.scale = "0%";
            } else {
                menu.current!.style.scale = "100%";
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);

    return (
        <div ref={ref}>
            <ProfilePicture
                width={undefined}
                height={undefined}
                link={undefined}
            />
            <div className={styles.menu} ref={menu}>
                <ul className={styles.menuList}>
                    <Link
                        className={styles.a}
                        onClick={() => (menu.current!.style.scale = "0%")}
                        href={`/settings/`}
                    >
                        <li>Settings</li>
                    </Link>
                    <Link
                        className={styles.a}
                        onClick={() => (menu.current!.style.scale = "0%")}
                        href={`/users/${currentUserId}`}
                    >
                        <li>Profile</li>
                    </Link>
                    <li
                        onClick={() => {
                            signOut();
                            menu.current!.style.scale = "0%";
                        }}
                        className={styles.signOut}
                    >
                        Sign Out
                    </li>
                </ul>
            </div>
        </div>
    );
}
