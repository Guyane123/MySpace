"use client";

import { useEffect, useState } from "react";
import postsContext from "../../components/Posts/PostsContext";
import setCookie from "./actions";

type post = {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    authorId: string;
    content: string;
    parrentId: string | null;
    age: number | null;
};

type propsType = {
    children: React.ReactNode;
    posts: Array<post>;
};

export default function PostsContextProvider({ children, posts }: propsType) {
    const postsPlaceholder = [
        {
            id: "t",
            updatedAt: new Date(),
            createdAt: new Date(),
            authorId: "",
            content: "",
            parrentId: "",
            age: 1,
        },
        {
            id: "t",
            updatedAt: new Date(),
            createdAt: new Date(),
            authorId: "",
            content: "",
            parrentId: "",
            age: 2,
        },
    ];

    const [context, setContext] = useState<Array<post> | null>(posts);

    return (
        <postsContext.Provider
            value={{
                currentPosts: context!,
                setCurrentPosts: setContext!,
            }}
        >
            {children}
        </postsContext.Provider>
    );
}

//    setCookie("posts", JSON.stringify(context));
