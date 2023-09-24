"use client";

import { useRouter } from "next/navigation";

export default function PostWrapper({
    children,
    postId,
    authorId,
}: {
    children: React.ReactNode;
    postId: string;
    authorId: string;
}) {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                if (typeof window !== "undefined") {
                    router.push(`/users/${authorId}/post/${postId}`);
                }
            }}
        >
            {children}
        </div>
    );
}
