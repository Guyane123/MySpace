import styles from "./page.module.css";
import Comment from "../../../../../../../../components/Comments/Comment";
import NewComment from "../../../../../../../../components/NewComment/NewComment";
import Post from "../../../../../../../../components/Posts/Post";
import { prisma } from "../../../../../../../../lib/prisma";

type propsType = {
    params: {
        commentId: string;
        postId: string;
    };
};

export default async function userComment({ params }: any) {
    const commentId = Number(params.commentId);
    const postId = params.postId;

    const comment = await prisma.comments.findUnique({
        where: {
            postId_commentId: {
                postId: postId,
                commentId: commentId,
            },
        },
    });

    console.log(params);

    const formatedComment = {
        ...comment,
        content: comment?.content!,
        authorId: comment?.authorId!,
        createdAt: comment?.createdAt!,
        updatedAt: comment?.updatedAt!,
        id: String(comment?.commentId),
    };

    return (
        <>
            <Comment postId={postId} comment={formatedComment!} />
            <NewComment post={formatedComment} />
        </>
    );
}
