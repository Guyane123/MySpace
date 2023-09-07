import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import Post from "../../components/Posts/Post";
import { User } from "@prisma/client";
import Timelines from "../../components/timelines/Timelines";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany({
        where: {
            parrentId: null,
        },
    });

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id);

    const follows = await prisma.follows.findMany({
        where: { followerId: currentUserId },
    });

    if (!session) {
        redirect("/api/auth/signin");
    }

    const sortedPosts = [...posts].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const HTMLpost = posts
        ? sortedPosts.map((post) => {
              return <Post key={post.id} post={post!} />;
          })
        : "No posts !";

    console.log(session);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Hello {session.user?.name?.toString()} !
            </h1>

            <Timelines posts={posts} follows={follows} />
        </main>
    );
}
