import styles from "./page.module.css";
import UserCard from "@/components/UserCard/UserCard";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import { fetchUsers } from "@/app/api/fetchUsers";

export default async function Users() {
    const users = await fetchUsers("");
    return (
        <div className={styles.users}>
            {users.map((user) => {
                return (
                    <UserCard key={user.id} {...user}>
                        <FollowButton targetUserId={user.id!} />
                    </UserCard>
                );
            })}
        </div>
    );
}
