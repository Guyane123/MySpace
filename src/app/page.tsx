/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import NewPost from "../../components/NewPost/NewPost";
import LoadMore from "../../components/LoadMore.tsx/LoadMore";
import { fetchPosts } from "./actions";
import Post from "../../components/Post/Post";
import Posts from "../../components/Posts/Posts";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session.user?.email! } })
        .then((user) => user?.id!);

    const posts = await fetchPosts(1);

    console.log(posts);
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Hello {session.user?.name?.toString()} !
            </h1>

            <NewPost
                image={session.user?.image!}
                username={session.user?.name!}
            />

            <Posts posts={posts}></Posts>
            <LoadMore />
        </main>
    );
}
