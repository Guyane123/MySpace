/* eslint-disable @next/next/no-img-element */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "./NewPost.module.css";
import ProfileForm from "./ProfileForm";

type propsType = {
    image: string;
    username: string;
};

export default function newPost({ image, username }: propsType) {
    return (
        <div className={styles.post}>
            <div className={styles.top}>
                <img
                    className={styles.img}
                    src={image ?? ""}
                    alt={`${username}'s profile picture`}
                />
            </div>
            <ProfileForm />
        </div>
    );
}
