import { createContext } from "react";

const currentPostsPlaceHolder = [
    {
        id: "t",
        content: "t",
        updatedAt: new Date(),
        createdAt: new Date(),
        authorId: "t",
    },
];

type post = {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    authorId: string;
    content: string;
    parrentId: string | null;
    age: number | null;
};
const postsContext = createContext({
    currentPosts: currentPostsPlaceHolder,
    setCurrentPosts: (posts: Array<post>) => {},
});

export default postsContext;
