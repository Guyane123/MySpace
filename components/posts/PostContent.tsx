"use client";

import { ReactNode } from "react";
import styles from "./Post.module.css";
import Link from "next/link";

type propsType = {
    children: ReactNode;
    userId: string;
    postId: string;
    className?: string;
};

export default function PostContent({
    children,
    userId,
    postId,
    className,
}: propsType) {
    return (
        <Link className={className} href={`/users/${userId}/post/${postId}`}>
            {children}
        </Link>
    );
}
