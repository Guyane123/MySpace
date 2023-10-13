import setCookie, { getCookie } from "@/components/Categories/actions";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";
import { fetchAll } from "./actions";
import UserCard from "@/components/UserCard/UserCard";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import Post from "@/components/Post/Post";

export default async function Search() {
    const currentSearch = await getCookie("currentSearch");

    const { posts, users } = await fetchAll(currentSearch as string);

    async function cookies() {
        await setCookie("currentCategory", "Search");
    }

    cookies();

    return (
        <div className={styles.container}>
            <div className={styles.searchbarWrapper}>
                <SearchBar />
            </div>
            <div className={styles.results}>
                {users ? (
                    <>
                        <p>Users</p>{" "}
                        {users.map((user, k) => {
                            return (
                                <UserCard
                                    key={k}
                                    id={user.id}
                                    name={user.name}
                                    bio={user.bio}
                                    image={user.image}
                                >
                                    <FollowButton targetUserId={user.id} />
                                </UserCard>
                            );
                        })}
                    </>
                ) : (
                    ""
                )}
                {posts ? (
                    <>
                        <p>Posts</p>{" "}
                        {posts.map((post, k) => {
                            return <Post post={post} key={k} />;
                        })}
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
