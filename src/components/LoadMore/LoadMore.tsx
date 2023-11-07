/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { PostType } from "@/app/types";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../Spinner/Spinner";
import { fetchPosts } from "@/app/api/fetchPosts";
import Posts from "../Posts/Posts";

const LoadMore = ({
    authorId = undefined,
}: {
    authorId: string | undefined;
}) => {
    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [pagesLoaded, setPagesLoaded] = useState<number>(0);
    const [ref, inView] = useInView();

    const loadMorePosts = async () => {
        const nextPage = pagesLoaded + 1;
        const newPosts = (await fetchPosts(nextPage, authorId, "Home")) ?? [];
        setPosts((prevPosts: Array<any>) => [...prevPosts, ...newPosts]);

        setPagesLoaded(nextPage);
    };

    useEffect(() => {
        if (inView) {
            loadMorePosts();
        }
    });

    return (
        <>
            <Posts
                posts={posts.sort(
                    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                )}
            />

            <div ref={ref}>
                <Spinner />
            </div>
        </>
    );
};

export default LoadMore;
