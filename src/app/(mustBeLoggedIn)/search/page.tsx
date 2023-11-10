import { getCookie } from "@/app/api/cookieCategory";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";
import { fetchAll } from "../../api/fetchAll";
import UserCard from "@/components/UserCard/UserCard";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import Post from "@/components/Post/Post";
import LoadMore from "@/components/LoadMore/LoadMore";
import Posts from "@/components/Posts/Posts";

export default async function Search() {
    const currentSearch = await getCookie("currentSearch");

    const { posts, users } = await fetchAll(currentSearch as string);

    return (
        <div className={styles.container}>
            <div className={styles.searchbarWrapper}>
                <SearchBar />
            </div>
            <div className={styles.results}>
                <div className={styles.users}>
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
                </div>

                <Posts posts={posts}></Posts>
                <LoadMore authorId={undefined} />
            </div>
        </div>
    );
}
