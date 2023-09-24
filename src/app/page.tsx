/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import NewPost from "../../components/NewPost/NewPost";
import { getCookie } from "../../components/Categories/actions";
import Post from "../../components/Posts/Post";
import Posts from "./Posts";
import PostsContextProvider from "./PostsContextProvider";

type postType = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
};

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const currentUserId = await prisma.user.findUnique({where: {email: session.user?.email!}}).then(user => user?.id!)

    let posts = await prisma.post.findMany({ where: { parrentId: null } });

    if (!session) {
        redirect("/api/auth/signin");
    }
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Hello {session.user?.name?.toString()} !
            </h1>

            <NewPost
                image={session.user?.image!}
                username={session.user?.name!}
            />

            {/* <Posts>
                {currentCategory == "Home"
                    ? sortedPosts.map((post, k) => {
                          return <Post key={k} post={post}></Post>;
                      })
                    : followedUserPost.map((post, k) => {
                          return <Post key={k} post={post}></Post>;
                      })}
            </Posts> */}

            <PostsContextProvider posts={posts}>
                <Posts posts={posts} currentUserId={currentUserId!} />
            </PostsContextProvider>
        </main>
    );
}
