/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { fetchPosts } from "../actions";
import NewPost from "@/components/NewPost/NewPost";
import Posts from "@/components/Posts/Posts";
import LoadMore from "@/components/LoadMore.tsx/LoadMore";
import setCookie from "@/components/Categories/actions";

export default async function Home() {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    // async function cookie() {
    //     await setCookie("currentCategory", "Home");
    // }
    // await cookie();
    const posts = await fetchPosts(0);
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Hello {session?.user?.name?.toString()} !
            </h1>

            <div className={styles.newPost}>
                <NewPost
                    image={session?.user?.image!}
                    username={session?.user?.name!}
                />
            </div>

            <Posts posts={posts}></Posts>
            <LoadMore />
        </main>
    );
}
