import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Post from "@/components/Post/Post";
import NewPost from "@/components/NewPost/NewPost";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { fetchPost } from "@/app/api/fetchPost";
import { fetchPosts } from "@/app/api/fetchPosts";
type propsType = {
    params: {
        postId: string;
    };
};

export default async function userPost({ params }: propsType) {
    let postId = params.postId;

    const session = await getServerSession(authOptions);

    const currentUser = await fetchCurrentUser();

    const postWithMoreInfo = await fetchPost(postId);

    let parrentPosts = [];
    let parrentPostId = postWithMoreInfo?.parrentId;
    let parrentPost;

    while (parrentPostId != null) {
        parrentPostId = postWithMoreInfo?.parrentId
            ? postWithMoreInfo?.parrentId
            : null;

        parrentPost = await fetchPost(parrentPostId!);

        parrentPosts.push(parrentPost);

        parrentPostId = parrentPost?.parrentId ? parrentPost.parrentId : null;
    }

    const posts = await fetchPosts();

    return (
        <>
            {parrentPosts
                ? parrentPosts.map((parrentPost, k) => {
                      return <Post key={k} post={parrentPost!} />;
                  })
                : ""}

            <Post post={postWithMoreInfo} />

            <NewPost
                image={currentUser?.image!}
                username={currentUser?.name!}
                parrentId={postId}
            />

            {posts
                ? posts.map((comment, k) => {
                      return <Post key={k} post={comment!} />;
                  })
                : ""}
        </>
    );
}
