import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NewPost from "@/../components/NewPost/NewPost";
import { prisma } from "../../lib/prisma";
import Post from "../../components/Posts/Post";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany();

    if (!session) {
        redirect("/api/auth/signin");
    }

    const sortedPosts = [...posts].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    console.log(session);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Hello {session.user?.name?.toString()} !
            </h1>

            <NewPost />

            <div className={styles.posts}>
                {posts
                    ? sortedPosts.map((post) => {
                          return <Post key={post.id} post={post!} />;
                      })
                    : "No posts !"}
            </div>
        </main>
    );
}
