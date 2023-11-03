import NewPost from "@/components/NewPost/NewPost";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
export default async function New() {
    const currentUser = await fetchCurrentUser();

    return (
        <NewPost image={currentUser?.image!} username={currentUser?.name!} />
    );
}
