import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import NewPost from "../../../components/NewPost/NewPost";
import { Posts } from "../Posts";
import Categories from "../../../components/Categories/Categories";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany();

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

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Hello {session.user?.name?.toString()} !
            </h1>

            <Categories />

            <NewPost
                image={session.user?.image!}
                username={session.user?.name!}
            />

            <Posts posts={sortedPosts!} follows={follows}></Posts>
        </main>
    );
}
