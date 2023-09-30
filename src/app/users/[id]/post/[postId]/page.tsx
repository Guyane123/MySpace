import NewPost from "../../../../../../components/NewPost/NewPost";
import Post from "../../../../../../components/Post/Post";
import { prisma } from "../../../../../../lib/prisma";
type propsType = {
    params: {
        postId: string;
    };
};

export default async function userPost({ params }: propsType) {
    let postId = params.postId;

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    const parrentId = params.postId;

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

    const posts = await prisma.post.findMany({
        where: { parrentId: parrentId },

        orderBy: {
            createdAt: "asc",
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
            <Post post={postWithMoreInfo} />

            <NewPost
                image={postWithMoreInfo?.author.image!}
                username={postWithMoreInfo?.author.name!}
                parrentId={parrentId}
            />

            {posts
                ? posts.map((comment, k) => {
                      return <Post key={k} post={comment!} />;
                  })
                : ""}
        </>
    );
}
