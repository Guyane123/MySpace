"use client";

import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Post from "../../components/Posts/Post";
import postsContext from "../../components/Posts/PostsContext";
import setCookie from "../../components/Categories/actions";
import NumberOfLikes from "../../components/Posts/NumberOfLikes";

type post = {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    authorId: string;
    content: string;
    parrentId: string | null;
    age: number | null;
};

type follow = {
    followerId: String;
    followingId: string;
};

export default function Posts({
    posts,
    currentUserId,
}: {
    posts: Array<post>;
    currentUserId: string;
}) {
    const { currentPosts, setCurrentPosts } = useContext(postsContext);

    function fetchPost(page: number) {
        return currentPosts?.slice((page - 1) * 10, page * 10);
    }

    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useInfiniteQuery(
            ["query"],
            async ({ pageParam = 1 }) => {
                return fetchPost(pageParam);
            },
            {
                getNextPageParam: (_: any, pages: any) => {
                    return pages.length + 1;
                },
                initialData: {
                    pages: [currentPosts?.slice(0, 10)],
                    pageParams: [1],
                },
            }
        );
    // useEffect(() => {
    //     setCookie("posts", JSON.stringify(currentPosts.slice(0, 20)));
    // }, []);
    useEffect(() => {
        console.log(currentPosts);
        window.onscroll = function (ev) {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                if (hasNextPage) {
                    fetchNextPage();
                }
            }
        };
    }, []);
    return (
        <div onClick={() => setCookie("posts", "e")}>
            {data?.pages.map((page: any, i: number) => (
                <div key={i}>
                    {page.map((post: post, k: number) => (
                        <Post key={k} post={post} currentUserId={currentUserId}>
                            <NumberOfLikes postId={post.id} />
                        </Post>
                    ))}
                </div>
            ))}
        </div>
    );
}
