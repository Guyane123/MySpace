"use client";

import Post from "../Post/Post";

type PostWithMoreInfo = {
    id: String;
    updatedAt: Date;
    createdAt: Date;
    authorId: String;
    content: String;
    age: number | null;
    parrentId: String | null;
    isMessage: boolean;
    author: { image: string | null; name: string | null };
    likedBy: Array<any>;
    comments: Array<any>;
}[];
export default function Posts({ posts }: { posts: Array<any> }) {
    return posts.map((post, k) => {
        return <Post post={post} key={k}></Post>;
    });
}
