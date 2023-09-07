"use client";

import Image from "next/image";
import CommentButtonImage from "@/../public/comment.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

type propsType = {
    currentUserId: string;
    postId: string;
};

export default function CommentButton({ currentUserId, postId }: propsType) {
    return (
        <Link href={`/users/${currentUserId}/post/${postId}`}>
            <Image
                height={24}
                width={24}
                src={CommentButtonImage}
                alt="Comment Button Image"
            />
        </Link>
    );
}
