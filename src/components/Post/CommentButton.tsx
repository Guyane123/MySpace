import Image from "next/image";
import CommentButtonImage from "@/../public/comment.svg";
import Link from "next/link";
import styles from "./Post.module.css";
import Post from "./Post";

type propsType = {
    post: any;
    nbrOfComments: number;
    authorId: String;
};

export default function CommentButton({
    post,
    nbrOfComments,
    authorId,
}: propsType) {
    return (
        <>
            <Link href={`/users/${post.author.id}/post/${post.id}`}>
                <Image
                    height={24}
                    width={24}
                    src={CommentButtonImage}
                    alt="Comment Button Image"
                />
            </Link>
            <p className={styles.nbr}>{nbrOfComments}</p>
        </>
    );
}
