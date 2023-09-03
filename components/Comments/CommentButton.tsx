"use client";

import Image from "next/image";
import CommentButtonImage from "@/../public/trash.svg";
import Link from "next/link";

type propsType = {
    currentUserId: string;
    commentId: string;
    postId: string;
};

export default function CommentButton({
    currentUserId,
    commentId,
    postId,
}: propsType) {
    return (
        <Link
            href={`/users/${currentUserId}/post/${postId}/comment/${commentId}`}
        >
            <Image src={CommentButtonImage} alt="Comment Button Image" />
        </Link>
    );
}
