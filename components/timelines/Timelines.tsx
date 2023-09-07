"use client";

import { useState } from "react";
import styles from "./Timelines.module.css";
import NewPost from "../NewPost/NewPost";

type post = {
    authorId: string;
    id: string;
};

type follow = {
    followerId: string;
    followingId: string;
};

export default function Timelines({
    posts,
    follows,
}: {
    posts: Array<post>;
    follows: Array<follow>;
}) {
    const [timeline, setTimeline] = useState("");

    return (
        <>
            <div className={styles.flex}>
                <ul className={styles.timelines}>
                    <li onClick={() => setTimeline("Home")}>Home</li>
                    <li onClick={() => setTimeline("Subscriptions")}>
                        Subscriptions
                    </li>
                </ul>
            </div>
            <NewPost />
            <div>
                {timeline == "Home" ?? posts}
                {/* {timeline == "Subscriptions" ?? } */}
            </div>
            ;
        </>
    );
}
