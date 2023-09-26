/* eslint-disable @next/next/no-img-element */
import { prisma } from "../../../../lib/prisma";
import { Metadata } from "next";
import {
    SignInButton,
    SignOutButton,
} from "../../../../components/Buttons/Buttons";
import styles from "./page.module.css";
import Image from "next/image";
import { FollowButton } from "../../../../components/FollowButton/FollowButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Post from "../../../../components/Post/Post";
import { SendMessage } from "../../../../components/Buttons/Buttons";

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
    console.log(params.id);
    const user = await prisma.user.findUnique({ where: { id: params.id } });
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id);
    const { name, image, bio } = user ?? {};

    const posts = await prisma.post.findMany({
        where: { authorId: params.id },
    });

    console.log(posts);
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
                        {currentUserId != params.id ? (
                            <>
                                <FollowButton targetUserId={params.id} />
                                <SendMessage otherUserId={params.id} />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>

            <h3 className={styles.title}>Bio</h3>
            <p className={styles.bio}>{bio ?? "This is a bio"}</p>
            <hr className={styles.hr} />

            {posts.map((post) => {
                return <Post post={post} key={post.id} />;
            })}
        </div>
    );
}
