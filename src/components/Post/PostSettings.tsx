"use client";

import styles from "./Post.module.css";
import { ChangeEvent, LegacyRef, useState } from "react";
import { deletePost } from "@/app/api/post";
import { usePathname } from "next/navigation";
import { useEffect, createRef, useRef } from "react";
import { PostType } from "@/app/types";
import CheckIfAdmin from "../CheckIfAdmin/CheckIfAdmin";
import createPushNotification from "@/app/api/createPushNotification";

export default function PostSettings({ post }: { post: any }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const settings = useRef<HTMLDivElement>(null);

    const base = "https://pink-berries-i9hk.vercel.app";
    const link = base + `/users/${post.authorId}/post/${post.id}`;

    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    useEffect(() => {
        async function getIsAdmin() {
            const isAdmin = await CheckIfAdmin();
            setIsAdmin(isAdmin);

            console.log(isAdmin);
        }

        getIsAdmin();
    }, []);

    useEffect(() => {
        settings.current!.style.right = "16px";
        settings.current!.style.top = "16px";
        const handleOutSideClick = (event: any) => {
            if (!ref.current?.contains(event.target)) {
                settings.current!.style.scale = "0%";
            } else {
                settings.current!.style.scale = "100%";
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const val = e.currentTarget.value;

        if (val == "delete") {
            deletePost(post.id);
        } else if (val == "copy") {
            navigator.clipboard.writeText(link);
        } else if (val == "push") {
        }
    }

    return (
        <div ref={ref} className={styles.settings_wrapper}>
            <button
                className={styles.settingBtn}
                onClick={(e) => {
                    ref.current!.style.scale = "100%";
                }}
            >
                ...
            </button>
            <div ref={settings} className={styles.settings}>
                <ul className={styles.list}>
                    {post.authorId == post.currentUserId || isAdmin ? (
                        <li
                            className={styles.red}
                            onClick={async () => {
                                settings.current!.style.scale = "0%";
                                await deletePost(post.id);
                            }}
                        >
                            Delete
                        </li>
                    ) : (
                        ""
                    )}
                    <li
                        onClick={() => {
                            navigator.clipboard.writeText(link);
                            settings.current!.style.scale = "0%";
                        }}
                    >
                        Copy Link
                    </li>
                    <li>Subscribe</li>
                    <li
                        onClick={async () =>
                            await createPushNotification(
                                "clovp3zkf000kng64u6bi879b"
                            )
                        }
                    >
                        send Push
                    </li>
                    <li>Block</li>
                    <li>Report</li>
                </ul>
            </div>
        </div>
    );
}
