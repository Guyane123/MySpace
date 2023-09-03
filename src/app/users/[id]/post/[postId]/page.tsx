import NewComment from "../../../../../../components/NewComment/NewComment";
import Post from "../../../../../../components/Posts/Post";
import { prisma } from "../../../../../../lib/prisma";
import styles from "./page.module.css";
import Comment from "../../../../../../components/Comments/Comment";

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

    const comments = await prisma.comments.findMany({
        where: { postId: postId },
    });

    return (
        <>
            <Post post={post!} />
            <NewComment post={post!} />

            {comments.map((comment, k) => {
                const formatedComment = {
                    ...comment,
                    id: String(comment.commentId),
                };
                return (
                    <Comment
                        key={k}
                        postId={postId}
                        comment={formatedComment!}
                    />
                );
            })}
        </>
    );
}
