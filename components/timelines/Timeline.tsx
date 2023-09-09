import Post from "../Posts/Post";

type post = {
    authorId: string;
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

type follow = {
    followerId: string;
    followingId: string;
};

export function Timeline({}: {}) {
    // const followingPost: Array<post> = [];

    // for (let i = 0; i < follows.length; i++) {
    //     posts.forEach((post) => {
    //         if (post.authorId == follows[i].followingId) {
    //             followingPost.push(post);
    //         }
    //     });
    // }

    // return (
    //     <>
    //         {followingPost.map((post, k) => {
    //             return <Post key={k} post={post}></Post>;
    //         })}
    //     </>
    // );

    return <div>D</div>;
}
