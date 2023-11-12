/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchPosts } from "../api/fetchPosts";
import NewPost from "@/components/NewPost/NewPost";
import Posts from "@/components/Posts/Posts";
import LoadMore from "@/components/LoadMore/LoadMore";
import { getCookie } from "../api/cookieCategory";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const category = await getCookie("currentCategory");
    const posts = await fetchPosts(0, undefined, category as string);

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
            <LoadMore authorId={undefined} />
        </main>
    );
}
