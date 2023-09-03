"use client";

import Image from "next/image";
import CommentButtonImage from "@/../public/trash.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

type propsType = {
    currentUserId: string;
    postId: string;
    isComment: boolean;
};

export default function CommentButton({
    currentUserId,
    postId,
    isComment,
}: propsType) {
    const pathname = usePathname();

    return (
        <Link href={`/users/${currentUserId}/post/${postId}`}>
            <Image src={CommentButtonImage} alt="Comment Button Image" />
        </Link>
    );
}
