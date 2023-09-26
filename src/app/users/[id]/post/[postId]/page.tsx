import NewComment from "../../../../../../components/NewComment/NewComment";
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

    const posts = await prisma.post.findMany({
        where: { parrentId: parrentId },
    });

    return (
        <>
            <NewComment post={post!} />

            {posts
                ? posts.map((comment, k) => {
                      const formatedComment = {
                          ...comment,
                          autorId: String(comment.authorId),
                          id: String(comment.id),
                      };
                      //   return <Post key={k} post={formatedComment!} />;
                  })
                : ""}
        </>
    );
}
