import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewCommentForm from "./NewCommentForm";
import styles from "./NewComment.module.css";
import { prisma } from "../../lib/prisma";
import { PostType } from "@/app/types";

type propsType = {
    post: PostType;
};

export default async function NewComment({ post }: propsType) {
    const session = await getServerSession(authOptions);

    return (
        <div className={styles.newComment}>
            <NewCommentForm post={post} />
        </div>
    );
}
