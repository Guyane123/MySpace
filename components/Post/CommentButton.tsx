import Image from "next/image";
import CommentButtonImage from "@/../public/comment.svg";
import Link from "next/link";
import styles from "./Post.module.css";

type propsType = {
    postId: string;
    nbrOfComments: number;
};

export default function CommentButton({ postId, nbrOfComments }: propsType) {
    return (
        <>
            {/* <Link href={`/users/${currentUserId}/post/${postId}`}> */}
            <Image
                height={24}
                width={24}
                src={CommentButtonImage}
                alt="Comment Button Image"
            />
            {/* </Link> */}
            <p className={styles.nbr}>{nbrOfComments}</p>
        </>
    );
}
