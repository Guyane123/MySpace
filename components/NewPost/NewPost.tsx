/* eslint-disable @next/next/no-img-element */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "./NewPost.module.css";
import { getServerSession } from "next-auth";
import { FormEvent } from "react";
import { ProfileForm } from "./ProfileForm";

export default async function newPost() {
    const session = await getServerSession(authOptions);

    return (
        <div className={styles.post}>
            <div className={styles.top}>
                <img
                    className={styles.img}
                    src={session?.user?.image ?? ""}
                    alt={`${session?.user?.name}'s profile picture`}
                />
            </div>
            <ProfileForm />
        </div>
    );
}
