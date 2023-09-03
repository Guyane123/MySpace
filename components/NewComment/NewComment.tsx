import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewCommentForm from "./NewCommentForm";
import styles from "./NewComment.module.css";
import { prisma } from "../../lib/prisma";

type propsType = {
    post: {
        authorId: string;
        content: string;
        createdAt: Date;
        id: string;
    };
};

export default async function NewComment({ post }: propsType) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email;

    const currentUserId = await prisma.user
        .findUnique({ where: { email: currentUserEmail! } })
        .then((user) => user?.id);

    return (
        <div className={styles.newComment}>
            <NewCommentForm currentUserId={currentUserId!} post={post} />
        </div>
    );
}
