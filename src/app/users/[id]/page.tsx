/* eslint-disable @next/next/no-img-element */
import { prisma } from "../../../../lib/prisma";
import { Metadata } from "next";
import {
    SignInButton,
    SignOutButton,
} from "../../../../components/buttons/Buttons";
import styles from "./page.module.css";
import Image from "next/image";

type Props = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    const { name } = user ?? {};

    return { title: `user profile of ${name}` };
}

export default async function UserProfile({ params }: Props) {
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    const { name, image, bio } = user ?? {};
    return (
        <div className={styles.user}>
            <div className={styles.profile}>
                <img
                    src={image ?? "https://thispersondoesnotexist.com"}
                    alt={`${name}'s profile`}
                    className={styles.img}
                    width={112}
                    height={112}
                />
                <div className={styles.flex}>
                    <div className={styles.top}>
                        <h1 className={styles.title}>{name}</h1>
                        <SignOutButton />
                    </div>
                </div>
            </div>

            <h3 className={styles.title}>Bio</h3>
            <p className={styles.bio}>{bio ?? "This is a bio"}</p>
            <hr />
        </div>
    );
}
