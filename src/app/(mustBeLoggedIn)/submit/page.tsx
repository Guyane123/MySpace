import NewPost from "@/components/NewPost/NewPost";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";

export default async function Submit() {
    const currentUser = await fetchCurrentUser();

    return (
        <div>
            <NewPost
                image={currentUser?.image!}
                username={currentUser?.name!}
            />
        </div>
    );
}
