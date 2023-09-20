import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import NewPost from "../../components/NewPost/NewPost";
import Categories from "../../components/Categories/Categories";
import { getCookie } from "../../components/Categories/actions";
import Post from "../../components/Posts/Post";
import { follow } from "../../components/FollowButton/actions";

type postType = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
};

export default async function Home() {
    const session = await getServerSession(authOptions);

    const currentCategory = await getCookie("currentCategory");

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id);

    const follows = await prisma.follows.findMany({
        where: { followerId: currentUserId },
    });
    const posts = await prisma.post.findMany({
        where: {
            parrentId: null,
        },
    });

    const sortedPosts = [...posts].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const followedUserPost: Array<postType> = [];

    follows.forEach((follow, k) => {
        const post = sortedPosts.find(
            (post) => (post.authorId = follow.followingId)
        );

        if (post) followedUserPost.push(post);
    });

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

            {currentCategory == "Home"
                ? sortedPosts.map((post, k) => {
                      return <Post key={k} post={post}></Post>;
                  })
                : followedUserPost.map((post, k) => {
                      return <Post key={k} post={post}></Post>;
                  })}
        </main>
    );
}
