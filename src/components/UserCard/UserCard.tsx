/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import styles from "./UserCard.module.css";

type Props = {
    id: string | null;
    name: string | null;
    image: string | null;
    bio: string | null;
    children: React.ReactNode;
};

export default async function UserCard({
    id,
    name,
    image,
    bio,
    children,
}: Props) {
    return (
        <Link href={`/users/${id}`} className={styles.a}>
            <div className={styles.card}>
                <div className={styles.flex}>
                    <img
                        src={image ?? "https://thispersondoesnotexist.com/"}
                        alt={name + "pfp"}
                        height={64}
                        width={64}
                        className={styles.cardImage}
                    />
                    <div className={styles.column}>
                        {name}
                        <h3>
                            <p>{bio}</p>
                        </h3>
                    </div>
                </div>
                {children}
            </div>
        </Link>
    );
}
