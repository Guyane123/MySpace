import Post from "../../components/Posts/Post";

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

export async function Posts({
    posts,
    follows,
}: {
    posts: Array<post>;
    follows: Array<follow>;
}) {
    const sortedPost = posts.filter(
        (post) =>
            post.authorId ==
            follows.find((follow) => follow.followingId == post.authorId)
                ?.followingId
    );

    return (
        <div>
            {!!sortedPost
                ? sortedPost.map((post, k) => {
                      return <Post post={post!} key={k} />;
                  })
                : "No follows !"}
        </div>
    );
}
