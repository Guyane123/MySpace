"use client";

import { useState } from "react";
import styles from "./Timelines.module.css";
import NewPost from "../NewPost/NewPost";
import { useSession } from "next-auth/react";
import Post from "../Posts/Post";
import { Timeline } from "./Timeline";

type post = {
    authorId: string;
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

type follow = {
    followerId: string;
    followingId: string;
};

export default function Timelines({ children }: { children?: any }) {
    return (
        <>
            <div className={styles.flex}>
                {/* <ul className={styles.timelines}>
                    <li onClick={() => setTimeline("Home")}>Home</li>
                    <li onClick={() => setTimeline("Subscriptions")}>
                        Subscriptions
                    </li>
                </ul> */}
            </div>
            <NewPost
                username={session.data?.user?.name!}
                image={session.data?.user?.image!}
            />
            <div>{children}</div>;
        </>
    );
}
