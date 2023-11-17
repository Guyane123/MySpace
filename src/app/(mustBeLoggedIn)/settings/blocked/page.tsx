import { fetchBlocked } from "@/app/api/fetchBlocked";
import UserCard from "@/components/UserCard/UserCard";
import { Unblock } from "../../../../components/Buttons/Buttons";

export default async function Blocked() {
    const blocked = await fetchBlocked();

    console.log(blocked);
    return (
        <>
            Blocked Users
            {blocked.map((b, k) => {
                return (
                    <UserCard
                        key={k}
                        id={b.user.id}
                        name={b.user.name}
                        image={b.user.image}
                        bio={b.user.bio}
                    >
                        <Unblock userId={b.user.id} />
                    </UserCard>
                );
            })}
        </>
    );
}
