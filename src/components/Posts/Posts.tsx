"use client";

import Post, { extendedPost } from "../Post/Post";

export default function Posts({ posts }: { posts: Array<any> }) {
    return posts
        .sort(function (a, b) {
            return b.createdAt.getTime() - a.createdAt.getTime();
        })
        .map((post, k) => {
            return <Post post={post} key={k}></Post>;
        });
}
