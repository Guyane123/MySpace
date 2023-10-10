/* eslint-disable @next/next/no-img-element */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "./NewPost.module.css";
import ProfileForm from "./ProfileForm";

type propsType = {
    image: string;
    username: string;
    parrentId?: String | null;
};

export default function newPost({
    image,
    username,
    parrentId = null,
}: propsType) {
    return (
        <div className={styles.post}>
            <img
                className={styles.img}
                src={image ?? ""}
                width={"100%"}
                alt={`${username}'s profile picture`}
            />
            <ProfileForm parrentId={parrentId} />
        </div>
    );
}
