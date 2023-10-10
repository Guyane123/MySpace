import { getServerSession } from "next-auth";
import { prisma } from "../../../../../../lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Post from "@/components/Post/Post";
import NewPost from "@/components/NewPost/NewPost";
type propsType = {
    params: {
        postId: string;
    };
};

export default async function userPost({ params }: propsType) {
    let postId = params.postId;

    const session = await getServerSession(authOptions);

    const currentUser = await prisma.user.findUnique({
        where: { email: session?.user?.email! },
    });

    const postWithMoreInfo = await prisma.post.findUnique({
        where: {
            id: postId,
        },

        include: {
            likedBy: true,
            comments: true,
            author: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                },
            },
        },
    });

    let parrentPosts = [];
    let parrentPostId = postWithMoreInfo?.parrentId;
    let parrentPost;

    while (parrentPostId != null) {
        parrentPostId = postWithMoreInfo?.parrentId
            ? postWithMoreInfo?.parrentId
            : null;

        parrentPost = await prisma.post.findUnique({
            where: { id: parrentPostId! },

            include: {
                likedBy: true,
                comments: true,
                author: {
                    select: {
                        name: true,
                        image: true,
                        id: true,
                    },
                },
            },
        });
        parrentPosts.push(parrentPost);

        parrentPostId = parrentPost?.parrentId ? parrentPost.parrentId : null;
    }

    const posts = await prisma.post.findMany({
        where: { parrentId: postId },

        orderBy: {
            createdAt: "desc",
        },
        include: {
            likedBy: true,
            comments: true,
            author: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                },
            },
        },
    });

    return (
        <>
            {parrentPosts
                ? parrentPosts.map((parrentPost, k) => {
                      return <Post key={k} post={parrentPost!} />;
                  })
                : ""}

            <Post post={postWithMoreInfo} />

            <NewPost
                image={currentUser?.image!}
                username={currentUser?.name!}
                parrentId={postId}
            />

            {posts
                ? posts.map((comment, k) => {
                      return <Post key={k} post={comment!} />;
                  })
                : ""}
        </>
    );
}
