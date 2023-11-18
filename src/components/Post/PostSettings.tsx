"use client";

import styles from "./Post.module.css";
import { ChangeEvent, LegacyRef, useState } from "react";
import { deletePost } from "@/app/api/post";
import { usePathname } from "next/navigation";
import { useEffect, createRef, useRef } from "react";
import { PostType } from "@/app/types";
import CheckIfAdmin from "../../../lib/CheckIfAdmin";
import createPushNotification from "@/app/api/createPushNotification";
import { createBlock } from "@/app/api/createBlock";
import { create } from "domain";
import { createReport } from "@/app/api/createReport";
import useShow from "@/hooks/useVisibility";
import useClickOutside from "@/hooks/useClickOutside";

export default function PostSettings({ post }: { post: any }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const settings = useRef<HTMLDivElement>(null);

    const base = "https://pink-berries-i9hk.vercel.app";
    const link = base + `/users/${post.authorId}/post/${post.id}`;

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const { show, hide, visibility } = useShow(false);
    const { isClicked } = useClickOutside(ref.current!);

    useEffect(() => {
        if (isClicked) {
            show();
        } else {
            hide();
        }
    });

    useEffect(() => {
        async function getIsAdmin() {
            const isAdmin = await CheckIfAdmin();
            setIsAdmin(isAdmin);

            console.log(isAdmin);
        }

        getIsAdmin();
    }, []);

    if (!visibility) {
        return (
            <div ref={ref} className={styles.settings_wrapper}>
                <button
                    className={styles.settingBtn}
                    onClick={(e) => {
                        show();
                    }}
                >
                    ...
                </button>
            </div>
        );
    }

    return (
        <div ref={ref} className={styles.settings_wrapper}>
            <button
                className={styles.settingBtn}
                onClick={(e) => {
                    show();
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

                    <li
                        onClick={async () => {
                            await createBlock(post.authorId);
                            settings.current!.style.scale = "0%";
                        }}
                    >
                        Block User
                    </li>
                    <li
                        onClick={async () => {
                            await createReport(post.id);
                            settings.current!.style.scale = "0%";
                        }}
                    >
                        Report post
                    </li>
                </ul>
            </div>
        </div>
    );
}
