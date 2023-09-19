/* eslint-disable @next/next/no-img-element */

import { prisma } from "../../lib/prisma";
import Link from "next/link";
import styles from "./UserCard.module.css";

type Props = {
    id: string | null;
    name: string | null;
    age: number | null;
    image: string | null;
};

export default function UserCard({ id, name, age, image }: Props) {
    return (
        <div className={styles.card}>
            <img
                src={image ?? "https://thispersondoesnotexist.com/"}
                alt={name + "pfp"}
                height={64}
                width={64}
                className={styles.cardImage}
            />
            <div className={styles.cardContent}>
                <h3>
                    <Link href={`/users/${id}`}>{name}</Link>
                    <p>age: {age}</p>
                </h3>
            </div>
        </div>
    );
}
